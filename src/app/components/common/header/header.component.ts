import { Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../core/services/Auth.service';
import { TokenStorageService } from '../../core/services/token-storage.sevice';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isToggled = false;
    user:any;
    isSticky: boolean = false;
    userRole:string;
    firstName:string;
    lastName:string;
    image?:string;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(){
        const userDataString = this.tokenStorage.getUser();
        if (userDataString) {
            // Parse the string into a JavaScript object
            this.user = JSON.parse(userDataString).user;
            this.userRole=this.user.role.name;
            this.firstName=this.user.firstName;
            this.lastName=this.user.lastName;
            this.image=this.user.imageUrl;
            console.log(this.user.role.name);
          } else {
            console.log('No user data found in session storage');
          }
        
        
    }
    
    
    

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

    logout(): void {
        this.authService.logout().subscribe({
          next: res => {
            console.log(res);
            this.tokenStorage.signOut();
            this.router.navigate(['authentication/logout']);
          },
          error: err => {
            console.log(err);
          }
        });
    }

}