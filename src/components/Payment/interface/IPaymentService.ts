import { ResponsePaymentPriceDto } from "../dtos";
import { RequestPaymentRegisterDto } from "../dtos/request/RequestPaymentRegisterDto";

export interface IPaymentService {
    register(requestPaymentRegisterDto: RequestPaymentRegisterDto): Promise<Mutation<void>>;
    price(vid: number): Promise<Mutation<ResponsePaymentPriceDto>>;
}
