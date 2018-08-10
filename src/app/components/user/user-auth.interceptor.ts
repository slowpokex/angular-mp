import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    const resultReq = accessToken ? req.clone({ headers: req.headers.set('Authorization', `bearer ${accessToken}`) }) : req;
    return next.handle(resultReq)
      .pipe(
        tap(() => {}, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
