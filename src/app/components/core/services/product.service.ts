import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../shared/models/Product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/product';
  private apiServerUrl = 'http://localhost:8080/product_category';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get<Product[]>(`http://localhost:8080/product`)
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/${categoryId}/products`);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get<Product>(`${this.productUrl}/${id}`)
  }

  public getProductCategories(): Observable<any>{
    return this.http.get(this.apiServerUrl).pipe();
  }

  getLatestProduct(): Observable<any> {
    return this.http.get(`${this.productUrl}/latest-products`);
  }

  getHotDealsProduct(): Observable<any> {
    return this.http.get(`${this.productUrl}/hot-deals`);
  }

  createProduct(formData:FormData): Observable<object> {  
    return this.http.post(`${this.productUrl}`, formData,{
      responseType:'arraybuffer'
    } );  
  }  

  public deleteProductById(id: number): Observable<any>{
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  public updateProduct(id:number,formData:FormData): Observable<any>{
    return this.http.put(`${this.productUrl}/${id}`,formData);
  }

  public getphoto(id:number): Observable<ArrayBuffer>{
    return this.http.get(`${this.productUrl}`+'/img/'+`${id}`,{responseType:'arraybuffer'})
  }

  findProduct(
    pageNumber:number,
    pageSize:number,
    sortField:string,
    sortOrder:string
    ):Observable<any>{
    return this.http.get( `${this.productUrl}`+`/paginate`,
      { params:new HttpParams()
       .set('page',pageNumber.toString()) 
       .set('size',pageSize.toString())
       .set('sortField',sortField)
       .set('sortOrder',sortOrder)
      }).pipe( 
       map(res=> res) 
      );
  }

    getPagedAndSortedProductsByCategoy(
      categoryId:number,
      pageNumber:number,
      pageSize:number,
      sortField:string,
      sortOrder:string):Observable<any> {
      
        return this.http.get(`${this.productUrl}/${categoryId}/paginate`,
          { params:new HttpParams()
            .set('page',pageNumber.toString())
            .set('size',pageSize.toString()) 
            .set('sortField',sortField) 
            .set('sortOrder',sortOrder) 
          }).pipe( 
            map(res=> res) 
          );
    }


}
