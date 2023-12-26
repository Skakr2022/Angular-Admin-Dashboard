import { Product } from "./Product.model";
   
export interface Category {
        categoryId:number;
        categoryName:string;
        creation_date:Date;
        product:Product;
}