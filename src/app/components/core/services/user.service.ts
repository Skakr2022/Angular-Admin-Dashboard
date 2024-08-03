import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.dev";
import { User } from "../../shared/models/user.model";

@Injectable({
   providedIn: 'root'
})
export class UserService {

   private usersURL = `${environment.baseUrl}/user`;
   private userPaginationUrl = `${environment.baseUrl}/user/paginate`;

   constructor(private http: HttpClient) { } 
   
   getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.usersURL);
   }

   updatUser(userId: number, formData: FormData): Observable<any> {
     return this.http.put(`${this.usersURL}/update/${userId}`, formData);
   }

   findUsers(
      pageIndex: number,
      pageSize: number,
      sortField: string,
      sortOrder: string
   ): Observable<any> {
      const params = new HttpParams()
         .set('page', pageIndex.toString())
         .set('size', pageSize.toString())
         .set('sortField', sortField)
         .set('sortOrder', sortOrder);

      return this.http.get(this.userPaginationUrl, { params });
   }
}
