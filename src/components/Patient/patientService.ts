import { Conflict } from "@errors/errorGenerator";
import { OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseSearchPatientsDto } from "./dtos";
import { RequestPatientRegisterDto } from "./dtos/request/RequestPatientRegisterDto";
import { ResponsePatientDto } from "./dtos/response/ResponsePatientDto";
import { IPatientService } from "./interface/IPatientService";
import { Patient, PatientRepository } from "./patientRepository";

@Service()
export class PatientService implements IPatientService {
    constructor(private patientRepository: PatientRepository) {}

    async register(req: RequestPatientRegisterDto): Promise<Mutation<void>> {
        try {
            const exRRN = await this.patientRepository.findByRRN(req.rrn);

            if (exRRN) {
                throw new Conflict("이미 같은 주민번호가 등록되어 있습니다");
            }

            const patient = new Patient();

            patient.name = req.name;
            patient.rrn = req.rrn;
            patient.phone = req.phone;
            patient.firstResponder = req.first_responder;
            patient.address = req.address;

            if (parseInt(req.rrn.substr(8, 8)) % 2 == 1) {
                patient.gender = "M";
            } else {
                patient.gender = "F";
            }

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
}
