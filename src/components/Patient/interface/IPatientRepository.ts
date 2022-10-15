import { Patient, Visitor } from "../patientRepository";

export interface IPatientRepository {
    findall(): Promise<Visitor[]>;
    findByrrn(rrn: string): Promise<boolean>;
    save(patient: Patient): Promise<Mutation<void>>;
}
