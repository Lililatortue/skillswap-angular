import { Component, inject, signal }  from '@angular/core';
import { User }                       from '../../core/user/model';
import { AuthService } from '../../core/auth/service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-me',
  imports: [RouterLink],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {
    user_service   = inject(AuthService);
    readonly user  = signal<User | null>(null);
    readonly err_message = signal<string | null>(null);

    ngOnInit(): void {
        this.init()
    }

    init() {
       this.user.set(this.user_service.whoami()!)
    }

}
