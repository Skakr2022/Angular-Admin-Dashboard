import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.dev";

@Injectable({
    providedIn: 'root'
})
  
export class RoleService {

   UrlRole= `${environment.baseUrl}/user`;

   constructor(private http:HttpClient) {}

   getRole():Observable<any>{
    return this.http.get<any>(`${this.UrlRole}/role`);
   }
   
   putRole(id:number,formData:FormData):Observable<any>{
    return this.http.put<any>(`${this.UrlRole}/change_role/${id}`,formData);
   }
}
