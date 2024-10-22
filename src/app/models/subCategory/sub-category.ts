import { Category } from "../category/category"

export class SubCategory {
    id: number=0
    name:string=""
    categoryId:number=0
    category!:Category
}
