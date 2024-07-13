import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencyDataUrl = 'assets/currency.json'; // Path to your JSON file
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient) {}

  getCurrencyData(): Observable<any> {
    return this.http.get(this.currencyDataUrl);
  }

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => data.rates)
    );
  }

}