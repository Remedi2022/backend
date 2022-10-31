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

            const visit = await Visit.findOne({ where: { id: 1 }, relations: ["doctor", "patient"] });
            if (!visit) {
                throw new Error("방문 정보가 없습니다.");
            }

            const mdRepository = new MDRepository();
            const chartRepository = new ChartRepository();

            // const MDInfo = await mdRepository.listByVid(visit.id);
            const chart = await chartRepository.findOneByVid(visit.id);
            // const PatientInfo = await patientRepository.findById(visit.patient.id);

            console.log("VisitInfo : ", visit.id);
            console.log("ChartInfo : ", chart);

            const doctor = visit.doctor;
            const patient = visit.patient;

            const DT = new Date();
            const YYYY = DT.getFullYear();
            const MM = DT.getMonth() + 1;
            const DD = DT.getDate();
            const HH = DT.getHours();
            const mm = DT.getMinutes();
            const SS = DT.getSeconds();

            const createdTime = `${YYYY}${MM}${DD}${HH}${mm}${SS}`;

            const HL7 = "";

            const MSH = `MSH|^~.&|||||${createdTime}||EHC^E01^EHC_E01|1817457|P|2.6||||||||||||||`;
            const IVC = `IVC|15|||OR|NORM|FN|${createdTime}| ||REMEDI^12345|NHLS||||||||${doctor.name}||||||AMB||||||`;
            const PSS = `PSS|1||1| |진료비 세부산정내역|`;
            const PSG = `PSG|1||1|Y| |진찰료|`;
            const PSL = `PSL|1||1|||P|md.kcd||md.item_name|${chart.date}|||md.price|chart.prescribedMD|?|req.individual_copayment|||||Y|||||||2||||||||||||||||||||chart.prescribedMD|`;
            const PID = `PID|||${patient.id}^^^^PI~${patient.rrn}^^^SS||${patient.name}|`;
            const IN1 = `IN1|`;
            const IN2 = `IN2|`;

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
