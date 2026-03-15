import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Dashboard } from './component/dashboard/dashboard';
import { AboutMe } from './component/about-me/about-me';
import { JobPosting }     from './component/job-posting/job-posting';
import { JobUpdate }      from './component/job-update/job-update';
import { Proposals }      from './component/proposals/proposals';
import { SearchJobs }     from './component/search-jobs/search-jobs';
import { ShowUser }       from './component/show-user/show-user';
import { PostProposals }  from './component/post-proposals/post-proposals';
import { Register }       from './component/register/register';
import { Review }         from './component/review/review';

export const routes: Routes = [
    { path: 'register'          ,component: Register },
    { path: 'login'             ,component: Login    },
    {
      path: 'dashboard',
      component: Dashboard,
      runGuardsAndResolvers: 'always',
      children: [
          { path: 'aboutme'           ,component: AboutMe       },
          { path: 'jobposting'        ,component: JobPosting    },
          { path: 'jobupdate/:id'     ,component: JobUpdate     },
          { path: 'proposals/:job_id' ,component: Proposals     },
          { path: 'review/:job_id/:target_id',component: Review },
          {
            path: 'searchjob'     ,
            component: SearchJobs ,
            children: [
              { path: 'showuser/:id'    ,component:ShowUser     },
              { path: 'postproposal/:id',component:PostProposals},

            ]
          },
      ]
    }
];
