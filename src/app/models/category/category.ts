import { Product } from "../product/product"
import { SubCategory } from "../subCategory/sub-category"

export class Category {
    id!:number
    name!:string
    gender!:string
    collection!:string
    subCategories!:SubCategory[]
    products!: Product[]
}

