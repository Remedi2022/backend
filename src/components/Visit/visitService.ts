import { Conflict } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";
import { PatientRepository } from "components/Patient/patientRepository";
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
            const visits = await (
                await this.visitRepository.findAll()
            ).sort((a, b) => {
                return a.date.updatedAt.getTime() - b.date.updatedAt.getTime();
            });

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

    async vital(vid: number): Promise<Mutation<ResponseVisitInfoDto>> {
        return await this.visitRepository.findByPid(vid);
    }

    async record(pid: string): Promise<Mutation<ResponseVisitRecordDto[]>> {
        try {
            const visits = await this.visitRepository.findallBypid(pid);
            const result: ResponseVisitRecordDto[] = [];

            visits.forEach(visit => {
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
            const {
                revisit,
                benefit_type,
                purpose,
                purpose_detail,
                temperature,
                weight,
                height,
                blood_pressure_high,
                blood_pressure_low,
                blood_sugar,
            } = dto;

            const patient = await this.patientRepository.findById(dto.pid);
            const doctor = await this.doctorRepository.findById(dto.did);

            if (!patient) {
                throw new Conflict("해당 patient_id 와 맞는 환자 정보가 없습니다.");
            } else if (!doctor) {
                throw new Conflict("해당 docter_id 와 맞는 의사 정보가 없습니다.");
            }

            const visit: Visit = Visit.createVisit(
                revisit,
                benefit_type,
                purpose,
                purpose_detail,
                temperature,
                weight,
                height,
                blood_pressure_high,
                blood_pressure_low,
                blood_sugar,
                patient,
                doctor,
            );

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

            visit.setStatus(2);

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
                visit.setStatus(5);

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
