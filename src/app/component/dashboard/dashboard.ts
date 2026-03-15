import { Component, inject, signal }    from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService }          from '../../core/auth/service';
import { ProposalDao } from '../../core/proposal/dao';
import { JobDao } from '../../core/job/dao';
import { Job } from '../../core/job/model';
import { Proposal } from '../../core/proposal/model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authservice = inject(AuthService);
  private router      = inject(Router);


  //gestion de service job
  private job = inject(JobDao);
  errMyJobs = signal('loading jobs')
  myJobs    = signal<Job[]>([]);
  _1 = this.job.getMyJobs()
    .subscribe({
        next:(res) =>{
          this.myJobs.set(res)
        },
        error:(err)=>{
            this.errMyBids.set(err);
        }
    });

  //gestion de service proposal
  proposal  = inject(ProposalDao);
  errMyBids = signal('loading bids');
  mybids    = signal<Proposal[]>([]);
  _2 = this.proposal.mybids()
    .subscribe({
        next:(res) =>{
          this.mybids.set(res)
        },
        error:(err)=>{
            this.errMyBids.set(err);
        }
    });



  logout(){
      //logout
      this.authservice.logout();
      this.router.navigate([''])
  }
  completed(job_id: string){
    this.job.complete(job_id)
        .subscribe({
            error:(err) => {
              this.errMyJobs.set(err);
            }
        })
  }

}
