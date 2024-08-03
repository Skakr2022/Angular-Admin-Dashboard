import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authUrl = `${environment.baseUrl}/user/signup`;
  private loginUrl = `${environment.baseUrl}/user/login`;
  private logoutUrl = `${environment.baseUrl}/user/signout`;

  constructor(private http: HttpClient) { }

  register(signUp: FormData): Observable<object> {
    return this.http.post(this.authUrl, signUp);
  }

  login(loginRequest: FormData): Observable<object> {
    return this.http.post(this.loginUrl, loginRequest);
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {}, { responseType: 'arraybuffer' });
  }
}
