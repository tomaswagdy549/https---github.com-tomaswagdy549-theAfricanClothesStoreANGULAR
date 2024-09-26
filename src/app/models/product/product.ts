import { Brand } from "../brand/brand";
import { Category } from "../category/category";

export class Product {
    name:string="";
    availableSizes:string[]=[]
    price:Number = 0 
    categoryId:number=0 
    brandId:number=0
    quantity:number=0
    category!:Category
    brand!:Brand 
    id!:number
}
