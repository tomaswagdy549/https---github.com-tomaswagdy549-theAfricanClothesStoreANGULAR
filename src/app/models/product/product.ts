import { Brand } from '../brand/brand';
import { Category } from '../category/category';
import { ProductAvailableSizes } from '../productAvailableSizes/product-available-sizes';
import { ProductPhoto } from '../productPhoto/product-photo';
import { SubCategory } from '../subCategory/sub-category';

export class Product {
  name: string = '';
  productAvailableSizes: ProductAvailableSizes[] = [];
  productPhotos: ProductPhoto[] = [];
  price: number = 0;
  categoryId: number = 0;
  subCategoryId: number = 0;
  note: string = '';
  onSale: boolean = false;
  salePrice!: number|null;
  brandId: number = 0;
  quantity: number = 0;
  category!: Category;
  subCategory!: SubCategory;
  brand!: Brand;
  id!: number;
  mainPhotoUrl!: string;
  gender!: string;
}
