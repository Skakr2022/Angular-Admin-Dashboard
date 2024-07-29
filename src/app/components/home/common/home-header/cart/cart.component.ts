import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/components/core/services/cart.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { CartItem } from 'src/app/components/shared/models/cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  isDisabled: boolean = false;
  isToggled: boolean = false;
  cartItems: CartItem[];
  totalPrice: number;

  constructor(
    public themeService: CustomizerSettingsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getTotal();
  }

  isDark() {
    this.themeService.isDark();
  }

  isRTLEnabled() {
    this.themeService.isRTLEnabled();
  }

  plusAction(item: CartItem) {
    if (item.quantity < item.product.stockQuantity) {
      item.quantity++;
      this.cartService.saveCart(this.cartItems);
      this.getTotal();
    }
  }

  minusAction(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart(this.cartItems);
      this.getTotal();
    }
  }

  validateQuantity(item: CartItem) {
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > item.product.stockQuantity) {
      item.quantity = item.product.stockQuantity;
    }
    this.cartService.saveCart(this.cartItems);
    this.getTotal();
  }

  getCartItems() {
    this.cartItems = this.cartService.getCart();
  }

  getTotal() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
    this.getCartItems();
    this.getTotal();
  }
}
