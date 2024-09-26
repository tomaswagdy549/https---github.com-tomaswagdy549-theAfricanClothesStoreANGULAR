import { Brand } from "../../../brand/brand";
import { BaseModel } from "../base-model";

export class GetAllBrandsDTO extends BaseModel {
    brands!:Brand[]
}
