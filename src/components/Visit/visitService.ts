import { Conflict } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";
import { Patient, PatientRepository } from "components/Patient/patientRepository";
import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseVisitInfoDto, ResponseVisitListDto, ResponseVisitRecordDto } from "./dtos";
import { RequestVisitRegisterDto } from "./dtos/request/RequestVisitRegisterDto";
import { IVisitService } from "./interface/IVisitService";
import { Visit, VisitRepository } from "./visitRepository";

@Service()
export class VisitService implements IVisitService {
    constructor(
        private visitRepository: VisitRepository,
        private patientRepository: PatientRepository,
        private doctorRepository: AuthRepository,
    ) {}

    async list(): Promise<Mutation<ResponseVisitListDto[]>> {
        try {
            const visits = await this.visitRepository.findAll();
            const result: ResponseVisitListDto[] = [];

            for (const visit of visits) {
                const responseVisitorListDto: ResponseVisitListDto = new ResponseVisitListDto(visit);

                result.push(responseVisitorListDto);
            }

            return {
                status: OK,
                success: true,
                message: "환자 리스트 반환 성공",
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

    async vital(pid: string): Promise<Mutation<ResponseVisitInfoDto>> {
        return await this.visitRepository.findBypid(pid);
    }

    async record(pid: string): Promise<Mutation<ResponseVisitRecordDto[]>> {
        try {
            const visits = await this.visitRepository.findallBypid(pid);
            const result: ResponseVisitRecordDto[] = [];

            console.log(visits);
            visits.forEach(visit => {
                console.log(visit);
                const responseVisitRecordDto: ResponseVisitRecordDto = new ResponseVisitRecordDto(visit);

                result.push(responseVisitRecordDto);
            });

            return {
                status: OK,
                success: true,
                message: "방문 내역 반환 성공",
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

    async register(dto: RequestVisitRegisterDto): Promise<Mutation<void>> {
        try {
            const patient = await this.patientRepository.findById(dto.pid);
            const doctor = await this.doctorRepository.findById(dto.did);

            if (!patient) {
                throw new Conflict("해당 patient_id 와 맞는 환자 정보가 없습니다.");
            } else if (!doctor) {
                throw new Conflict("해당 docter_id 와 맞는 의사 정보가 없습니다.");
            }

            const visit: Visit = new Visit();

            visit.patient = patient;
            visit.doctor = doctor;
            visit.status = 1;
            visit.revisit = dto.revisit;
            visit.benefitType = dto.benefit_type;
            visit.purpose = dto.purpose;
            visit.purposeDetail = dto.purpose_detail;
            visit.temperature = dto.temperature;
            visit.weight = dto.weight;
            visit.height = dto.height;
            visit.hBlood = dto.blood_pressure_high;
            visit.lBlood = dto.blood_pressure_low;
            visit.bloodSugar = dto.blood_sugar;

            return this.visitRepository.save(visit);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async status(vid: number): Promise<Mutation<void>> {
        try {
            const visit = await this.visitRepository.findById(vid);

            visit.status = 2;

            return await this.visitRepository.save(visit);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async scheduler() {
        try {
            const visits = await this.visitRepository.findAll();

            for (const visit of visits) {
                visit.status = 5;

                await this.visitRepository.save(visit);
            }
        } catch (err: any) {
            throw {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
