import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        //'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      }
    });
    // return next.handle(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log('interceptor token is expired');
          this.auth.logout();
          this.router.navigate(['/welcome']);
          this.auth.collectFailedRequest(request);
        }
      }
    });
  }
}