import { Patient } from "@entities/Patient";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";
import { Like } from "typeorm";
import { IPatientRepository } from "./interface/IPatientRepository";

@Service()
export class PatientRepository implements IPatientRepository {
    async save(patient: Patient): Promise<Mutation<void>> {
        try {
            const result = await Patient.save(patient);

            return {
                status: CREATED,
                success: true,
                message: "신규 환자 등록 성공",
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

    async findByrrn(rrn: string): Promise<boolean> {
        const result = await Patient.findOne({ rrn });

        console.log(result);

        if (!result) return false;
        return true;
    }

    async findByname(patient_name: string): Promise<Patient[]> {
        console.log(patient_name);
        const result: Patient[] = await Patient.find({
            where: {
                name: Like(`%${patient_name}%`),
            },
            order: {
                id: "DESC",
            },
        });

        return result;
    }
}

export { Patient };
