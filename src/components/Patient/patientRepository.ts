import { Patient } from "@entities/Patient";
import { Visitor } from "@entities/Visitor";
import { Service } from "typedi";
import { IPatientRepository } from "./interface/IPatientRepository";

@Service()
export class PatientRepository implements IPatientRepository {
    async findall(): Promise<Visitor[]> {
        const result: Visitor[] = await Visitor.find({
            relations: ["patient"],
        });
        console.log(result);
        return result;
    }
}

export { Patient, Visitor };
