import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/components/core/services/product.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { Product } from 'src/app/components/shared/models/Product.model';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/components/core/services/cart.service';

@Component({
  selector: 'app-hot-deals-product',
  templateUrl: './hot-deals-product.component.html',
  styleUrls: ['./hot-deals-product.component.scss']
})
export class HotDealsProductComponent implements OnInit {
  quantity: number=1;
  products:Product[];
	images: any[] ;
  imageSlides4: OwlOptions = {
		items:5,
		nav: true,
		loop: true,
		dots: false,
		margin: -20,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
        navText: [
			"<i class='flaticon-chevron-1'></i>",
			"<i class='flaticon-chevron'></i>"
		],
    responsive: {
      0: {
        items: 1
      },
      515: {
        items: 2
      },
      695: {
        items: 3
      },
      935: {
        items: 4
      },
			1360: {
				items:5
			}
    }
  }
 

	constructor(
        public themeService: CustomizerSettingsService,
        private productService:ProductService,
        private cookieService: CookieService,
        private cartService: CartService
  ) {}

	  ngOnInit() {
	  this.getHotDealsProduct() ; 
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    getHotDealsProduct() {
       this.productService.getHotDealsProduct().subscribe({
        next: (product) =>{
          this.products= product;
        },
        error: (error) => {
          console.log(error);
        }
       })
    }

    addToCart(product: Product) {
      this.cartService.addToCart(product,this.quantity);
    }
 

}
