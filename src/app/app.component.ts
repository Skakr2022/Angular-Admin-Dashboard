import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../app/components/customizer-settings/customizer-settings.service';
import { ToggleService } from '../app/components/common/header/toggle.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'Tagus - Material Design Angular Admin Dashboard Template';

    isToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    isBlankPage() {
        const url = this.router.url;
        const blankPageUrls = [
          '/error-500',
          '/coming-soon',
          // Add other specific URLs here if needed
        ];
        return blankPageUrls.includes(url) || url.startsWith('/home') || url.startsWith('/authentication');
    }

    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}