import { BadRequest } from "@errors/errorGenerator";
import { AuthRepository, Doctor } from "components/Auth/authRepository";
import { MD, MDRepository } from "components/MD/mdRepository";
import { Patient, PatientRepository } from "components/Patient/patientRepository";
import { Payment, PaymentRepository } from "components/Payment/paymentRepository";
import { PrescribedMD } from "components/PrescribedMD/prescribedMDRepository";
import { Visit, VisitRepository } from "components/Visit/visitRepository";
import { CREATED, FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { Chart, ChartRepository } from "./chartRepository";
import { ResponseChartListDto } from "./dtos";
import { RequestChartRegisterDto } from "./dtos/request/RequestChartRegisterDto";
import { IChartService } from "./interface/IChartService";

@Service()
export class ChartService implements IChartService {
    constructor(
        private chartRepository: ChartRepository,
        private visitRepository: VisitRepository,
        private patientRepository: PatientRepository,
        private doctorRepository: AuthRepository,
        private mdRepository: MDRepository,
        private paymentRepository: PaymentRepository,
    ) {}

    async list(vid: string): Promise<Mutation<ResponseChartListDto>> {
        try {
            const chart: Chart = await this.chartRepository.findByVid(Number(vid));

            const result: ResponseChartListDto = new ResponseChartListDto(chart);

            return {
                status: OK,
                success: true,
                message: "chart 리스트 반환 성공",
                result,
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

    async register(dto: RequestChartRegisterDto): Promise<Mutation<void>> {
        try {
            let individual_copayment = 0;
            let uninsured_payment = 0;
            let nhis_copayment = 0;

            const visit: Visit = await this.visitRepository.findById(dto.vid);
            const patient: Patient = await this.patientRepository.findById(dto.pid);
            const doctor: Doctor = await this.doctorRepository.findById(dto.did);

            visit.status = 3;

            const chart: Chart = new Chart();
            chart.visit = visit;
            chart.patient = patient;
            chart.doctor = doctor;
            chart.examination = dto.examination;
            chart.diagnosis = dto.diagnosis;
            chart.prescription = dto.prescription;
            chart.consultationFee = dto.consultation_fee; // 16970, 12130

            const chartSaveResult = await this.chartRepository.save(chart);

            if (!chartSaveResult.result) throw Error("진료 정보 생성에 실패했습니다.");

            for (const pmd of dto.prescribed_md) {
                const md: MD = await this.mdRepository.findById(pmd.md_id);

                const pMD: PrescribedMD = new PrescribedMD();
                pMD.md = md;
                pMD.mdAmountPerUnit = pmd.md_amount_per_unit;
                pMD.mdCountPerDay = pmd.md_count_per_day;
                pMD.mdAdministrationDay = pmd.md_administration_day;
                pMD.chart = chartSaveResult.result;

                uninsured_payment += md.price * pMD.mdAmountPerUnit * pMD.mdCountPerDay * pMD.mdAdministrationDay;

                const result = await PrescribedMD.save(pMD);
            }

            if (visit.revisit == 0) {
                individual_copayment = 5091;
                nhis_copayment = 11879;
            } else if (visit.revisit == 1) {
                individual_copayment = 3639;
                nhis_copayment = 8491;
            } else {
                throw new BadRequest("초진/재진 여부를 정확하게 기입해주세요");
            }

            const payment: Payment = new Payment();

            payment.individualCopayment = individual_copayment;
            payment.uninsuredPayment = uninsured_payment;
            payment.nhisCopayment = nhis_copayment;
            payment.visit = visit;
            payment.chart = chart;

            await this.visitRepository.save(visit);
            await this.paymentRepository.save(payment);

            return {
                status: CREATED,
                success: true,
                message: "진료 등록 완료",
            };
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
