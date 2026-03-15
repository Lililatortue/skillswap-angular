import { HttpInterceptorFn }      from "@angular/common/http";
import { inject }                 from "@angular/core";
import { Router }                 from "@angular/router";
import { catchError, NEVER, throwError } from 'rxjs';
import { AuthStore }              from "../auth/store"




 /*
  *
  *
  *
  */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const router= inject(Router);

  //set header
  if(store.isAuthenticated()) {
    req = req.clone({
      setHeaders: {
          Authorization: `Bearer ${store.token()}`
      }
    });
  }

  return next(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          store.clearSession();

          console.log("user session is expired");
          router.navigate(["/login"], {queryParams: {
              returnUrl: router.url,
              reason: "session_expired"
            }
          })
          return NEVER;
        }
        return throwError(() => error);
      })
    );
}
