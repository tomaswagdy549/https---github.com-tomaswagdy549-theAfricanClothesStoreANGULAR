import { Order } from "../order/order"
import { Product } from "../product/product"

export class OrderDetail {
    orderId!:number
    productId!:number
    quantity!:number
    price!:number
    size!:string
    order!:Order
    product!:Product
}
