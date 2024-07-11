import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  images: any[] | undefined;
	constructor(
        public themeService: CustomizerSettingsService,
    ) {}

    ngOnInit() {
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    imageSlides: OwlOptions = {
        items: 1,
		nav: true,
		loop: true,
		dots: false,
		autoplay: false,
		smartSpeed: 1000,
		autoplayHoverPause: true,
        responsive:{
            0:{
              items:1
            },
            600:{
              items:1,
            },
            1000:{
              items:1,
            },
            1400:{
              items:1,
            },
            2000:{
                items:1,
            },
        },
        navText: [
			"<i class='flaticon-chevron-1'></i>",
			"<i class='flaticon-chevron'></i>"
		]
    }

    responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

}