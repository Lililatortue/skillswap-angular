import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authservice = inject(AuthService);
  router      = inject(Router);

  //user related
  aboutme(){
      this.router.navigate(['/aboutme']);
  }
  //job service


  //proposal service
  offers(){
      this.router.navigate(['/offers']);
  }

  //auth service
  logout(){
      //clear localstorage
      this.authservice.Logout();
  }
  login(){
      this.router.navigate(['/login']);
  }
}
