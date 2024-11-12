import { ClientForm } from "../../../clientForm/client-form"
import { Coupon } from "../../../coupon/coupon"
import { AddedOrderDetails } from "./addedOrderDTO/added-order-details"

export class AddedOrderDTO {
    applicationUserId:string=''
    addedOrderDetailsDTO:AddedOrderDetails[]=[]
    clientForm!:ClientForm
    coupon!:Coupon|null
}
