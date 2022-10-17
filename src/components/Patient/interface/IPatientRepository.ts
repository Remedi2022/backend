import { Patient } from "../patientRepository";

export interface IPatientRepository {
    save(patient: Patient): Promise<Mutation<void>>;
    findByrrn(rrn: string): Promise<boolean>;
}
