import { Conflict } from "@errors/errorGenerator";
import { Service } from "typedi";
import { RequestPatientRegisterDto } from "./dtos/request/RequestPatientRegisterDto";
import { IPatientService } from "./interface/IPatientService";
import { Patient, PatientRepository } from "./patientRepository";

@Service()
export class PatientService implements IPatientService {
    constructor(private patientRepository: PatientRepository) {}

    async register(req: RequestPatientRegisterDto): Promise<Mutation<void>> {
        try {
            const exRRN = await this.patientRepository.findByrrn(req.rrn);

            if (exRRN) {
                throw new Conflict("이미 같은 주민번호가 등록되어 있습니다");
            }

            const patient = new Patient();

            patient.name = req.name;
            patient.gender = req.gender;
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
}
