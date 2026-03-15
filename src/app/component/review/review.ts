import { Component, Input, inject, signal } from '@angular/core';
import { ReviewService } from '../../core/review/service';
import { RouterLink } from '@angular/router';
import { JobDao } from '../../core/job/dao';
import { ApiError } from '../../core/http/api-error.model';

@Component({
  selector: 'app-review',
  imports: [RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {
    private jobs    = inject(JobDao);
    private service = inject(ReviewService);

    @Input() job_id   : string = '';
    @Input() set target_id(value: string) {
        if(value.length === 0){
            this.jobs.getById(this.job_id)
                .subscribe({
                    next: (res) => {
                        this.id.set(res.owner_id)
                    },
                    error:(err) => {
                        this.errMessage.set(err);
                    }
                })
            return;
        }
        this.id.set(value);
    };
    readonly rating = signal<1|2|3|4|5>(5);
    readonly id     = signal('');
    readonly errMessage = signal('');

    setRating(val: number) {
        if (val >= 1 && val <= 5) {
            this.rating.set(val as 1|2|3|4|5);
        }
    }

    create() {
        this.service.createReview(this.job_id,this.id(),this.rating())
            .subscribe({
                next: () => {this.errMessage.set("thank you for your review")},
                error:(err: ApiError) => {this.errMessage.set(err.message)}
            })
    }
}
