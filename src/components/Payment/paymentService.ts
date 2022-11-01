import { Payment } from "@entities/Payment";
import { Visit } from "@entities/Visit";
import { Conflict } from "@errors/errorGenerator";
import { ChartRepository, PrescribedMD } from "components/Chart/chartRepository";
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

            const visit = await Visit.findOne({ where: { id: req.vid }, relations: ["doctor", "patient"] });
            if (!visit) {
                throw new Error("방문 정보가 없습니다.");
            }

            const chartRepository = new ChartRepository();

            const chart = await chartRepository.findOneByVid(visit.id);
            const pmdList = await PrescribedMD.find({
                where: {
                    chart: chart.id,
                },
                relations: ["chart", "md"],
            });

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
                }|${pmd.md.price * pmd.mdCountPerDay}|${req.individual_copayment}|||||Y|||||||2||||||||||||||||||||${
                    pmd.mdAdministrationDay
                }|`;
            });
            const PID = `PID|||${patient.id}^^^^PI~${patient.rrn}^^^SS||${patient.name}|`;
            const IN1 = `IN1|1|NHI|NHIS||||||||||||||||||||||||||||||||||${req.individual_copayment}|||||||||||||||||||`;
            const IN2 = `IN2|||||||||||||||||||||||||||||${req.nhis_copayment}||||||||||||||||||||||||`;

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
