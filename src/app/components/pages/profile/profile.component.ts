import { Component, ViewChild } from "@angular/core";
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexFill,
    ChartComponent
} from "ng-apexcharts";
import { TokenStorageService } from "../../core/services/token-storage.sevice";
import { AuthenticationResponse } from "../../shared/models/authentication-response.model";import { user } from "../../shared/models/user.model";
 


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
   
    username? : string;
    email? : string ;
    image? : string ;
    userData!:any;
    firstName?: string;
    lastName?: string;
    constructor(
        public themeService: CustomizerSettingsService,
        private tokenStorage : TokenStorageService
    ) {}

    ngOnInit(): void {

        const data = this.tokenStorage.getUser();
        const user  = JSON.parse(data).user;
        this.email = user.email;
        this.username = user.username;
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.image=user.imageUrl;
    }

    

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}