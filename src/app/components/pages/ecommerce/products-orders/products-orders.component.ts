import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderSpec } from '@fullcalendar/core/internal';
import { merge, startWith, switchMap, catchError, map ,of as observableOf} from 'rxjs';
import { OrderService } from 'src/app/components/core/services/order.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';
import { CategoryDialogComponent } from 'src/app/components/shared/components/category-dialog/category-dialog.component';
import { OrderDialogComponent } from 'src/app/components/shared/components/order-dialog/order-dialog.component';
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

    pending = true;
    outOfStock = true;
    delivered = true;
    resultsLength = 0;
    isLoadingResults = false;
    isEmpty = false;
    Order!: Order[];
    dataSource = new MatTableDataSource<Order>(this.Order);
    displayedColumns: string[] = [
        'orderId',
        'user.username',
        'price',
        'orderDate',
        'status',
        'action'
    ];
    sortActive = 'orderId';
    DataNumber!: number;
    
    filterValue!: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private matDialog: MatDialog,
        private orderService : OrderService,
        private sortingService: SortingDataAccessorService 
        ){}
    
    ngOnInit() {
        this.listData();
        this.dataSource.sortingDataAccessor =this.sortingService.sortingDataAccessor;
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(
            () => (this.paginator.pageIndex = 0)
        );
        merge(this.paginator.page, this.sort.sortChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.orderService
                        .getPagedAndSortedOrder(
                            this.paginator?.pageIndex ?? 0,
                            this.paginator?.pageSize ?? 5,
                            this.sort?.active ?? this.sortActive,
                            this.sort?.direction ?? 'asc'
                        )
                        .pipe(catchError(() => observableOf(null)));
                }),
                map((data: any) => {
                    this.isLoadingResults = false;

                    if (data === null) {
                        return [];
                    }

                    // Only refresh the result length if there is new data. In case of rate
                    // limit errors, we do not want to reset the paginator to zero, as that
                    // would prevent users from re-triggering requests.
                    // this.resultsLength = data.total_count;
                    return data;
                })
            )
            .subscribe((data) => {
                
                this.dataSource = new MatTableDataSource(data.content);
            });
    }

    loadData(): void {
        this.orderService
            .getPagedAndSortedOrder(
                this.paginator?.pageIndex ?? 0,
                this.paginator?.pageSize ?? 5,
                this.sort?.active ?? 'orderId',
                this.sort?.direction ?? 'asc'
            )
            .subscribe((data) => {
                console.log(data);
                this.dataSource = new MatTableDataSource(data.content);
                // this.ProDataSource.data = data.content ;
            });
    }

    listData() {
        this.orderService.getOrders().subscribe((data) => {
            console.log(data);
            this.DataNumber = data.length;
            if (data.length == 0) {
                this.isEmpty = true;
            }
        });
    }

    applyFilter(event: KeyboardEvent) {
        this.filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = this.filterValue.trim().toLowerCase();

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const username = JSON.stringify(data.user.username).toLowerCase();
            // const price = JSON.stringify(data.price).toLowerCase();
            const orderDate = JSON.stringify(data.orderDate).toLowerCase();
            const status = JSON.stringify(data.status).toLowerCase();
            filter = filter.toLowerCase();
            return (
                username.includes(filter) ||
                // price.includes(filter) ||
                orderDate.includes(filter) ||
                status.includes(filter)
            );
        };
    }

    onEdit(data:any): void {
        console.log(data);
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = true;
        dialogConfig.width = '500px';

        dialogConfig.data = {
            actionButtonText: 'edit',
            Data: data
        };

        const dialogRef = this.matDialog.open(
            OrderDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {this.loadData();});
    }

}
