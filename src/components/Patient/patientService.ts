import { Conflict } from "@errors/errorGenerator";
import { OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseSearchPatientsDto } from "./dtos";
import { RequestPatientRegisterDto } from "./dtos/request/RequestPatientRegisterDto";
import { ResponsePatientDto } from "./dtos/response/ResponsePatientDto";
import { ResponseReceptionDto } from "./dtos/response/ResponseReceptionDto";
import { IPatientService } from "./interface/IPatientService";
import { Patient, PatientRepository } from "./patientRepository";

@Service()
export class PatientService implements IPatientService {
    constructor(private patientRepository: PatientRepository) {}

    async list(): Promise<Mutation<ResponseSearchPatientsDto[]>> {
        try {
            const patients = await this.patientRepository.list();
            const result: ResponseSearchPatientsDto[] = [];

            for (const patient of patients) {
                const responseSearchPatient: ResponseSearchPatientsDto = new ResponseSearchPatientsDto(patient);

                result.push(responseSearchPatient);
            }

            return {
                status: OK,
                success: true,
                message: "환자 목록 조회 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: 400,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async register(dto: RequestPatientRegisterDto): Promise<Mutation<void>> {
        try {
            const { name, rrn, phone, first_responder, address } = dto;

            let gender;

            const exRRN = await this.patientRepository.findByRRN(rrn);

            if (exRRN) {
                throw new Conflict("이미 같은 주민번호가 등록되어 있습니다");
            }

            if (parseInt(rrn.substr(7, 1)) % 2 == 1) {
                gender = "M";
            } else {
                gender = "F";
            }

            const patient = Patient.createPatient(name, gender, rrn, phone, first_responder, address);

            return this.patientRepository.save(patient);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async search(patient_name: string): Promise<Mutation<ResponseSearchPatientsDto[]>> {
        try {
            const patients = await this.patientRepository.findByName(patient_name);
            const result: ResponseSearchPatientsDto[] = [];

            for (const patient of patients) {
                const responseSearchPatient: ResponseSearchPatientsDto = new ResponseSearchPatientsDto(patient);

                result.push(responseSearchPatient);
            }

            return {
                status: OK,
                success: true,
                message: "환자 검색 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: 400,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async find(patient_id: number): Promise<Mutation<ResponsePatientDto>> {
        try {
            const patient = await this.patientRepository.findById(patient_id);
            const result: ResponsePatientDto = new ResponsePatientDto(patient);

            return {
                status: OK,
                success: true,
                message: "환자 검색 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: 400,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async reception(patient_id: number): Promise<Mutation<ResponseReceptionDto>> {
        try {
            const patient = await this.patientRepository.findById(patient_id);
            const result: ResponseReceptionDto = new ResponseReceptionDto(patient);

            return {
                status: OK,
                success: true,
                message: "환자 검색 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: 400,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
