import { inject, Injectable } from "@angular/core";
import { Job } from "../job/model";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { ApiError } from "../http/api-error.model";
import { AuthStore } from "../auth/store";
import { ApiClient } from "../http/api-client";
import { User } from "../user/model";






@Injectable({providedIn: 'root'})
export class JobDao {
    private readonly http: ApiClient = inject(ApiClient);
    private readonly authStore: AuthStore = inject(AuthStore);

    create(
        title       : string,
        description : string,
        category    : string,
        budget      : number
    ) {
        const body: JobCreateDto = {
            title: title,
            description: description,
            category: category,
            budget: budget
        };

        return this.http.post<CreateResponse>('/jobs', body)
            .pipe(
                catchError((err: ApiError) => {
                    console.error('Failed to create job', err);
                    return throwError(() => err);
                })
            );
    }


    update(
      job_id      : string,
      title       : string | undefined,
      description : string | undefined,
      budget      : number | undefined,
      category    : string | undefined,
      status      : 'open'|'in_progress' | 'completed'| undefined,
    ) {
        const dto: JobUpdateDto = {
            title      : title,
            description: description,
            budget     : budget,
            category   : category,
            status     : status
        }

        return this.http.patch(`/jobs/${job_id}`, dto)
            .pipe(
                catchError((err: ApiError) => {
                    console.error(`Failed to update job with id ${job_id}`, err);
                    return throwError(() => err);
                })
            );
    }


    search(
      category    : string | null = null,
      status      : string | null = null,
      min_budget  : number | null = null
    ): Observable<Job[]> {

        const body: JobSearchDto = {
            category: category     || undefined,
            status:   status       || undefined,
            min_budget: min_budget || undefined
        };


        return this.http.post<Job[]>('/jobs/search', body)
        .pipe(
            catchError((err: ApiError) => {
                console.error('Failed to search jobs', err);
                return throwError(() => err);
            })
        );
    }

    complete(jobId: string) {
        return this.http.patch(`/jobs/${jobId}/complete`,null)
            .pipe(
                catchError((err: ApiError) => {
                    console.error(`Failed to fetch job with id ${jobId}`, err);
                    return throwError(() => err);
                })
            );
    }

    getById(jobId: string): Observable<Job> {
        return this.http.get<Job>(`/jobs/${jobId}`)
            .pipe(
                catchError((err: ApiError) => {
                    console.error(`Failed to fetch job with id ${jobId}`, err);
                    return throwError(() => err);
                })
            );
    }


    getMyJobs(): Observable<Job[]> {
        if(!this.authStore.isAuthenticated()) {
            const error: ApiError = {
                status: 401,
                message: "User is not authenticated"
            };
            console.error('User is not authenticated', error);
            return throwError(() => error);
        }

        return this.http.get<Job[]>(`/jobs/my-postings`)
            .pipe(
                catchError((err: ApiError) => {
                    console.error(`err sent: ${err}`)
                    return throwError(() => err);
                })
            );
    }

    getUserByJobId(id: string):Observable<User> {
        return this.http.get<any>(`/jobs/${id}`)
        .pipe(
              map(detail => {return detail.owner}),
                catchError((err: ApiError) => {
                    console.error(`err sent: ${err}`)
                    return throwError(() => err);
                })
            );

    }
}

interface CreateResponse {
    job_id : string;
    message: string;
}

//list de container necessaire
type JobCreateDto = {
  title: string;
  description: string;
  budget: number;
  category:string;

}

type JobUpdateDto = {
  title?: string;
  description?: string;
  budget?:number;
  category?:string;
  status?:string;
}

type JobSearchDto = {
  category?  : string;
  status?    : string;
  min_budget?: number;
}


export type MinBudgetError = ApiError & {
    status: 400,
    message: "min_budget must be numeric"
};

export type MissingRequiredFieldError = ApiError & {
    status: 400,
    message: "Missing required fields"
};

export type JobNotFoundError = ApiError & {
    status: 404,
    message: "Job not found"
};

export type CompletionStatusError = ApiError & {
    status: 400,
    message: "Only in-progress jobs can be completed"
};
