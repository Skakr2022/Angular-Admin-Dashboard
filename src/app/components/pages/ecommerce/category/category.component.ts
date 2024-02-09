import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
    catchError,
    of as observableOf,
    map,
    merge,
    startWith,
    switchMap,
} from 'rxjs';
import { ApiService } from 'src/app/components/core/services/api.service';
import { CategoryService } from 'src/app/components/core/services/category.service';
import { CoreService } from 'src/app/components/core/services/core.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';
import { CategoryDialogComponent } from 'src/app/components/shared/components/category-dialog/category-dialog.component';
import { EditCreateDialogComponent } from 'src/app/components/shared/components/edit-create-dialog/edit-create-dialog.component';
import { TableComponent } from 'src/app/components/shared/components/table/table.component';
import { Category } from 'src/app/components/shared/models/Category.model';
import { dialogData } from 'src/app/components/shared/models/Dialog-data.model';
import { Product } from 'src/app/components/shared/models/Product.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
    resultsLength = 0;
    isLoadingResults = false;
    isEmpty = false;
    CategoryProduct!: Category[];
    data!: Category[];
    CatDataSource = new MatTableDataSource<Category>(this.CategoryProduct);
    CatDisplayedColumns: string[] = [
        'categoryId',
        'categoryName',
        'ProductNum',
        'CreationDate',
        'action',
    ];
    dropdownItems: string[] = ['Edit', 'Delete'];
    endpoint = 'product_category';
    sortActive = 'categoryId';
    dialog = CategoryDialogComponent;
    hasAction = true;
    DataNumber!: number;
    dialogCategory: dialogData = {
        name: 'EditCategory',
        title: 'Update Category',
        actionButtonText: 'Edit',
        data: this.data,
        endpoint: this.endpoint,
        idField: 'categoryId',
    };
    filterValue!: string;
    @ViewChild(TableComponent, { static: true }) table!: TableComponent;

    constructor(
        private matDialog: MatDialog,
        // private table:TableComponent,
        private apiService: ApiService,
        private _coreService: CoreService
    ) {}

    ngOnInit() {
        // this.loadData();
        this.listData();
        console.log(this.CatDataSource);
        this.table.editEvent.subscribe((data) => this.onEdit(data));
        this.table.deleteEvent.subscribe((data) => this.onDelete(data));
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
                    return this.apiService
                        .listPageableSortableData(
                            this.endpoint,
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
                this.CatDataSource = new MatTableDataSource(data.content);
            });
    }

    onDelete(data: any): void {
        console.log(data);
        this.apiService.deleteData(this.endpoint, data.categoryId).subscribe(
            (data) => {
                console.log(data);
                this.loadData();
                this._coreService.openSuccessSnackBar(
                    'data with id :  has deleted'
                );
            },
            (error) => {
                console.error(error);
                this._coreService.openErrorSnackBar(error.error);
            }
        );
    }

    onEdit(data: any): void {
        console.log(data);
        console.log(this.endpoint);
        console.log(data.categoryId);
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = true;
        dialogConfig.width = '500px';
        dialogConfig.data = {
            name: this.dialogCategory.name,
            title: this.dialogCategory.title,
            actionButtonText: this.dialogCategory.actionButtonText,
            Data: data,
            endpoint: this.endpoint,
            categoryId: data.categoryId,
        };

        const dialogRef = this.matDialog.open(
            CategoryDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
            this.loadData();
        });
    }

    loadData(): void {
        this.apiService
            .listPageableSortableData(
                this.endpoint,
                this.table.paginator?.pageIndex ?? 0,
                this.table.paginator?.pageSize ?? 5,
                this.table.sort?.active ?? this.sortActive,
                this.table.sort?.direction ?? 'asc'
            )
            .subscribe((data) => {
                console.log(data);
                this.CatDataSource = new MatTableDataSource(data.content);
                // this.ProDataSource.data = data.content ;
            });
    }

    listData() {
        console.log('listData');
        this.apiService.getData(this.endpoint).subscribe((data) => {
            console.log(data.length);
            this.DataNumber = data.length;
            if (data.length == 0) {
                this.isEmpty = true;
            }
        });
    }

    applyFilter(event: KeyboardEvent) {
        this.filterValue = (event.target as HTMLInputElement).value;

        this.CatDataSource.filter = this.filterValue.trim().toLowerCase();
        console.log(this.CatDataSource);
    }

    openDialogCreate(): void {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = true;
        dialogConfig.width = '500px';
        dialogConfig.data = {
            name: 'CreateCategory',
            title: 'Create category',
            actionButtonText: 'Create',
            endpoint: this.endpoint,

            idField: 'categoryId',
        };

        const dialogRef = this.matDialog.open(
            CategoryDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
            this.loadData();
        });
    }
}
