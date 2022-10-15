import { Conflict } from "@errors/errorGenerator";
import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { RequestPatientRegiserDto } from "./dtos/request/RequestPatientRegisterDto";
import { ResponsePatientListDto } from "./dtos/response/ResponsePatientListDto";
import { IPatientService } from "./interface/IPatientService";
import { Patient, PatientRepository } from "./patientRepository";

@Service()
export class PatientService implements IPatientService {
    constructor(private patientRepository: PatientRepository) {}

    async register(req: RequestPatientRegiserDto): Promise<Mutation<void>> {
        try {
            const exRRN = await this.patientRepository.findByrrn(req.rrn);

            if (exRRN) {
                throw new Conflict("이미 같은 주민번호가 등록되어 있습니다");
            }

            const patient = new Patient();

            patient.name = req.name;
            patient.rrn = req.rrn;
            patient.phone = req.phone;
            patient.firstResponder = req.first_responder;
            patient.address = req.address;

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

    async list(): Promise<Mutation<ResponsePatientListDto[]>> {
        try {
            const patient_list = await this.patientRepository.findall();
            const result: ResponsePatientListDto[] = [];

            for (const patient of patient_list) {
                const responsePatientListDto: ResponsePatientListDto = new ResponsePatientListDto(patient);

                result.push(responsePatientListDto);
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
}
