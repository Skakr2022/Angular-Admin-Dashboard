import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/components/core/services/product.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { Product } from 'src/app/components/shared/models/Product.model';

@Component({
  selector: 'app-more-products',
  templateUrl: './more-products.component.html',
  styleUrls: ['./more-products.component.scss']
})

export class MoreProductsComponent implements OnInit {
    
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
    ) {}

	ngOnInit() {
	  this.getProducts() ; 
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    getProducts() {
       this.productService.getProducts().subscribe({
        next: (product) =>{
          this.products= product;
        },
        error: (error) => {
          console.log(error);
        }
       })
    }

}
