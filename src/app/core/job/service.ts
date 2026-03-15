import { inject, Injectable, signal } from "@angular/core";
import { Job }                                  from "../job/model";
import { JobDao }                               from "./dao";
import { AuthService }                          from "../auth/service";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { User } from "../user/model";


@Injectable({providedIn: 'root'})
export class JobService {
    private readonly dao : JobDao      = inject(JobDao);
    private readonly auth: AuthService = inject(AuthService);

    readonly availableJobs          = signal<Job[]>([]);
    readonly myJobs                 = signal<Job[]>([]);

    load():Job[] | null{
        const user = this.auth.whoami();
        if (!user) return null;

        //load all jobs
        this.dao.search().pipe(
            tap((data: Job[]) => {
                this.availableJobs.set(
                  data.filter(j => j.status == 'open')
                      .filter(j => j.owner_id != user.id)
                );
            }),
            catchError(err => {
                console.log('Error sent:', err);
                return throwError(()=> err);
            })
        );
        //load all user jobs
        this.dao.getMyJobs().pipe(
            tap((data) => {
                this.myJobs.set(data)

            }),
            catchError(err => {
                console.log('Error sent:', err);
                return throwError(()=> err);
            })
        );
        return this.myJobs()
    }


    create(
       title      : string,
       description: string,
       category   : string,
       budget     : number,
    ){
      this.dao.create(title,description,category, budget)
        .pipe(tap((res)=>{
            console.log(res)
            const job: Job = {
               id: res.job_id,
               title: title,
               description: description,
               category: category,
               budget: Number(budget),
               status: 'open',
               owner_id: this.auth.whoami()?.id!,
               freelancer_id: null,
            }
            this.myJobs.update(all => [job,...all]);
        }))
        .subscribe({})
    }


    update(
       id         : string,
       title      : string,
       description: string,
       category   : string,
       budget     : number,
       status     : 'open'|'in_progress'|'completed',
    ){

        this.dao.update(id, title,description, budget, category, status)
            .pipe(tap(()=>{
                let j = this.myJobs().find(job => job.id == id);

                const job: Job = {
                    id: id,
                    title: title,
                    description: description,
                    category: category,
                    budget: budget,
                    status: 'open',
                    owner_id:      j?.owner_id!,
                    freelancer_id: j?.freelancer_id!,
                }
                this.myJobs.update(all => all.map(j => j.id == job.id ? job : j ))

            }))
            .subscribe({

            })
    }

    complete(id : string) {
      let job = this.myJobs().find(job => job.id == id);
      if(!job) return

      this.dao.complete(id)
            .subscribe({
                next: () => {
                    job.status = 'completed'
                    this.myJobs.update(all => all.map(j => j.id == job.id ? job: j));
                },
                error: (err) => {
                  console.error("Could not complete the job:", err);
                }
            })
    }

    //cant find user through id so cant find user through search function
    userDetails(job_id : string):Observable<User>{
        return this.dao.getUserByJobId(job_id)
    }

    clear(){
      this.availableJobs.set([]);
      this.myJobs.set([])
    }
}



