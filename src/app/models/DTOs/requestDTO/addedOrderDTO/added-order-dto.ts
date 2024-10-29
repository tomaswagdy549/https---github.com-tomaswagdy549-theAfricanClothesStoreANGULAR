import { ClientForm } from "../../../clientForm/client-form"
import { Product } from "../../../product/product"
import { AddedOrderDetails } from "./addedOrderDTO/added-order-details"

export class AddedOrderDTO {
    gmail:string=''
    addedOrderDetailsDTO:AddedOrderDetails[]=[]
    clientForm!:ClientForm
    products:Product[]|null=null
}
