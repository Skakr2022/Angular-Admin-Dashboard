import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { user } from "../../shared/models/user.model";

@Injectable({
   providedIn: 'root'
})

export class UserService {

   usersURL='http://localhost:8080/user';
   userPaginationUrl='http://localhost:8080/user/paginate';
   constructor(private http:HttpClient){ } 
   
   getUsers():Observable<any> {
     return this.http.get<user>(this.usersURL);
   }

   findUsers(
      pageIndex:number,
      pageSize:number,
      sortField:string,
      sortOrder:string
   ):Observable<any>{
      return this.http.get(this.userPaginationUrl,
      { params:new HttpParams()
         .set('page',pageIndex.toString())
         .set('size',pageSize.toString())
         .set('sortField',sortField)
         .set('sortOrder',sortOrder)
      })
   }
}
