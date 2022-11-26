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
import { RequestChartRegisterDto, ResponseChartListDto } from "./dtos";
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
            const { examination, diagnosis, prescription, consultation_fee, prescribed_md } = dto;

            let individual_copayment = 0;
            let uninsured_payment = 0;
            let nhis_copayment = 0;

            const visit: Visit = await this.visitRepository.findById(dto.vid);
            const patient: Patient = await this.patientRepository.findById(dto.pid);
            const doctor: Doctor = await this.doctorRepository.findById(dto.did);

            const chart: Chart = Chart.createChart(
                visit,
                patient,
                doctor,
                examination,
                diagnosis,
                prescription,
                consultation_fee,
            );

            const chartSaveResult = await this.chartRepository.save(chart).then(result => {
                return result.result;
            });

            if (!chartSaveResult) throw Error("진료 정보 생성에 실패했습니다.");

            for (const pmd of prescribed_md) {
                const { md_id, md_amount_per_unit, md_count_per_day, md_administration_day } = pmd;

                const md: MD = await this.mdRepository.findById(md_id);

                const pMD: PrescribedMD = PrescribedMD.createPMD(
                    md_amount_per_unit,
                    md_count_per_day,
                    md_administration_day,
                    md,
                    chart,
                );

                uninsured_payment += md.price * pMD.mdAmountPerUnit * pMD.mdCountPerDay * pMD.mdAdministrationDay;

                await PrescribedMD.save(pMD);
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

            const payment: Payment = Payment.createPayment(
                individual_copayment,
                uninsured_payment,
                nhis_copayment,
                visit,
                chart,
            );

            visit.setStatus(3);

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
