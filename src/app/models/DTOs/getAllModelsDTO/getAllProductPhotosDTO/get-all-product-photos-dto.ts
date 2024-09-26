import { ProductPhoto } from "../../../productPhoto/product-photo";
import { BaseModel } from "../base-model";

export class GetAllProductPhotosDTO extends BaseModel {
    photos!:ProductPhoto[]
}
