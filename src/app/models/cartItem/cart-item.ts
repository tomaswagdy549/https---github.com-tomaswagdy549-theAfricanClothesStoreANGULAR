import { Product } from "../product/product"

export class CartItem {
    applicationUserId!:string
    size!:string
    productId!:number
    quantity!:number
    product!:Product
}
