import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../core/services/token-storage.sevice';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CoreService } from '../../core/services/core.service';

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
        private tokenStorage:TokenStorageService,
        private userService: UserService,
        private _coreService:CoreService
    ) {}

    ngOnInit(): void {

        this.form = this._fb.group({
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          username: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required]),
            
          });

        const userDataString = this.tokenStorage.getUser();
        if (userDataString) {
          // Parse the string into a JavaScript object
          this.userData = JSON.parse(userDataString).user;
        } else {
          console.log('No user data found in session storage');
        }


        this.form.setValue({
          firstName:this.userData.firstName,
          lastName:this.userData.lastName,
          username:this.userData.username,
          email:this.userData.email
        });
    }
    
    onSubmit(){
      const formData = new FormData();
      formData.append("description",this.form.value.description)
      formData.append("name",this.form.value.name)
      formData.append("category",this.form.value.category)
      formData.append("price",this.form.value.price)
      formData.append("stockQuantity",this.form.value.quantity)   
      this.userService 
        .updatUser(this.userData.id,formData)
        .subscribe({ 
          next: (val: any) => {
            this._coreService.openSuccessSnackBar('user details updated!');
           
          },
          error: (err: HttpErrorResponse) => {
            console.error(err)
            this._coreService.openErrorSnackBar(err.error.message);
          },
        });
    }


    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}