import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../../shared/models/Product.model';
import { CartItem } from '../../shared/models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartKey = 'cart';

  constructor(private cookieService: CookieService) {}

  addToCart(product: Product, quantity: number): void {
    let cart = this.getCart();
    const existingItem = cart.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
    console.log(cart);
  }

  getCart(): CartItem[] {
    return JSON.parse(this.cookieService.get(this.cartKey) || '[]');
  }

  public saveCart(cart: CartItem[]): void {
    this.cookieService.set(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.product.productId !== productId);
    this.saveCart(cart);
  }

  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + (item.quantity * item.product.priceAfterDiscount), 0);
  }
}
