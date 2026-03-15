export type Proposal = {
    id            : string;
    job_id        : string;
    status        : string;
    price         : number;
    cover_letter  : string;
  } | {
    id            : string;
    job_id        : string;
    status        : string;
    price         : number;
    message       : string;
}
