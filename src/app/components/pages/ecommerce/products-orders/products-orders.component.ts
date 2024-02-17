import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
    data!: Order[];
    OrderDataSource = new MatTableDataSource<Order>(this.Order);
    OrderDisplayedColumns: string[] = [
        'orderId',
        'user.username',
        'price',
        'orderDate',
        'status',
        'action'
    ];
    dropdownItems: string[] = ['Edit', 'Delete'];
    endpoint = 'order';
    sortActive = 'orderId';
    hasAction = true;
    DataNumber!: number;
    
    filterValue!: string;
    @ViewChild(TableComponent, { static: true }) table!: TableComponent;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private matDialog: MatDialog,
        private orderService : OrderService,
        private sortingService: SortingDataAccessorService 
        ){}
    
    ngOnInit() {
        this.loadData();
        this.OrderDataSource.sortingDataAccessor =this.sortingService.sortingDataAccessor;
        this.table.editEvent.subscribe((data) => this.onEdit(data));

    }

    ngAfterViewInit() {
        this.table.sort.sortChange.subscribe(
            () => (this.table.paginator.pageIndex = 0)
        );
        merge(this.table.paginator.page, this.table.sort.sortChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.orderService
                        .getPagedAndSortedOrder(
                            this.table.paginator?.pageIndex ?? 0,
                            this.table.paginator?.pageSize ?? 5,
                            this.table.sort?.active ?? this.sortActive,
                            this.table.sort?.direction ?? 'asc'
                        )
                        .pipe(catchError(() => observableOf(null)));
                }),
                map((data) => {
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
                this.OrderDataSource = new MatTableDataSource(data.content);
            });
    }

    loadData(): void{
        this.orderService
            .getOrders()
            .subscribe((data) => {
                console.log(data);
                this.OrderDataSource = new MatTableDataSource(data);
                // this.ProDataSource.data = data.content ;
            });
    }

    applyFilter(event: KeyboardEvent) {
        this.filterValue = (event.target as HTMLInputElement).value;
        this.OrderDataSource.filter = this.filterValue.trim().toLowerCase();

        this.OrderDataSource.filterPredicate = (data: any, filter: string) => {
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
