import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/components/core/services/api.service';
import { CoreService } from 'src/app/components/core/services/core.service';
import { Category } from '../../models/Category.model';
import { ProductService } from 'src/app/components/core/services/product.service';

@Component({
  selector: 'app-edit-create-dialog',
  templateUrl: './edit-create-dialog.component.html',
  styleUrls: ['./edit-create-dialog.component.scss']
})

export class EditCreateDialogComponent {
  empForm!: FormGroup;

  public categories: Category[] = [];
  userFile: any;
  message: string = "";
  imgURL: any = "";
  imagePath: any;
  
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private apiService:ApiService,
        private productService :ProductService,
        private _fb: FormBuilder,
        private _coreService: CoreService,
        private _dialogRef: MatDialogRef<EditCreateDialogComponent> ) {}
  
  ngOnInit(): void {
    this.listProductCategories();
   
    this.empForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      category: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });

    if(this.data.Data){
      this.empForm.setValue({
        name:this.data.Data.name,
        description:this.data.Data.description,
        imageUrl:this.data.Data.imageUrl,
        category:this.data.Data.category.categoryName
      })
    }
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        console.log(data)
        this.categories = data;
      }
    )
  }

  onSubmit(){
    if(this.empForm.valid){
      if (this.data.Data) {
        console.log(this.data.Data);
        const formData = new FormData();
        formData.append("description",this.empForm.value.description)
        formData.append("name",this.empForm.value.name) 
        formData.append("category",this.empForm.value.category) 
        formData.append("imageUrl",this.userFile)   
        this.apiService 
          .updatData(this.data.endpoint,this.data.id, formData)
          .subscribe({ 
            next: (val: any) => {
              this._coreService.openSnackBar('Product details updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        const formData = new FormData();
        console.log(this.empForm.value)
        formData.append("description",this.empForm.value.description)
        formData.append("name",this.empForm.value.name)
        formData.append("category",this.empForm.value.category)
        formData.append("imageUrl",this.userFile)
        this.apiService.postData(this.data.endpoint,formData).subscribe(
          {
            next: (val: any) => {
              this._coreService.openSnackBar('Product successfully added!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          }
        );
      }
    }else {
      console.log("no valid data")
    }
}


    onSelectFile(event: Event) {
      console.log("file   ....")
      const e = (event.target as HTMLInputElement);
      if ( e.files!.length > 0 )
      {
        const file = e.files![0];
        this.userFile = file;
       // this.f['profile'].setValue(file);
   
      
   
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
  }
  

}