import { CartItem } from "../../../cartItem/cart-item"

export class AppliedCouponDTO {
    serialNumber!:string
    applicationUserId!:string
    cartItems:CartItem[]=[]
}
