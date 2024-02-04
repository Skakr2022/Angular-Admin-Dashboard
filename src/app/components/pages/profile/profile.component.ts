import { Component, ViewChild } from "@angular/core";
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexFill,
    ChartComponent
} from "ng-apexcharts";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    userData!:any;
    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    ngOnInit(): void {
    const userDataString = sessionStorage.getItem('auth-user');
    if (userDataString) {
      // Parse the string into a JavaScript object
      this.userData = JSON.parse(userDataString);
    } else {
      console.log('No user data found in session storage');
    }
    }

    

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}