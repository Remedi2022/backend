import { Doctor } from "@entities/Doctor";
import { Patient } from "@entities/Patient";
import { Visit } from "@entities/Visit";
import { Conflict } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";
import { Chart, ChartRepository } from "components/Chart/chartRepository";
import { PatientRepository } from "components/Patient/patientRepository";
import { PrescribedMD, PrescribedMDRepository } from "components/PrescribedMD/prescribedMDRepository";
import { VisitRepository } from "components/Visit/visitRepository";
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
        private doctorRepository: AuthRepository,
        private patientRepository: PatientRepository,
    ) {}

    async register(dto: RequestPaymentRegisterDto): Promise<Mutation<void>> {
        try {
            const visit: Visit = await this.visitRepository.findById(dto.vid);
            const payment: Payment = await this.paymentRepository.findByVid(dto.vid);
            const chart: Chart = await this.chartRepository.findByVid(dto.vid);
            const pmdList: PrescribedMD[] = await this.prescribedMDRepository.findByChartId(chart.id);
            const doctor: Doctor = visit.doctor;
            const patient: Patient = await visit.patient;

            if (payment.paymentType) {
                throw new Conflict("이미 결제 완료된 수납 건 입니다.");
            }

            const DT: Date = new Date();
            const YYYY: number = DT.getFullYear();
            const MM: number = DT.getMonth() + 1;
            const DD: number = DT.getDate();
            const HH: number = DT.getHours();
            const mm: number = DT.getMinutes();
            const SS: number = DT.getSeconds();

            const createdTime = `${YYYY}${MM}${DD}${HH}${mm}${SS}`;

            const ivcTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.md.price);
            }, 0);
            const pssTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.md.price);
            }, 0);
            const psgTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.md.price);
            }, 0);

            let HL7 = "";

            const MSH = `MSH|^~.&|||||${createdTime}||EHC^E01^EHC_E01|1817457|P|2.6||||||||||||||`;
            const IVC = `IVC|15|||OR|NORM|FN|${createdTime}|${ivcTotalBill}||REMEDI^12345|NHLS||||||||${doctor.name}||||||AMB||||||`;
            const PSS = `PSS|1||1|${pssTotalBill}|진료비 세부산정내역|`;
            const PSG = `PSG|1||1|Y|${psgTotalBill}|진찰료|`;
            // let PSL = "";
            const PSL = pmdList.map(pmd => {
                return `PSL|1||1|||P|${pmd.md.kcd}||${pmd.md.itemName}|${chart.date}|||${pmd.md.price}|${
                    pmd.mdCountPerDay
                }|${pmd.md.price * pmd.mdCountPerDay}|${payment.individualCopayment}|||||Y|||||||2||||||||||||||||||||${
                    pmd.mdAdministrationDay
                }|`;
            });
            const PID = `PID|||${patient.id}^^^^PI~${patient.rrn}^^^SS||${patient.name}|`;
            const IN1 = `IN1|1|NHI|NHIS||||||||||||||||||||||||||||||||||${payment.individualCopayment}|||||||||||||||||||`;
            const IN2 = `IN2|||||||||||||||||||||||||||||${payment.nhisCopayment}||||||||||||||||||||||||`;

            HL7 = HL7 + MSH + IVC + PSS + PSG;
            for (const psl of PSL) {
                HL7 += HL7 + psl;
            }
            HL7 = HL7 + PID + IN1 + IN2;
            console.log(HL7);

            // const kafkaMessage = HL7;
            // await producer.send({
            //     topic: "REMEDI-kafka",
            //     messages: [
            //         {
            //             value: kafkaMessage,
            //         },
            //     ],
            // });

            payment.paidAmount = dto.paid_amount;
            payment.paymentType = dto.payment_type;

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
