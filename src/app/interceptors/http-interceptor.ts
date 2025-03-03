import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}

export const LoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime = Date.now();
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`${req.method} ${req.urlWithParams} ${duration}ms`);
      }
    })
  );
};