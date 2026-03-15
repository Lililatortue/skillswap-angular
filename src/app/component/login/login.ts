import { Component, computed, inject, signal } from '@angular/core';
import { AuthService, LoginDto } from '../../core/auth/service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    router      = inject(Router);
    auth        = inject(AuthService);

    email       = signal<string | null>(null);
    errEmail    = signal<string | null>(null);
    password    = signal<string | null>(null);
    errPassword = signal<string | null>(null);
    errApi      = signal<string | null>(null);

    guard       = computed(()=> !!this.email() && !!this.password());

    Login(){
        if(!this.guard()) {
            return;
        }
        const dto: LoginDto = {
          email   : this.email()!,
          password: this.password()!,

        }

        this.auth.login(dto).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.errApi.set(err.message);
            }
        });
    }

    sanitizeEmail(email: string) {
        const trimmed = email.trim();
        if(!trimmed || trimmed.length === 0) {
          this.email.set(null);
          this.errEmail.set("Email can't be null")
          return;
        }
        this.email.set(trimmed);
        this.errEmail.set(null)
    }

    sanitizePassword(password: string) {
        const trimmed = password.trim();
        if(!trimmed || trimmed.length === 0) {
          this.password.set(null);
          this.errPassword.set("Password can't be null")
          return;
        }
        this.password.set(trimmed);
        this.errPassword.set(null)

    }
}
