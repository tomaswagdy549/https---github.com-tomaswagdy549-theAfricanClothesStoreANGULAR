import { ApplicationUser } from "../applicationUser/application-user";
import { OrderDetail } from "../orderDetails/order-detail";

export class Order {
    applicationUserId!:string
    date!:Date
    applicationUser!:ApplicationUser
    orderDetails!:OrderDetail[]
}
