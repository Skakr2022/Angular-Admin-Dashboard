import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
    form:FormGroup;
    userData:any;
    constructor(
        public themeService: CustomizerSettingsService,
        private _fb:FormBuilder,
    ) {}

    ngOnInit(): void {

        this.form = this._fb.group({
            // fullName: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            
          });

        const userDataString = sessionStorage.getItem('auth-user');
        if (userDataString) {
          // Parse the string into a JavaScript object
          this.userData = JSON.parse(userDataString);
        } else {
          console.log('No user data found in session storage');
        }


        this.form.setValue({
            // fullName:this.userData.fullName,
            username:this.userData.username,
            email:this.userData.email

          });
    }



    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}