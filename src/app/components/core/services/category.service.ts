import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Category } from "../../shared/models/Category.model";

@Injectable({
   providedIn: 'root'
})

export class CategoryService {
   

   CategoriesURL='http://localhost:8080/product_category';
   
   constructor(private http:HttpClient){ }
   
   getCategories():Observable<any> {
     return this.http.get<Category>(this.CategoriesURL);
   }
   
   postCategories(productCategory:any):Observable<any>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(
         this.CategoriesURL,
         productCategory,
         { headers }
          );
   }

   public updateCategory(id:number,formData:FormData): Observable<any>{
      return this.http.put(`${this.CategoriesURL}/${id}`,formData);
   }
  
   deleteCategoryById(id:number):Observable<any>{
     return this.http.delete(`${this.CategoriesURL}/${id}`);
   }
   
   findCategory(
      pageNumber:number,
      pageSize:number,
      sortField:string,
      sortOrder:string
      ):Observable<any>{
      return this.http.get(`http://localhost:8080/product_category/paginate`,
        { params:new HttpParams()
         .set('page',pageNumber.toString()) 
         .set('size',pageSize.toString())
         .set('sortField',sortField)
         .set('sortOrder',sortOrder)
        })
        .pipe( 
         map(res=> res) 
        );
   }
   
   

}
