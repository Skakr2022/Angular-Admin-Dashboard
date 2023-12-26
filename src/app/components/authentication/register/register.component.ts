import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../../core/services/Auth-Validators.service';
import { user } from '../../shared/models/user.model';
import { AuthService } from '../../core/services/Auth.service';
import { CoreService } from '../../core/services/core.service';

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
            fullName:['',[Validators.required,this.authValidators.validateFullName]],
            username:['',[Validators.required]],
            email:['',[Validators.required,Validators.email]],
            role:[''],
            password:['',[Validators.required,Validators.minLength(6),this.authValidators.passwordValidator]],
            confirmPassword:['',[Validators.required,this.authValidators.passwordMatchValidator,this.authValidators.passwordValidator]] 
          })
    }

    getFullNameErrorMessage() {
      if ((this.isEmpty && this.signupForm.get('fullName')?.hasError('required')) || (this.signupForm.get('fullName')?.hasError('required') && this.signupForm.get('fullName')?.touched)) {
          return 'You must enter a value';
      }
          return this.signupForm.get('fullName')?.hasError('invalidName') && this.signupForm.get('fullName')?.touched  && this.signupForm.get('fullName')?.value ? 'Not a valid fullName' : '';
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

    onSubmit(Data:user){
      if(this.signupForm.invalid){
            this.isEmpty=true;
      }else{ 

        const formData = new FormData();
        formData.append('fullName',this.signupForm.value.fullName)
        formData.append('email',this.signupForm.value.email)
        formData.append('password',this.signupForm.value.password)
        formData.append('username',this.signupForm.value.username)
        
        console.log(formData);
        const signup = {
            'fullName':this.signupForm.value.fullName,
            'email':this.signupForm.value.email,
            'password':this.signupForm.value.password,
            'username':this.signupForm.value.username
        };
  

      this.authService.register(signup).subscribe({
        next: (val: any) => {
          console.log("test")
          this.coreService.openSnackBar('successfully added!');
          this.router.navigate(['/authentication/login']);  
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