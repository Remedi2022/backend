import { Payment } from "@entities/Payment";
import { Visit } from "@entities/Visit";
import { Conflict } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";
import { ChartRepository } from "components/Chart/chartRepository";
import { MDRepository } from "components/MD/mdRepository";
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

            const authRepository = new AuthRepository();
            const mdRepository = new MDRepository();
            const chartRepository = new ChartRepository();
            const paymentRepository = new PaymentRepository();
            const DoctorInfo = await authRepository.findOneByemail("1");
            const MDInfo = await mdRepository.findOneById(1);
            const ChartInfo = await chartRepository.findall("2");
            const PaymentInfo = await paymentRepository.findByvid("1");

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
