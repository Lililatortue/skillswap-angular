import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../core/job/service';

@Component({
  selector: 'app-job-posting',
  imports: [RouterLink],
  templateUrl: './job-posting.html',
  styleUrl: './job-posting.css',
})
export class JobPosting {
    router      = inject(Router);
    job         = inject(JobService);

    // Individual Signals
    title       = signal('');
    budget      = signal<number>(0);
    category    = signal('');
    description = signal('');

    errMessage  = signal('');
    post_job() {
    if (this.title() && this.budget() > 0) {
      this.job.create(
            this.title(),
            this.description(),
            this.category(),
            this.budget()
      )
      this.router.navigate(['/dashboard'])
    }
    else {
        this.errMessage.set("missing require field");
    }
  }

}
