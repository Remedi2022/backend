import { Payment } from "@entities/Payment";
import { Visit } from "@entities/Visit";
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

            const visit = await Visit.findOne({ id: Number(req.vid) });
            if (!visit) {
                throw new Error("방문 정보가 없습니다.");
            }

            const payment = new Payment();

            payment.visit = visit;
            payment.individualCopayment = req.individual_copayment;
            payment.uninsuredPayment = req.uninsured_payment;
            payment.nhisCopayment = req.nhis_copayment;
            payment.paidAmount = req.paid_amount;
            payment.paymentType = req.payment_type;

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
