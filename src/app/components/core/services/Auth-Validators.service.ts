import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthValidatorsService {

  constructor() { }

  checkValidForm(){
    const formControls = document.querySelectorAll('.form-control') as NodeListOf<HTMLInputElement>;
          formControls.forEach((inputElement: HTMLInputElement) => {
              inputElement.classList.add('isEmpty');
          });
  }

  validateFullName(control: AbstractControl): { [key: string]: boolean } | null {
    console.log(control);
    const fullName = control.value;
    const words = fullName.trim().split(' ');

    if (words.length >= 2) {
      return null;
    } else {
      return { invalidName: true };
    }
  }

  passwordMatchValidator(): { [key: string]: boolean } | null {
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById('ConfirmPass') as HTMLInputElement;
    return password.value !== confirmPassword.value ?  { passwordsMismatch: true } : null;
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber;

    return valid ? null : { passwordRequirements: true };
  }

}

