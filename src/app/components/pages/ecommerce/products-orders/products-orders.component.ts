import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderSpec } from '@fullcalendar/core/internal';
import { OrderService } from 'src/app/components/core/services/order.service';
import { CategoryDialogComponent } from 'src/app/components/shared/components/category-dialog/category-dialog.component';
import { OrderDialogComponent } from 'src/app/components/shared/components/order-dialog/order-dialog/order-dialog.component';
import { TableComponent } from 'src/app/components/shared/components/table/table.component';
import { Category } from 'src/app/components/shared/models/Category.model';
import { dialogData } from 'src/app/components/shared/models/Dialog-data.model';
import { Order } from 'src/app/components/shared/models/order.model';

@Component({
    selector: 'app-products-orders',
    templateUrl: './products-orders.component.html',
    styleUrls: ['./products-orders.component.scss']
})
export class ProductsOrdersComponent implements AfterViewInit {

    
    ngOnInit() {
        this.loadData();
        console.log(this.CatDataSource.data)
    }
    constructor(private orderService : OrderService){}

    resultsLength = 0;
    isLoadingResults = false;
    isEmpty = false;
    Order!: Order[];
    data!: Order[];
    CatDataSource = new MatTableDataSource<Order>(this.Order);
    CatDisplayedColumns: string[] = [
        'orderId',
        'customer',
        'price',
        'date',
        'status',
    ];
    dropdownItems: string[] = ['Edit', 'Delete'];
    endpoint = 'order';
    sortActive = 'orderId';
    dialog = OrderDialogComponent;
    hasAction = true;
    DataNumber!: number;
    dialogCategory: dialogData = {
        name: 'EditOrder',
        title: 'Update Order',
        actionButtonText: 'Edit',
        data: this.data,
        endpoint: this.endpoint,
        idField: 'orderId',
    };
    filterValue!: string;
    @ViewChild(TableComponent, { static: true }) table!: TableComponent;


    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.CatDataSource.paginator = this.paginator;
    }


    loadData(): void{
        this.orderService
            .getOrders()
            .subscribe((data) => {
                console.log(data);
                this.CatDataSource = new MatTableDataSource(data);
                // this.ProDataSource.data = data.content ;
            });
    }


    pending = true;
    outOfStock = true;
    delivered = true;

}
