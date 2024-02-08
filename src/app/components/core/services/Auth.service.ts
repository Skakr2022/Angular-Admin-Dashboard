import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API  =  'http://localhost:8080/user/signup';
  private AUTH_API1 = 'http://localhost:8080/user/login'  ;
  private AUTH_API2 = 'http://localhost:8080/user/signout';

  constructor(private http: HttpClient) { }

  register(singUp:FormData): Observable<object> { 
    return this.http.post(this.AUTH_API,singUp);  
  }  

  login(loginRequest:FormData): Observable<object> {  
    return this.http.post(this.AUTH_API1, loginRequest);  
  }

  // Sign out
  logout(): Observable<any> {
    return this.http.post(this.AUTH_API2 , { }, {responseType:'arraybuffer'});
  }

}
