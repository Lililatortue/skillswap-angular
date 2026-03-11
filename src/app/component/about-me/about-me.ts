import { Component, inject, signal } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {
    router        = inject(Router);
    userservice   = inject(UsersService);
    readonly user = signal<User | null>(null);
    readonly err_message = signal<string | null>(null);

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.userservice.getMyProfile().subscribe({
            next: (res) => {
                this.user.set(res);
            },
            error:(err) => {
                this.err_message.set(err);
            },
        })
    }

    leave() {
        this.router.navigate([""])
    }
}
