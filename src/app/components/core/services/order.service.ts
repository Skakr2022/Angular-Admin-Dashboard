import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../shared/models/order.model';
import { environment } from 'src/environments/environment.dev';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private orderUrl = `${environment.baseUrl}/order`;

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.orderUrl);
    }

    getPagedAndSortedOrder(
        pageNumber: number,
        pageSize: number,
        sortField: string,
        sortOrder: string
    ): Observable<any> {
        const params = new HttpParams()
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
            .set('sortField', sortField)
            .set('sortOrder', sortOrder);

        return this.http.get(`${this.orderUrl}/paginate`, { params }).pipe(
            map((res) => res)
        );
    }

    createOrder(formData: FormData): Observable<any> {
        return this.http.post(`${this.orderUrl}`, formData);
    }

    putOrder(orderId: number, formData: FormData): Observable<any> {
        return this.http.put(`${this.orderUrl}/${orderId}`, formData);
    }
}
