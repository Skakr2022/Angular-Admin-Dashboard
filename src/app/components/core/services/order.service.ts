import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private orderUrl = 'http://localhost:8080/order';

    constructor(private http: HttpClient) {}

    public getOrders(): Observable<any> {
        return this.http.get<Order[]>(this.orderUrl);
    }

    createOrder(formData: FormData): Observable<object> {
        return this.http.post(`${this.orderUrl}`, formData);
    }
}
