import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProposalDao } from '../../core/proposal/dao';

@Component({
  selector: 'app-post-proposals',
  imports: [FormsModule, RouterLink],
  templateUrl: './post-proposals.html',
  styleUrl: './post-proposals.css',
})
export class PostProposals {
  private router  = inject(Router);
  private proposal= inject(ProposalDao);

  @Input() id: string = '';
  budget     = signal(0);
  text       = signal('');
  errMessage = signal<string | null>(null);

  postProposal(){
      this.proposal.createProposal(this.id,this.budget(),this.text())
          .subscribe({
              next: () => {this.router.navigate(['/dashboard']); },
              error:(err) => {
                  this.errMessage.set(err);
              }
          });
  }
}
