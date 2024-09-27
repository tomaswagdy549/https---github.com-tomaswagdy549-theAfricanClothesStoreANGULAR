import { Category } from "../../../category/category";
import { BaseModel } from "../base-model";

export class GetAllCategoriesDTO extends BaseModel {
    categories!:Category[]
}
