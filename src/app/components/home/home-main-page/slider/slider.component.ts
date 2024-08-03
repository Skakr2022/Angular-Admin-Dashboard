import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
    images: string[] = [
        'assets/img/planning/planning1.jpg',
        'assets/img/planning/planning2.jpg',
        'assets/img/planning/planning3.jpg',
        'assets/img/planning/planning4.jpg'
    ];
    selectedIndex = 0;
    intervalTime = 2000;
    autoSlideSubscription: Subscription;

    constructor(public themeService: CustomizerSettingsService) {}

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        this.pauseAutoSlide();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    selectedImage(index: number): void {
        this.selectedIndex = index;
    }

    startAutoSlide() {
        this.autoSlideSubscription = interval(this.intervalTime).subscribe(() => {
            this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
        });
    }

    pauseAutoSlide() {
        if (this.autoSlideSubscription) {
            this.autoSlideSubscription.unsubscribe();
        }
    }

    resumeAutoSlide() {
        this.startAutoSlide();
    }

    onImageClick(index: number): void {
        console.log('Button clicked on image index:', index);
    }
}
