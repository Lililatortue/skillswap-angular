
export type Job = {
  id            : string;
  owner_id      : string;
  title         : string;
  description   : string;
  budget        : number;
  category      : string;
  status        : 'open' | 'in_progress' | 'completed';
  freelancer_id : string | null;
}
