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
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private isLoggedIn :boolean = false;

  constructor(private http: HttpClient) { }

  register(formData:FormData): Observable<object> {  
    this.isLoggedIn =true;
    return this.http.post(this.AUTH_API,formData,{responseType:'arraybuffer'});  
  }  

  login(username:any,password:any): Observable<object> {  
    return this.http.post(this.AUTH_API1, 
    
      {
        username,
        password
      },
      this.httpOptions
    
     );  
  }

  // Sign out
  logout(): Observable<any> {
    return this.http.post(this.AUTH_API2 , { }, {responseType:'arraybuffer'});
  }

}
