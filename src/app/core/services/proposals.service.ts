import { inject, Injectable } from "@angular/core";
import { Job } from "../models/job.model";
import { catchError, Observable, throwError } from "rxjs";
import { ApiError } from "../http/api-error.model";
import { AuthStore } from "../auth/auth.store";
import { ApiClient } from "../http/api-client";
import { Proposal } from "../models/proposal.model";





type ProposalDto = {
  price:number;
  text: string;
}


//list de container necessaire
@Injectable({providedIn: 'root'})
export class ProposalService {
    readonly #http: ApiClient = inject(ApiClient);

    create_proposal(job_id:number, price:number, text: string){
        const dto: ProposalDto = {
            price: price,
            text : text,
        }

        this.#http.post<Proposal>(`/jobs/${job_id}/proposals`,dto)
            .pipe(
                catchError((err: ApiError)=>{
                console.error("Error sent: "+err);
                return throwError(()=>err)
            })
        );
    }

    proposals(job_id: number){
        this.#http.get<Proposal[]>(`/jobs/${job_id}/proposals`)
            .pipe(
                catchError((err: ApiError)=>{
                console.error("Error sent: "+err);
                return throwError(()=>err)
            })
        );
    }
    accept(proposals_id: number){
        this.#http.patch<Proposal>(`/proposals/${proposals_id}/accept`,null)
            .pipe(
                catchError((err: ApiError)=>{
                console.error("Error sent: "+err);
                return throwError(()=>err)
            })
        );
    }

    mybids(){
        this.#http.get<Proposal[]>(`proposals/my-bids`)
            .pipe(
                catchError((err: ApiError)=>{
                console.error("Error sent: "+err);
                return throwError(()=>err)
              })
            )
    }

    delete_proposal(proposals_id: number) {
        this.#http.delete(`proposals/${proposals_id}`)
            .pipe(
                catchError((err: ApiError)=>{
                console.error("Error sent: "+err);
                return throwError(()=>err)
              })
            )
    }
}

export type MissingRequiredFields = ApiError & {
    status : 400,
    message: "Price and cover_letters/message are required"
};

export type JobIsNotOpen = ApiError & {
    status : 400,
    message: "Proposal is only for open job"
};

export type JobIsNoLongerOpen = ApiError & {
    status : 400,
    message: "Job is no longer open"
};

export type CantDeleteNonePendingProposal = ApiError & {
    status : 400
    message: "Only pending proposal can be deleted"
};

export type JobIsYours = ApiError & {
    status : 403,
    message: "you cannot submit a proposal to your own job"
};

export type ProposalIsYours = ApiError & {
    status : 403,
    message: "You cannot accept your own proposal"
};

export type Forbidden = ApiError & {
    status : 403,
    message: "Forbidden"
};

export type JobNotFoundError = ApiError & {
    status : 404,
    message: "Job not found"
};
export type ProposalNotFound = ApiError & {
    status : 404,
    message: "Proposal not found"
}
export type RelatedJobsNotFound = ApiError & {
    status : 404,
    message: "Related job not found"
}

