import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../common/header/toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../../core/services/Auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.sevice';
import { Router } from '@angular/router';
import { CoreService } from '../../../core/services/core.service';
import { Languages } from '../../../shared/models/languages.model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';


const languages_data:Languages[] = [
  { name: 'English', flag: 'usa', code: 'en' },
  { name: 'Arabic', flag: 'spain', code: 'ar' },
  { name: 'French', flag: 'germany', code: 'fr' }
]

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements AfterViewInit,OnInit {
  languages = languages_data;
  selectedLanguage:Languages ;
  isToggled = false;
  user:any ;
  userRole:string;
  firstName?:string;
  lastName?:string;
  image?:string;
  scrolled = false;
  @HostListener('window:scroll', [])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition > 0) {
            this.scrolled = true;
        } else {
            this.scrolled = false;
        }
    }
  
  constructor(
      private toggleService: ToggleService,
      private datePipe: DatePipe,
      public  themeService: CustomizerSettingsService,
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private router: Router,
      private translateService:TranslateService,
      private languageService:LanguageService,
      private coreService:CoreService
  ) { }
 
  ngOnInit(){
      // translation configuration
      this.languageService.configureTranslation();
      // setup lanuage
      this.setupLanguage();
  }

  ngAfterViewInit(){ }

  setupLanguage(): void {
      const storedLanguage =this.languageService.getStoredLanguage()
      if (storedLanguage) {
          this.selectedLanguage = storedLanguage;
          this.translateService.use(this.selectedLanguage.code);
      } else {
          // Default language
          this.selectedLanguage = this.languages[0];
      }
  }


  languageSelect(language:Languages):void {
      this.selectedLanguage=language;
      this.translateService.use(language.code);
      // Store the selected language in localStorage
      this.languageService.storeLanguage(language);
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

}
