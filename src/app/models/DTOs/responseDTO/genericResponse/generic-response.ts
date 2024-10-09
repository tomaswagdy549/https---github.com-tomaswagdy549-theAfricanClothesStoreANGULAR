import { BaseResponse } from "../baseResponse/base-response";

export class GenericResponse<T> extends BaseResponse{
    entity!:T
}
