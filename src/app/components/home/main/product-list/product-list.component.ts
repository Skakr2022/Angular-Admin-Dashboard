import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
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
    ) {}

	ngOnInit() {
	  }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }


}
