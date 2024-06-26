import { NotExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/components/core/services/Auth.service';
import { CoreService } from 'src/app/components/core/services/core.service';
import { RoleService } from 'src/app/components/core/services/role.service';
import { TokenStorageService } from 'src/app/components/core/services/token-storage.sevice';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  Form!:FormGroup;
  roles=['admin','user','moderator'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _coreService: CoreService,
              private _dialogRef: MatDialogRef<ChangeRoleComponent>,
              private fb:FormBuilder,
              private roleService: RoleService,
              private authService:AuthService,
              private tokenStorage:TokenStorageService,
              private router:Router) {}

  ngOnInit() {
    this.Form = this.fb.group({
      role: new FormControl('', [Validators.required])
    });
  }    
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorage.signOut();
        this.router.navigate(['authentication/login']);
      },
      error: err => {
        console.log(err);
      }
    });
  }  

  onSubmit() {
    const formData=new FormData();

    formData.append("role",this.Form.value.role);

    this.roleService.putRole(this.data.Data.id,formData).subscribe({
     next: ()=>{
      this.logout();
      window.alert("you should to signIn again to make these changes");
      this._coreService.openSuccessSnackBar('role has changed successfully!');
      this._dialogRef.close(true);
     },
     error: (err:any)=>{
        console.error(err);
     }
    }
    );

  }
  
}
