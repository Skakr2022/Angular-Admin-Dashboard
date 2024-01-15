import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
export class RoleService {
   URLRole='http://localhost:8080';

   constructor(private http:HttpClient){

   }

   getRole():Observable<any>{
    return this.http.get<any>(`${this.URLRole}/role`);
   }
   
   putRole(id:number,formData:FormData):Observable<any>{
    return this.http.put<any>(`${this.URLRole}/change_role/${id}`,formData);
   }
}
