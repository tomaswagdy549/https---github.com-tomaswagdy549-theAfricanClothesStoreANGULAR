import { SubCategory } from '../../../subCategory/sub-category';
import { BaseModel } from '../base-model';

export class GetAllSubCategoriesDTO extends BaseModel {
  entities!: SubCategory[];
}
