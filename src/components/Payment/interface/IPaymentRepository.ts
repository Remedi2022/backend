import { Payment } from "../paymentRepository";

export interface IPaymentRepository {
    save(patient: Payment): Promise<Mutation<void>>;
    findByvid(rrn: string): Promise<boolean>;
}
