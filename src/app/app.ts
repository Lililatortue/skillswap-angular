import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private auth   = inject(AuthService);
  private router = inject(Router);

  constructor() {
      effect(() => {
          const user = this.auth.store.isAuthenticated();

          if (!user) {
            this.router.navigate(['/login']);
          }
          else {
            this.router.navigate(['/dashboard']);
          }
      });
  }
}
