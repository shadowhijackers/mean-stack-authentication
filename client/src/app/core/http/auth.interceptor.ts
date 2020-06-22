import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {StorageKeys} from "../modals/storage-keys.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userData = localStorage.getItem(StorageKeys.TOKEN);
    if (userData) {
      let headers = request.headers.append('access-token', userData['access-token']);
       request = request.clone({
        headers
      });
    }

    if (!/(login|register)/.test(request.url) && !userData) {
      this.clearSessionState();
      return EMPTY;
    }

    return next.handle(request).pipe(
      catchError((res) => {
        // when session closed move to sign in page
        if (res instanceof HttpErrorResponse && res.status === 401) {
          this.clearSessionState();
        }
        return throwError(res);
      })
    );

  }

  clearSessionState() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
