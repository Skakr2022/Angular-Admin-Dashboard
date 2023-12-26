import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/components/core/services/api.service';
import { CoreService } from 'src/app/components/core/services/core.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';
import { CategoryDialogComponent } from 'src/app/components/shared/components/category-dialog/category-dialog.component';
import { EditCreateDialogComponent } from 'src/app/components/shared/components/edit-create-dialog/edit-create-dialog.component';
import { Category } from 'src/app/components/shared/models/Category.model';
import { dialogData } from 'src/app/components/shared/models/Dialog-data.model';
import { Product } from 'src/app/components/shared/models/Product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  CategoryProduct!:Category[];
  data!:Category[];
  CatDataSource=new MatTableDataSource<Category>(this.CategoryProduct);
  CatDisplayedColumns: string[] = ['categoryId' ,'categoryName','ProductNum','CreationDate', 'action'];
  dropdownItems: string[]=['Edit','Delete'];
  category="product_category";
  sortActive="categoryId";
  dialog = CategoryDialogComponent;
  hasAction=true;
  
  dialogCategory: dialogData={
    name:"EditCategory",
    title: "Update Category",
    actionButtonText: "Edit",
    data:this.data,
    endpoint:this.category,
    
    idField:"categoryId"

  };
  filterValue!: string ;
  

  constructor(private matDialog: MatDialog) { 

  }

  ngOnInit(){
    console.log(this.CatDataSource);
  }
 
  
  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    
    this.CatDataSource.filter = this.filterValue.trim().toLowerCase();
    console.log(this.CatDataSource);
  }

  openDialogCreate(): void{
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "CreateCategory",
      title: "Create category",
      actionButtonText: "Create",
      endpoint:this.category,
     
      idField:"categoryId"
    }
  
    const dialogRef = this.matDialog.open(CategoryDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
     
    }) 
  }
  
}
