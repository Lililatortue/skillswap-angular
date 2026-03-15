import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { JobDao } from '../../core/job/dao';
import { Job } from '../../core/job/model';
import { AuthService } from '../../core/auth/service';

@Component({
  selector: 'app-search-jobs',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './search-jobs.html',
  styleUrl: './search-jobs.css',
})
export class SearchJobs {
    job = inject(JobDao);
    auth= inject(AuthService);


    availableJobs = signal<Job[]>([]);
    errAvailableJobs = signal('');
    _ = this.job.search()
        .subscribe({
            next: (res) =>{
                this.availableJobs.set(
                  res.filter(j => j.status == 'open' && j.owner_id != this.auth.whoami()!.id));
            },
            error:(err) =>{
                this.errAvailableJobs.set(err);
            },
        });
}
