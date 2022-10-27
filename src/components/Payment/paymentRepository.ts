import { Payment } from "@entities/Payment";
import { Visitor } from "@entities/Visitor";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";
import { IPaymentRepository } from "./interface/IPaymentRepository";

@Service()
export class PaymentRepository implements IPaymentRepository {
    async save(payment: Payment): Promise<Mutation<void>> {
        try {
            const result = await Payment.save(payment);

            return {
                status: CREATED,
                success: true,
                message: "수납 결제 성공",
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async findByvid(vid: string): Promise<boolean> {
        const visitor = await Visitor.findOne({ id: Number(vid) });
        const result = await Payment.findOne({ visitor: visitor });

        console.log(result);

        if (!result) return false;
        return true;
    }
}

export { Payment };
