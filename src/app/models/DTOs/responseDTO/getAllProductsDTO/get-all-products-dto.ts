import { Product } from "../../../product/product";
import { BaseModel } from "../base-model";

export class GetAllProductsDTO extends BaseModel {
    entities!:Product[]
}
