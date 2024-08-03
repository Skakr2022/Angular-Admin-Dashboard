import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../../core/services/Auth-Validators.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../core/services/Auth.service';
import { CoreService } from '../../core/services/core.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

    hide = true;
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
    @ViewChild('Email') seeNgModel!:NgModel;
    emailFieldBlurred=true;
    signupForm!:FormGroup;
    passwordsMismatch:boolean=false;
    isEmpty:boolean=false;

    constructor(
        public themeService: CustomizerSettingsService,
        private authValidators: AuthValidatorsService,
        private authService:AuthService,
        private coreService: CoreService,
        private fb:FormBuilder,
        private router:Router,
    ) {}

    ngOnInit(): void {
        this.signupForm=this.fb.group({
            firstName:['',[Validators.required]],
            lastName:['',[Validators.required]],
            username:['',[Validators.required]],
            email:['',[Validators.required,Validators.email]],
            role:[''],
            password:['',[Validators.required,Validators.minLength(6),this.authValidators.passwordValidator]],
            confirmPassword:['',[Validators.required,this.authValidators.passwordMatchValidator,this.authValidators.passwordValidator]] 
          })
    }

    getFirstNameErrorMessage() {
      if ((this.isEmpty && this.signupForm.get('firstName')?.hasError('required')) || (this.signupForm.get('firstName')?.hasError('required') && this.signupForm.get('firstName')?.touched)) {
          return 'You must enter a value';
      }
          return this.signupForm.get('firstName')?.hasError('invalidName') && this.signupForm.get('firstName')?.touched  && this.signupForm.get('firstName')?.value ? 'Not a valid fullName' : '';
    }

    getlastNameErrorMessage() {
        if ((this.isEmpty && this.signupForm.get('lastName')?.hasError('required')) || (this.signupForm.get('lastName')?.hasError('required') && this.signupForm.get('lastName')?.touched)) {
            return 'You must enter a value';
        }
            return this.signupForm.get('lastName')?.hasError('invalidName') && this.signupForm.get('lastName')?.touched  && this.signupForm.get('latName')?.value ? 'Not a valid fullName' : '';
      }

    getUserNameErrorMessage() {
        if ((this.isEmpty && this.signupForm.get('username')?.hasError('required')) || (!this.signupForm.get('username')?.valid && this.signupForm.get('username')?.touched)) {
            return 'You must enter a value';
        }
            return '';
    }

    getEmailErrorMessage() {
        if ((this.isEmpty && this.signupForm.get('email')?.hasError('required')) || (this.signupForm.get('email')?.hasError('required') && this.signupForm.get('email')?.touched)) {
            return 'You must enter a value';
        }
            return !this.signupForm.get('email')?.valid && this.signupForm.get('email')?.touched && this.signupForm.get('email')?.value? 'Not a valid email' : '';
    }
    

    getPasswordErrorMessage() {
        if ((this.isEmpty && this.signupForm.get('password')?.hasError('required')) || (this.signupForm.get('password')?.hasError('required') && this.signupForm.get('password')?.touched)) {
            return 'You must enter a value';
        }
            return !this.signupForm.get('password')?.valid && this.signupForm.get('password')?.touched  && this.signupForm.get('password')?.value ? 'Not a valid password' : '';
    }

    getConPasswordErrorMessage(){
        if ((this.isEmpty && this.signupForm.get('confirmPassword')?.hasError('required')) || (this.signupForm.get('confirmPassword')?.hasError('required') && this.signupForm.get('confirmPassword')?.touched)) {
            return 'You must enter a value';
        }
            return this.signupForm.get('confirmPassword')?.hasError('passwordsMismatch') && this.signupForm.get('confirmPassword')?.touched  && this.signupForm.get('confirmPassword')?.value ? 'Passwords do not match' : '';
    }

    onSubmit(Data:User){
      if(this.signupForm.invalid){
            this.isEmpty=true;
      }else{ 

        const formData = new FormData();
        formData.append('firstName',this.signupForm.value.firstName)
        formData.append('lastName',this.signupForm.value.lastName)
        formData.append('email',this.signupForm.value.email)
        formData.append('password',this.signupForm.value.password)
        formData.append('username',this.signupForm.value.username)

      this.authService.register(formData).subscribe({
        next: (val: any) => {
          console.log("test")
          this.coreService.openSuccessSnackBar('successfully added!');
          this.router.navigate(['/authentication/login']);  
        },
        error: (err: HttpErrorResponse) => {
          this.coreService.openErrorSnackBar(err.error);
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