
import { inject, Injectable }         from '@angular/core';
import { Observable }                 from 'rxjs/internal/Observable';
import { catchError, of, throwError } from 'rxjs';
import { ApiError }                   from '../http/api-error.model';
import { User }                       from './model';
import { AuthStore }                  from '../auth/store';
import { ApiClient }                  from '../http/api-client';


@Injectable({
    providedIn: 'root'
}) export class UsersDao {

    readonly #authStore: AuthStore = inject(AuthStore);
    readonly #http: ApiClient = inject(ApiClient);

    getMyProfile(): Observable<User|null> {
        if (!this.#authStore.isAuthenticated()) {
            return of(null);
        }

     return this.#http.get<User>('/users/me')
        .pipe(
            catchError((err: ApiError) => {
                // Handle error, e.g., log it or show a notification
                console.error('Failed to fetch user profile', err);
                return throwError(() => err);
            })
        );


    }

    getUserById(username: string): Observable<User> {
        return this.#http.get<User>(`/users/${username}`)
        .pipe(
            catchError((err: ApiError) => {
                // Handle error, e.g., log it or show a notification
                console.error(`Failed to fetch user with ID ${username}`, err);
                return throwError(() => err);
            })
        );
    }
}
