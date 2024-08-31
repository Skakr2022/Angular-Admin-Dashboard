import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../common/header/toggle.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Languages } from '../../../shared/models/languages.model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { CategoryService } from 'src/app/components/core/services/category.service';
import { Category } from 'src/app/components/shared/models/Category.model';
import { CartService } from 'src/app/components/core/services/cart.service';
import { Router } from '@angular/router';


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

  itemsNumber:number;
  languages = languages_data;
  selectedLanguage:Languages ;
  isToggled = false;
  user:any ;
  userRole:string;
  firstName?:string;
  lastName?:string;
  image?:string;
  scrolled = false;
  Categories:Category[];
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
      public  themeService: CustomizerSettingsService,
      private translateService:TranslateService,
      private languageService:LanguageService,
      private categoryService: CategoryService,
      private cartService: CartService,
      private router:Router
  ) {}
 
  ngOnInit(){
      // translation configuration
      this.languageService.configureTranslation();
      // setup lanuage
      this.setupLanguage();
      this.getCategories();
      this.getItemsNumber();
  }

  ngAfterViewInit(){ }

  setupLanguage(): void {
      const storedLanguage =this.languageService.getStoredLanguage();
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

  getCategories() {
    this.categoryService.getCategories().subscribe({
    next: (category)=>{
        this.Categories=category;
    },
    error: (error) => {
        console.log(error);
    }
    })
  }

  onCategoryClicked(category: Category) {
    this.router.navigate(['home/product-category'],{
        queryParams:{
            categoryId:category.categoryId,
            categoryName:category.categoryName
        }
    });
  }

  getItemsNumber() {
    this.cartService.cart$.subscribe(cart => {
        this.itemsNumber = cart.length;
    });
  }

}
