import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { JobService  } from '../../core/services/jobs.service';
import { Router, RouterOutlet } from '@angular/router';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authservice   = inject(AuthService);
  jobservice    = inject(JobService);
  router        = inject(Router);

  readonly jobs = signal<Job[]>([]);

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
