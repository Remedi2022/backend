import { ResponsePaymentPriceDto } from "../dtos";
import { Payment } from "../paymentRepository";

export interface IPaymentRepository {
    save(payment: Payment): Promise<Mutation<void>>;
    findByVid(vid: number): Promise<Payment>;
    findOne(vid: number): Promise<Mutation<ResponsePaymentPriceDto>>;
}
