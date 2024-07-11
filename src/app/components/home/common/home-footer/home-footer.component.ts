import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

}
