import { Payment } from "@entities/Payment";
import { Visit } from "@entities/Visit";
import { CREATED, FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponsePaymentPriceDto } from "./dtos";
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
        const visit = await Visit.findOne({ id: Number(vid) });
        const result = await Payment.findOne({ visit: visit });

        if (!result) return false;
        return true;
    }

    async findOne(vid: number): Promise<Mutation<ResponsePaymentPriceDto>> {
        const result = await Payment.findOne({
            where: {
                visit: {
                    id: vid,
                },
            },
            relations: ["visit"],
        });

        console.log(vid);
        console.log(result);
        const dto: ResponsePaymentPriceDto = new ResponsePaymentPriceDto(result);

        return {
            status: OK,
            success: true,
            message: "수납 받을 금액 받아오기 성공",
            result: dto,
        };
    }
}

export { Payment };
