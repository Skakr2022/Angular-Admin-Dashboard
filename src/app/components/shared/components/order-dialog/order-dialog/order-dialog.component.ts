import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/components/core/services/core.service';
import { OrderService } from 'src/app/components/core/services/order.service';

@Component({
    selector: 'app-order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent {
    empForm!: FormGroup;

    constructor(
        private orderService: OrderService,
        private _coreService: CoreService,
        private _dialogRef: MatDialogRef<OrderDialogComponent>
    ) {}

    onSubmit() {
        if (this.empForm.valid) {
            const formData = new FormData();
            formData.append('userId', this.empForm.value.userId);
            formData.append('productIds', this.empForm.value.productIds);
            formData.append('quantities', this.empForm.value.quantities);
            this.orderService.createOrder(formData).subscribe({
                next: (val: any) => {
                    this._coreService.openSuccessSnackBar(
                        'Order successfully added!'
                    );
                    this._dialogRef.close(true);
                },
                error: (err: any) => {
                    console.error(err);
                    this._coreService.openErrorSnackBar(err.error);
                },
            });
        }
    }
}
