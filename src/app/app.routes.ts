import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Dashboard } from './component/dashboard/dashboard';
import { AboutMe } from './component/about-me/about-me';

export const routes: Routes = [
    {
      path: "",
      component: Dashboard,
      children: [
          { path: 'login',component: Login },
          { path: 'aboutme',component: AboutMe },
      ]
    }
];
