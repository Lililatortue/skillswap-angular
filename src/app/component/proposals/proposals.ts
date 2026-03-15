import { Component, computed, inject, Input, signal }  from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProposalDao } from '../../core/proposal/dao';
import { Proposal } from '../../core/proposal/model';
import { ApiError } from '../../core/http/api-error.model';

@Component({
  selector: 'app-proposals',
  imports: [RouterLink],
  templateUrl: './proposals.html',
  styleUrl: './proposals.css',
})
export class Proposals {
    private dao = inject(ProposalDao);
    private router = inject(Router);

    @Input() set job_id(value: string){
      this.dao.fetch_proposal(value)
        .subscribe({
           next: (res) =>{
              console.log(res);
              this.allProposals.set(res);
           },
           error: (err: ApiError)=>{
              this.errProposals.set(err.message);
           }
        });

    };
    allProposals = signal<Proposal[]>([])
    errProposals = signal('loading proposal');

    accept(proposal_id:string){

      this.dao.accept(proposal_id)
          .subscribe({
              next: () => {
                  this.router.navigate(["/dashboard"])
              },
              error:(err: ApiError) => {
                  this.errProposals.set(err.message)
              }
          })
    }

}
