import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    cartData: any; 
    totalPrice: number;

    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
       this.fetchCartDataFromQueryParams();
     console.log(this.cartData)  ;
    }

    fetchCartDataFromQueryParams() {
      this.route.queryParams.subscribe(params => {
        if (params['cartData']) {
          this.cartData = JSON.parse(decodeURIComponent(params['cartData']));
        }
        if (params['totalPrice']) {
          this.totalPrice = +params['totalPrice'];
        }
      });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}