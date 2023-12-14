import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth.service';
import { CoreService } from '../../core/services/core.service';
import { TokenStorageService } from '../../core/services/token-storage.sevice';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    hide = true;
    loginForm!: FormGroup;
    loadedPosts:any[]=[];
    isCorrect:boolean=false;
    isEmpty:boolean=false;
    roles: string[] = [];

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService,
        private coreService: CoreService,
        private tokenStorage: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.loginForm= this.fb.group({
            email: new FormControl('',[Validators.required]),
            password: new FormControl('',Validators.required) 
        })
    }


    getEmailErrorMessage() {
        if ((this.isEmpty && this.loginForm.get('email')?.hasError('required')) || (this.loginForm.get('email')?.hasError('required') && this.loginForm.get('email')?.touched)) {
            return 'You must enter a value';
        }
            return '';
   
    }

    getPasswordErrorMessage() {
        if ((this.isEmpty && this.loginForm.get('password')?.hasError('required')) || (this.loginForm.get('password')?.hasError('required') && this.loginForm.get('password')?.touched)) {
            return 'You must enter a value';
        }
            return '';
  
    }

    onSubmit(){

    if(this.loginForm.invalid){
            this.isEmpty=true;
    }else{
        const formData = new FormData();
        formData.append("email",this.loginForm.value.email)
        formData.append("password",this.loginForm.value.password)

        this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.tokenStorage.saveUser(data);
              window.location.reload();
            } 
              this.coreService.openSnackBar('user successfully conected!');
          },
          error: (err: any) => {
            console.error(err);
          },
        })
      }
    }


    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}