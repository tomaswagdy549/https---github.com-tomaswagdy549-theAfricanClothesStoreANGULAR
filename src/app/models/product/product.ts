import { Brand } from "../brand/brand";
import { Category } from "../category/category";
import { ProductAvailableSizes } from "../productAvailableSizes/product-available-sizes";
import { ProductPhoto } from "../productPhoto/product-photo";

export class Product {
    name:string="";
    productAvailableSizes:ProductAvailableSizes[]=[]
    productPhotos:ProductPhoto[]=[]
    price:Number = 0 
    categoryId:number=0 
    brandId:number=0
    quantity:number=0
    category!:Category
    brand!:Brand 
    id!:number
    mainPhotoUrl!:string
}
