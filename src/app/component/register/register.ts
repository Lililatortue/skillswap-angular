import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth/service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth   = inject(AuthService);
  private router = inject(Router);

  // Data Signals
  name     = signal('');
  username = signal('');
  email    = signal('');
  password = signal('');
  bio      = signal('');
  skills   = signal<string[]>([]);

  // Error Signals
  errName = signal<string | null>(null);
  errUsername = signal<string | null>(null);
  errEmail = signal<string | null>(null);
  errPassword = signal<string | null>(null);
  errApi = signal<string | null>(null);

  // Validation Guard
  guard = computed(() => {
    return this.name().length > 0 &&
           this.username().length > 0 &&
           this.email().includes('@') &&
           this.password().length >= 5 &&
           !this.errEmail() && !this.errPassword();
  });

  // Sanitizers (matching your logic)
  sanitizeName(val: string) { this.name.set(val); }

  sanitizeUsername(val: string) { this.username.set(val); }

  sanitizeEmail(val: string) {
    this.email.set(val);
    this.errEmail.set(val.includes('@') ? null : 'Invalid email format');
  }

  sanitizePassword(val: string) {
    this.password.set(val);
    this.errPassword.set(val.length >= 5 ? null : 'Password too short (min 8)');
  }

  sanitizeBio(val: string) { this.bio.set(val); }

  sanitizeSkills(val: string) {
    const skillArr = val.split(',').map(s => s.trim()).filter(s => s !== '');
    this.skills.set(skillArr);
  }

  Register() {
    const payload = {
      name: this.name(),
      username: this.username(),
      email: this.email(),
      password: this.password(),
      bio: this.bio(),
      skills: this.skills()
    };

    this.auth.register(payload).subscribe({
      next: () => this.router.navigate(['/login'], { replaceUrl: true }),
      error: (err) => this.errApi.set(err.error || 'Registration failed')
    });
  }
}
