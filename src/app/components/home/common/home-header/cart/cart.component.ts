import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  cartIsEmpty:boolean;
  constructor(
    public themeService: CustomizerSettingsService,
    private cartService: CartService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.checkEmptyCart();
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
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
    }) 
  }

  getTotal() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
    this.getCartItems();
    this.getTotal();
  }

  checkEmptyCart() {
    if(this.cartItems.length ==0) {
      this.cartIsEmpty == true;
    }else {
      this.cartIsEmpty == false; 
    }
  }

  goToCheckout() {
    const encodedData = encodeURIComponent(JSON.stringify(this.cartItems));
    this.router.navigate(
      ['/home/checkout/'], 
      { queryParams:{ 
        cartData: encodedData, 
        totalPrice: this.totalPrice 
        } 
      }
    );
  }
}
