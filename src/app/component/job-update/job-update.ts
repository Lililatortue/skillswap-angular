import { Router, RouterLink } from "@angular/router";
import { JobService } from "../../core/job/service";
import { Component, inject, Input, signal } from "@angular/core";




@Component({
  selector: 'app-job-update',
  imports: [RouterLink],
  templateUrl: './job-update.html',
  styleUrl: './job-update.css',
})
export class JobUpdate {
    router      = inject(Router);
    jobservice  = inject(JobService);

    @Input() set id(jobId: string) {
        this.jobIdSignal.set(jobId);
        this.loadJobData(jobId);
    }

    jobIdSignal = signal('');
    title       = signal('');
    budget      = signal<number>(0);
    category    = signal('');
    description = signal('');
    status      = signal<'open'|'in_progress'|'completed'>('open');
    errMessage  = signal('');

    loadJobData(jobId: string) {
        const existingJob = this.jobservice.myJobs().find(j => j.id === jobId);
        if (existingJob) {
            this.title.set(existingJob.title);
            this.budget.set(existingJob.budget);
            this.category.set(existingJob.category);
            this.description.set(existingJob.description);
            this.status.set(existingJob.status);
        }
    }

    update_job() {
        if (this.title() && this.budget() > 0) {
            this.jobservice.update(
                this.jobIdSignal(), // Use the signal value here
                this.title(),
                this.description(),
                this.category(),
                this.budget(),
                this.status(),
            );
            this.router.navigate(['/dashboard']);
        }
        else {
            this.errMessage.set("missing required fields");
        }
    }
}
