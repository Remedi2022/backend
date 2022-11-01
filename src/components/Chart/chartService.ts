import { PrescribedMD } from "@entities/PrescribedMD";
import { AuthRepository, Doctor } from "components/Auth/authRepository";
import { MD, MDRepository } from "components/MD/mdRepository";
import { Patient, PatientRepository } from "components/Patient/patientRepository";
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
    ) {}

    async list(pid: string): Promise<Mutation<ResponseChartListDto[]>> {
        try {
            const charts = await this.chartRepository.findall(pid);
            const result: ResponseChartListDto[] = [];

            for (const chart of charts) {
                const responseChartListDto: ResponseChartListDto = new ResponseChartListDto(chart);

                result.push(responseChartListDto);
            }

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
            const visit: Visit = await this.visitRepository.findById(dto.vid);
            const patient: Patient = await this.patientRepository.findById(dto.pid);
            const doctor: Doctor = await this.doctorRepository.findById(dto.did);

            const chart: Chart = new Chart();
            chart.visit = visit;
            chart.patient = patient;
            chart.doctor = doctor;
            chart.examination = dto.examination;
            chart.diagnosis = dto.diagnosis;
            chart.prescription = dto.prescription;
            chart.consultationFee = dto.consultation_fee;

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

                const result = await PrescribedMD.save(pMD);
            }

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
