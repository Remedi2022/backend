import { Doctor } from "@entities/Doctor";
import { Patient } from "@entities/Patient";
import { Visit } from "@entities/Visit";
import { Conflict } from "@errors/errorGenerator";
import { Chart, ChartRepository } from "components/Chart/chartRepository";
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
            const psgTotalBill = pmdList.reduce((acc, cur, idx) => {
                return (acc += cur.mdAmountPerUnit * cur.mdCountPerDay * cur.mdAdministrationDay * cur.md.price);
            }, 0);

            const rrnHypenLess = patient.rrn.split("-")[0] + patient.rrn.split("-")[1];

            let HL7 = "";
            console.log(chart.date);

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

            const MSH = `MSH|^~.&|||||${createdTime}||EHC^E01^EHC_E01|1817457|P|2.6||||||||||||||`;
            const IVC = `IVC|15|||OR|NORM|FN|${createdTime}|${ivcTotalBill}||REMEDI^12345|NHLS||||||||${doctor.name}||||||AMB||||||`;
            const PSS = `PSS|1||1|${pssTotalBill}|진료비 세부산정내역|`;
            const PSG = `PSG|1||1|Y|${psgTotalBill}|진찰료|`;
            let PSL: Array<string> = [];
            const PSLExamination = `PSL|1||1|||P|AA||${
                chart.consultationFee === 1 ? "초진진찰료" : "재진진찰료"
            }|${chartCreatedTime}|||${chart.consultationFee === 1 ? 16970 : 12130}|1|${
                chart.consultationFee === 1 ? 16970 : 12130
            }|${
                chart.consultationFee === 1 ? Math.floor(16970 * 0.3) : Math.floor(12130 * 0.3)
            }|||||Y|||||||1||||||||||||||||||||1|`;
            const PSLMD = pmdList.map((pmd, idx) => {
                return `PSL|${pmd.md.id}||${idx + 2}|||P|${pmd.md.kcd}||${pmd.md.itemName}|${chartCreatedTime}|||${
                    pmd.md.price
                }|${pmd.mdCountPerDay}|${
                    pmd.md.price * pmd.mdAmountPerUnit * pmd.mdCountPerDay * pmd.mdAdministrationDay
                }|${
                    pmd.md.price * pmd.mdAmountPerUnit * pmd.mdCountPerDay * pmd.mdAdministrationDay
                }|||||Y|||||||2||||||||||||||||||||${pmd.mdAdministrationDay}|`;
            });
            PSL.push(PSLExamination);
            PSL = PSL.concat(PSLMD);
            const PID = `PID|||${patient.id}^^^^PI~${rrnHypenLess}^^^SS||${patient.name}|`;
            const IN1 = `IN1|1|NHI|NHIS||||||||||||||||||||||||||||||||||${payment.individualCopayment}|||||||||||||||||||`;
            const IN2 = `IN2|||||||||||||||||||||||||||||${payment.nhisCopayment}||||||||||||||||||||||||`;

            HL7 = HL7 + MSH + IVC + PSS + PSG;
            for (const psl of PSL) {
                HL7 += psl;
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

            visit.status = 4;

            payment.paidAmount = dto.paid_amount;
            payment.paymentType = dto.payment_type;

            this.visitRepository.save(visit);

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
