import { Payment } from "@entities/Payment";
import { Visit } from "@entities/Visit";
import { Conflict } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";
import { ChartRepository } from "components/Chart/chartRepository";
import { MDRepository } from "components/MD/mdRepository";
import { Service } from "typedi";
import { RequestPaymentRegisterDto, ResponsePaymentPriceDto } from "./dtos";
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

            const authRepository = new AuthRepository();
            const mdRepository = new MDRepository();
            const chartRepository = new ChartRepository();

            const DoctorInfo = await authRepository.findOneByVid(visit.id);
            const MDInfo = await mdRepository.listByVid(visit.id);
            const ChartInfo = await chartRepository.findOneByVid(visit.id);

            console.log("DoctorInfo : ", DoctorInfo);
            console.log("MDInfo : ", MDInfo);
            console.log("ChartInfo : ", ChartInfo);

            const HL7 = "";

            const MSH = "MSH|";
            const IVC = "IVC|";
            const PSS = "PSS|";
            const PSG = "PSG|";
            const PSL = "PSL|";
            const PID = "PID|";
            const IN1 = "IN1|";
            const IN2 = "IN2|";

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

    async price(vid: number): Promise<Mutation<ResponsePaymentPriceDto>> {
        return await this.paymentRepository.findOne(vid);
    }
}
