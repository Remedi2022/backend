import { RequestPaymentRegisterDto } from "../dtos/request/RequestPaymentRegisterDto";

export interface IPaymentService {
    register(requestPaymentRegisterDto: RequestPaymentRegisterDto): Promise<Mutation<void>>;
}
