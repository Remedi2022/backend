import { Payment } from "@entities/Payment";
import { Conflict } from "@errors/errorGenerator";
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

    async findByVid(vid: number): Promise<Payment> {
        const result = await Payment.findOne({
            where: {
                visit: { id: vid },
            },
        });

        if (!result) {
            throw new Conflict("아직 진료를 보지 않았습니다.");
        }

        return result;
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
