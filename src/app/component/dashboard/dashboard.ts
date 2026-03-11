import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { JobService  } from '../../core/services/jobs.service';
import { Router, RouterOutlet } from '@angular/router';
import { Job } from '../../core/models/job.model';
import { Proposal } from '../../core/models/proposal.model';
import { ProposalService } from '../../core/services/proposals.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authservice       = inject(AuthService);
  jobservice        = inject(JobService);
  proposalservice   = inject(ProposalService);
  router            = inject(Router);
  readonly jobs     = signal<Job[]>([]);
  readonly bids     = signal<Proposal[]>([]);

  ngOnInit() {
    this.myjobs();
  }
  //user related
  aboutme(){
      this.router.navigate(['/aboutme']);
  }
  //job service
  myjobs(){
      this.jobservice.getMyJobs().subscribe(
          {
              next: (res) => {
                 this.jobs.set(res);
              },
              error:(err)=> {
                  //TODO: include errors
              }
          }
      )
  }
  //job service
  myproposals(){
      this.proposalservice.mybids().subscribe(
          {
              next: (res) => {
                 this.bids.set(res);
              },
              error:(err)=> {
                  //TODO: include errors
              }
          }
      )
  }
  //proposal service
  offers(){
      this.router.navigate(['/offers']);
  }

  //auth service
  logout(){
      //clear localstorage
      this.authservice.Logout();
  }
  login(){
      this.router.navigate(['/login']);
  }
}
