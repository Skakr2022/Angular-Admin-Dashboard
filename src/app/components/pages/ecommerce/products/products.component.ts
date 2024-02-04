import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of as observableOf, merge, startWith, switchMap, map } from 'rxjs';
import { ApiService } from 'src/app/components/core/services/api.service';
import { CoreService } from 'src/app/components/core/services/core.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';
import { EditCreateDialogComponent } from 'src/app/components/shared/components/edit-create-dialog/edit-create-dialog.component';
import { TableComponent } from 'src/app/components/shared/components/table/table.component';
import { dialogData } from 'src/app/components/shared/models/Dialog-data.model';
import { Product } from 'src/app/components/shared/models/Product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit ,AfterViewInit {
    isLoadingResults=true;
    isEmpty:boolean=false;
    DataNumber!:number;
    Product!:Product[];
    data!:Product;
    ProDataSource=new MatTableDataSource<Product>(this.Product);
    ProDisplayedColumns: string[] = ['productId','name' ,'category.categoryName','stockQuantity','price', 'description', 'lastUpdate','action'];
    dropdownItems: string[]=['Edit','Delete'];
    endpoint="product";
    sortActive="productId";
    dialog = EditCreateDialogComponent;
    hasAction=true;
    hasImage=true;
    imagePosition=1;
    dialogProduct: dialogData={
      name: "EditProduct",
      title: "Update Product",
      actionButtonText: "Edit",
      data: this.data,
      endpoint:this.endpoint,
      idField:"productId"
    };
    filterValue!: string ;
    idField="productId";
    @ViewChild(TableComponent, { static: true }) table!: TableComponent;
    constructor(
                private matDialog: MatDialog,
                private sortTable: TableComponent, 
                private apiService:ApiService,
                private _liveAnnouncer: LiveAnnouncer,
                private _coreService: CoreService,
                private sortingService: SortingDataAccessorService) { }
  
    
    ngOnInit() {
      //  this.loadData();
       this.listData();
       this.ProDataSource.sortingDataAccessor=this.sortingService.sortingDataAccessor;
       this.table.editEvent.subscribe((data) => this.onEdit(data));
       this.table.deleteEvent.subscribe((data) => this.onDelete(data));
   
    }

    ngAfterViewInit(){
     this.table.sort.sortChange.subscribe(() => (this.table.paginator.pageIndex = 0));
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
            this.table.sort?.direction ?? "asc")
            .pipe(catchError(() => observableOf(null)));
            
      }),
      map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        // this.resultsLength = data.total_count;
        return data;
          
      }),
     ).subscribe((data)=>{
        this.ProDataSource = new MatTableDataSource(data.content) ;
      });

      // this.table.sort.sortChange
      //  .subscribe(()=>{
      //   this.ProDataSource = new MatTableDataSource(this.loadData() as any) 
      // }); 
    }
    
    onEdit(data: any): void {
      
    console.log(data.productId);
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: this.dialogProduct.name,
      title: this.dialogProduct.title,
      actionButtonText: this.dialogProduct.actionButtonText,
      Data: data,
      endpoint:this.endpoint,
      productId:data.productId
    }

    const dialogRef = this.matDialog.open(EditCreateDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {this.loadData();} )
  
    }
  
    onDelete(data: any): void {
    console.log(data);
    this.apiService.deleteData(this.endpoint,data.productId).subscribe(
      data => {
        console.log(data);
        this.loadData();
        this._coreService.openSuccessSnackBar('data with id :  has deleted')
      },
      error=>{
        console.error(error);
        this._coreService.openErrorSnackBar(error.error);
      }
    )
    }

   

    loadData():void{
      this.apiService
      .listPageableSortableData(
        this.endpoint,
        this.table.paginator?.pageIndex ?? 0,
        this.table.paginator?.pageSize ?? 5,
        this.table.sort?.active ?? this.sortActive,
        this.table.sort?.direction ?? "asc")
        .subscribe((data)=>{
          console.log(data);
         this.ProDataSource=new MatTableDataSource(data.content);
        // this.ProDataSource.data = data.content ;
        });
    }
  
    listData(){
      console.log("listData");
      this.apiService
      .getData(this.endpoint).subscribe(data=> {
        console.log(data.length);
        this.DataNumber=data.length;
        if(data.length==0){
          this.isEmpty=true;
        }
      })
    }
   
    applyFilter(event: KeyboardEvent) {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.ProDataSource.filter = this.filterValue.trim().toLowerCase();
  
      this.ProDataSource.filterPredicate = (data: any, filter: string) => {
         const category = JSON.stringify(data.category.categoryName).toLowerCase();
         const name = JSON.stringify(data.name).toLowerCase();
         const description = JSON.stringify(data.description).toLowerCase();
         const lastUpdate = JSON.stringify(data.lastUpdate).toLowerCase();
         filter = filter.toLowerCase(); 
        return      category.includes(filter) 
                 || name.includes(filter) 
                 || description.includes(filter) 
                 || lastUpdate.includes(filter);
      };
    } 
    
    openDialogCreate(): void {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.width = "500px";
      
      dialogConfig.data = {
        name: "CreateProduct",
        title: "Create Product",
        actionButtonText: "Create",
        endpoint:"product",
      }
      
      const dialogRef = this.matDialog.open(EditCreateDialogComponent,dialogConfig);
      dialogRef.afterClosed().subscribe( result => {
        
      } )
    }
  
}
