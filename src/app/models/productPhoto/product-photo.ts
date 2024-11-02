import { Product } from '../product/product';

export class ProductPhoto {
  id!: number;
  productId!: number;
  productPhotoUrl!: string;
  product!: Product;
}
