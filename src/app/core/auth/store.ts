import { Injectable, signal, computed } from '@angular/core'
import { User } from '../user/model'


@Injectable({providedIn: 'root'})
export class AuthStore {
  private readonly TOKEN_KEY ="platform_authn";
  private readonly USER_KEY ="platform_user";


  readonly token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  readonly isAuthenticated = computed(() => !!this.token());
  readonly user = signal<User | null>(this.parseUser());


  createSession(token: string, user: User){

    localStorage.setItem(this.TOKEN_KEY,token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    this.token.set(token);
    this.user.set(user);
  }

  clearSession() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.token.set(null);
    this.user.set(null);
  }


  private parseUser(): User | null{
    const raw = localStorage.getItem(this.USER_KEY);

    return raw ? JSON.parse(raw): null;
  }

}

