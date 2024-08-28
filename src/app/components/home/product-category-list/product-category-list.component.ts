import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/Product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  products: Product[];
  categoryId:number;
  categoryName: string;
  
  constructor(
    public themeService: CustomizerSettingsService,
    private productService: ProductService,
    private route :ActivatedRoute
  ) {}

  ngOnInit() {
    this.handleRouteQueryParams();
    this.getProductsByCategory(this.categoryId);
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (products)=>{
         this.products=products;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  handleRouteQueryParams(){
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.categoryName = params['categoryName'];
    });
  };

}
