import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../../shared/models/Product.model';
import { CartItem } from '../../shared/models/cartItem.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartKey = 'cart';
  private cartSubject: BehaviorSubject<CartItem[]>;

  public cart$:Observable<CartItem[]>;

  constructor(private cookieService: CookieService) {
    const initialCart = this.getCart();
    this.cartSubject = new BehaviorSubject<CartItem[]>(initialCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number): void {
    let cart = this.cartSubject.getValue();
    const existingItem = cart.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
  }

  getCart(): CartItem[] {
    return JSON.parse(this.cookieService.get(this.cartKey) || '[]');
  }

  public saveCart(cart: CartItem[]): void {
    this.cookieService.set(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.cartSubject.getValue();
    cart = cart.filter(item => item.product.productId !== productId);
    this.saveCart(cart);
  }

  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + (item.quantity * item.product.priceAfterDiscount), 0);
  }
}
