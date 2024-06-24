import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../../shared/models/languages.model';


@Injectable({
    providedIn: 'root',
})

export class LanguageService {

    constructor(private translateService:TranslateService){}

    configureTranslation(): void {
        const userLang = navigator.language || 'en';
        const languageCode = userLang.split('-')[0];
        this.translateService.setDefaultLang(languageCode);
        this.translateService.use(languageCode);
    }

    getStoredLanguage(): Languages | null {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        return storedLanguage ? JSON.parse(storedLanguage) : null ;
    }

    storeLanguage(language: Languages): void {
        localStorage.setItem('selectedLanguage', JSON.stringify(language));
    }

}
