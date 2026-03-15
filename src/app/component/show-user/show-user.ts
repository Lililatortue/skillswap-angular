import { Component, inject, Input, signal } from '@angular/core';
import { User }                      from '../../core/user/model';
import { RouterLink } from '@angular/router';
import { JobService } from '../../core/job/service';

@Component({
  selector: 'app-show-user',
  imports: [RouterLink],
  templateUrl: './show-user.html',
  styleUrl: './show-user.css',
})
export class ShowUser {
  private readonly jobService = inject(JobService);

  readonly user = signal<User | null>(null);
  readonly err_message = signal<string | null>(null);

  @Input() set id(id: string) {
    this.init(id);
  }

  init(id: string) {
    // Reset state before fetching new data
    this.user.set(null);
    this.err_message.set(null);

    this.jobService.userDetails(id).subscribe({
      next: (userData) => {
        console.log(userData);
        this.user.set(userData);
      },
      error: (err) => {
        // Handling the 401/404 you mentioned earlier
        if (err.status === 404) {
          this.err_message.set("User or Job not found.");
        } else if (err.status === 401) {
          this.err_message.set("Unauthorized access.");
        } else {
          this.err_message.set("An unexpected error occurred.");
        }
        console.error('Fetch error:', err);
      }
    });
  }
}
