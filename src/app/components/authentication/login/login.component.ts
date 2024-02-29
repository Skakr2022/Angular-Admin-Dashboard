import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/Auth.service';
import { CoreService } from '../../core/services/core.service';
import { TokenStorageService } from '../../core/services/token-storage.sevice';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm!: FormGroup;
    loadedPosts: any[] = [];
    isCorrect: boolean = false;
    isEmpty: boolean = false;
    roles: string[] = [];
    errorMessage: string;
    constructor(
        private router:Router,
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService,
        private coreService: CoreService,
        private tokenStorage: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required),
        });
    }

    getEmailErrorMessage() {
        if (
            (this.isEmpty &&
                this.loginForm.get('email')?.hasError('required')) ||
            (this.loginForm.get('email')?.hasError('required') &&
                this.loginForm.get('email')?.touched)
        ) {
            return 'You must enter a value';
        }
        return '';
    }

    getPasswordErrorMessage() {
        if (
            (this.isEmpty &&
                this.loginForm.get('password')?.hasError('required')) ||
            (this.loginForm.get('password')?.hasError('required') &&
                this.loginForm.get('password')?.touched)
        ) {
            return 'You must enter a value';
        }
        return '';
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.isEmpty = true;
        } else {
            const formData = new FormData();
            formData.append('username', this.loginForm.value.email);
            formData.append('password', this.loginForm.value.password);
            this.errorMessage = '';

            this.authService.login(formData).subscribe({
                next: (data: any) => {
                    if (data) {
                        this.tokenStorage.saveUser(JSON.stringify(data));
                    }
                    this.coreService.openSuccessSnackBar(
                        'user successfully conected!'
                    );
                    
                    // this.router.navigate(['/authentication/login']);  
                    this.router.navigate(['/ecommerce']);
                   
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error)
                        if (error.status === 401) {
                            console.log("401")
                            this.errorMessage = 'Login and / or password is incorrect';
                            this.coreService.openErrorSnackBar(
                                this.errorMessage
                            );
                        }
                },
            });
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
