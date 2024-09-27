import { ApplicationUser } from "../../../applicationUser/application-user";
import { SuccessResponse } from "../successResponse/success-response";

export class UserRegisteredDTO extends SuccessResponse {
    applicationUser!:ApplicationUser
}
