import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/components/core/services/core.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';
import { EditCreateDialogComponent } from 'src/app/components/shared/components/edit-create-dialog/edit-create-dialog.component';
import { dialogData } from 'src/app/components/shared/models/Dialog-data.model';
import { Product } from 'src/app/components/shared/models/Product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent   {
 
    Product!:Product[];
    data!:Product;
    ProDataSource=new MatTableDataSource<Product>(this.Product);
    ProDisplayedColumns: string[] = ['productId','name' ,'category.categoryName','stockQuantity','price', 'description', 'lastUpdate','action'];
    dropdownItems: string[]=['Edit','Delete'];
    product="product";
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
      endpoint:this.product,
      idField:"productId"
    };
    filterValue!: string ;
    
    constructor(
                private matDialog: MatDialog,
                private _liveAnnouncer: LiveAnnouncer,
                private _coreService: CoreService,
                private sortingService: SortingDataAccessorService) { }
    
    ngOnInit() {
       
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
