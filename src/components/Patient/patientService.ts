import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponsePatientListDto } from "./dtos/response/ResponsePatientListDto";
import { IPatientService } from "./interface/IPatientService";
import { PatientRepository } from "./patientRepository";

@Service()
export class PatientService implements IPatientService {
    constructor(private patientRepository: PatientRepository) {}

    async register(): Promise<Mutation<void>> {
        throw new Error("Method not implemented.");
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
