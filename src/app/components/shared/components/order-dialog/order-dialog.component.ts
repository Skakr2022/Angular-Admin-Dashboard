import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/components/core/services/core.service';
import { OrderService } from 'src/app/components/core/services/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  Form: FormGroup;
  orderStatus=['pending','shipped','delivered','canceled'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService:OrderService,
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<OrderDialogComponent>
     ) {}

     ngOnInit() {
      this.Form = this._fb.group({
        orderStatus: new FormControl('', [Validators.required])
      });
    }  

    onSubmit() {
      const formData=new FormData();
  
      formData.append("orderStatus",this.Form.value.orderStatus);
  
      this.orderService.putOrder(this.data.Data.orderId,formData).subscribe({
       next: ()=>{
        this._coreService.openSuccessSnackBar('status has changed successfully!');
        this._dialogRef.close(true);
       },
       error: (err:HttpErrorResponse)=>{
          console.log(err);
          this._coreService.openErrorSnackBar(err.error.message);
       }
      }
      );
  
    }


}
