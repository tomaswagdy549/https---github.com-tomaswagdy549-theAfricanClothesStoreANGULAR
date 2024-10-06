import { Product } from "../product/product"

export class CartItem {
    cartId!:string
    size!:string
    productId!:number
    quantity!:number
    product!:Product
}
