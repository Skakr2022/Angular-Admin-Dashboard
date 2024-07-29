import { Category } from "./Category.model";

export interface Product{
  
         productId : number,
         imageUrl : string,
         stockQuantity:number,
         priceAfterDiscount:number,
         priceBeforeDiscount:number,
         discountPercent:number,
         description : string,
         name: string,
         creationDate : Date,
         lastUpdate : Date,
         category : Category,
         more_horiz:string;

}