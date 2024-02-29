import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.sevice';
import { AuthenticationResponse } from '../../shared/models/authentication-response.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage:TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const storedUser = this.tokenStorage.getUser();
    if (storedUser) {
      const authResponse: AuthenticationResponse = JSON.parse(storedUser );
      const token = authResponse.token;
      if (token) {
        const authReq = request.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(request);
  }
}
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
