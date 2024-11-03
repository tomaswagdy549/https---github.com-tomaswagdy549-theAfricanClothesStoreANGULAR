import { CategoryDirectory } from "./categoryDirectory/category-directory"

export class AddedDiscountDTO {
    discountPercentage:number=0
    categoryIds:CategoryDirectory[]=[]
    discountDurationInHours:number=0
}
