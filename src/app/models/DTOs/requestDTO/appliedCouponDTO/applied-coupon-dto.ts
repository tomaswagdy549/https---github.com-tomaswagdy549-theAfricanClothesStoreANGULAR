import { CartItem } from "../../../cartItem/cart-item"

export class AppliedCouponDTO {
    serialNumber!:string
    userGmail!:string
    cartItems:CartItem[]=[]
}
