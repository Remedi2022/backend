import { Conflict } from "@errors/errorGenerator";
import { producer } from "app";
import { Doctor } from "components/Auth/authRepository";
import { Chart, ChartRepository } from "components/Chart/chartRepository";
import { HL7, HL7Repository } from "components/HL7/hl7Repository";
import { Patient } from "components/Patient/patientRepository";
import { PrescribedMD, PrescribedMDRepository } from "components/PrescribedMD/prescribedMDRepository";
import { Visit, VisitRepository } from "components/Visit/visitRepository";
import { Service } from "typedi";
import { RequestPaymentRegisterDto, ResponsePaymentPriceDto } from "./dtos";
import { IPaymentService } from "./interface/IPaymentService";
import { Payment, PaymentRepository } from "./paymentRepository";

@Service()
export class PaymentService implements IPaymentService {
    constructor(
        private paymentRepository: PaymentRepository,
        private visitRepository: VisitRepository,
        private chartRepository: ChartRepository,
        private prescribedMDRepository: PrescribedMDRepository,
        private hl7Repository: HL7Repository,
    ) {}

    async register(dto: RequestPaymentRegisterDto): Promise<Mutation<void>> {
        try {
            const visit: Visit = await this.visitRepository.findById(dto.vid);
            const payment: Payment = await this.paymentRepository.findByVid(dto.vid);
            const chart: Chart = await this.chartRepository.findByVid(dto.vid);
            const pmdList: PrescribedMD[] = await this.prescribedMDRepository.findByChartId(chart.id);
            const doctor: Doctor = visit.doctor;
            const patient: Patient = visit.patient;

            if (payment.paymentType) {
                throw new Conflict("이미 결제 완료된 수납 건 입니다.");
            }

            const consultaionFee = chart.consultationFee === 0 ? 16970 : 12130;

            const doctorLastName = doctor.name.slice(0, 1);
            const doctorFirstName = doctor.name.slice(1, doctor.name.length);
            const doctorName = doctorLastName + "^" + doctorFirstName;

            const patientLastName = patient.name.slice(0, 1);
            const patientFirstName = patient.name.slice(1, doctor.name.length);
            const patientName = patientLastName + "^" + patientFirstName;

            const DT: Date = new Date();
            const YYYY: number = DT.getFullYear();
            const MM: number = DT.getMonth() + 1;
            const DD: number = DT.getDate();
            const HH: number = DT.getHours();
            const mm: number = DT.getMinutes();
            const SS: number = DT.getSeconds();

            const convertString = (unit: number) => {
                return ("0" + unit).slice(-2);
            };

            const createdTime =
                `${YYYY}` +
                convertString(MM) +
                convertString(DD) +
                convertString(HH) +
                convertString(mm) +
                convertString(SS);

            const ivcTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.mdAdministrationDay * cur.md.price);
            }, 0);
            const pssTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.mdAdministrationDay * cur.md.price);
            }, 0);
            const psgMDTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.mdAdministrationDay * cur.md.price);
            }, 0);

            const rrnHypenLess = patient.rrn.split("-")[0] + patient.rrn.split("-")[1];

            let HL7_message = "";

            const chartDT: Date = chart.date.createdAt;
            const chartYYYY: number = chartDT.getFullYear();
            const chartMM: number = chartDT.getMonth() + 1;
            const chartDD: number = chartDT.getDate();
            const chartHH: number = chartDT.getHours();
            const chartmm: number = chartDT.getMinutes();
            const chartSS: number = chartDT.getSeconds();

            const chartCreatedTime =
                `${chartYYYY}` +
                convertString(chartMM) +
                convertString(chartDD) +
                convertString(chartHH) +
                convertString(chartmm) +
                convertString(chartSS);

            const MSH = `MSH|^~.&|||||${createdTime}||EHC^E01^EHC_E01|123|P|2.6||||||||||||||\r`;
            const IVC = `IVC|15|||OR|NORM|FN|${createdTime}|${ivcTotalBill}&KRW||${doctor.hospitalName}^^^^^^^^^${doctor.businessRegistrationNumber}|SJlife||||||||^${doctorName}||||||AMB||||||\r`;
            const PSS = `PSS|1||1|${pssTotalBill}&KRW|보험사제출서류|\r`;

            const PSGExamination = `PSG|1||1|Y|${consultaionFee}&KRW|진찰료|\r`;
            const PID = `PID|||${patient.id}^^^^PI~${rrnHypenLess}^^^^SS||${patientName}|\r`;
            const IN1 = `IN1|1|NHI|NHIS||||||||||||||||||||||||||||||||||${payment.individualCopayment}&KRW|||||||||||||||||||\r`;
            const IN2 = `IN2|||||||||||||||||||||||||||||MMD^^^AT&${payment.nhisCopayment}&KRW||||||||||||||||||||||||\r`;
            const PSLExamination = `PSL|1||1|||P|AA||${
                chart.consultationFee === 0 ? "초진진찰료" : "재진진찰료"
            }|${chartCreatedTime}|||${consultaionFee}&KRW|1|${consultaionFee}&KRW|${Math.floor(
                consultaionFee * 0.3,
            )}&KRW|||||Y|||||||1||||||||||||||||||||1|\r`;

            const PSGMD = `PSG|2||2|Y|${psgMDTotalBill}&KRW|투약료|\r`;
            const PSLMD = pmdList.map((pmd, idx) => {
                return `PSL|${pmd.md.id}||${idx + 1}|||P|${pmd.md.kcd}||${pmd.md.itemName}|${chartCreatedTime}|||${
                    pmd.md.price
                }&KRW|${pmd.mdCountPerDay}|${
                    pmd.md.price * pmd.mdAmountPerUnit * pmd.mdCountPerDay * pmd.mdAdministrationDay
                }&KRW|${
                    pmd.md.price * pmd.mdAmountPerUnit * pmd.mdCountPerDay * pmd.mdAdministrationDay
                }&KRW|||||Y|||||||2||||||||||||||||||||${pmd.mdAdministrationDay}|\r`;
            });

            HL7_message = HL7_message + MSH + IVC + PSS + PSGExamination + PID + IN1 + IN2 + PSLExamination + PSGMD;
            for (const psl of PSLMD) {
                HL7_message += psl;
            }

            console.log(HL7_message);
            visit.status = 4;

            payment.paidAmount = dto.paid_amount;
            payment.paymentType = dto.payment_type;

            const hl7: HL7 = HL7.createHL7(HL7_message);

            this.visitRepository.save(visit);
            this.hl7Repository.save(hl7);

            const result = producer.send({
                topic: "REMEDI-kafka",
                messages: [{ value: HL7_message }],
            });
            console.log("kafka send result : ", result);

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
