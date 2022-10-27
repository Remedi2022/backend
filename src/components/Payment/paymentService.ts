import { Payment } from "@entities/Payment";
import { Visitor } from "@entities/Visitor";
import { Conflict } from "@errors/errorGenerator";
import { Service } from "typedi";
import { RequestPaymentRegisterDto } from "./dtos";
import { IPaymentService } from "./interface/IPaymentService";
import { PaymentRepository } from "./paymentRepository";

@Service()
export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: PaymentRepository) {}

    async register(req: RequestPaymentRegisterDto): Promise<Mutation<void>> {
        try {
            const exVID = await this.paymentRepository.findByvid(req.vid);

            if (exVID) {
                throw new Conflict("이미 결제 완료된 수납 건 입니다.");
            }

            const visitor = await Visitor.findOne({ id: Number(req.vid) });
            if (!visitor) {
                throw new Error("방문 정보가 없습니다.");
            }

            const payment = new Payment();

            payment.visitor = visitor;
            // payment.gender =
            payment.individual_copayment = req.individual_copayment;
            payment.uninsured_payment = req.uninsured_payment;
            payment.nhis_copayment = req.nhis_copayment;
            payment.paid_amount = req.paid_amount;
            payment.payment_type = req.payment_type;

            return this.paymentRepository.save(payment);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
