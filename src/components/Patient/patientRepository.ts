import { Patient } from "@entities/Patient";
import { Visitor } from "@entities/Visitor";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";
import { IPatientRepository } from "./interface/IPatientRepository";

@Service()
export class PatientRepository implements IPatientRepository {
    async findall(): Promise<Visitor[]> {
        const result: Visitor[] = await Visitor.find({
            relations: ["patient"],
        });

        return result;
    }

    async findByrrn(rrn: string): Promise<boolean> {
        const result = await Patient.findOne({ rrn });

        console.log(result);

        if (!result) return false;
        return true;
    }

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
}

export { Patient, Visitor };
