import { Patient } from "../patientRepository";

export interface IPatientRepository {
    save(patient: Patient): Promise<Mutation<void>>;
    findByRRN(rrn: string): Promise<boolean>;
    findByName(patient_name: string): Promise<Patient[]>;
    findById(id: number): Promise<Patient>;
    findByVid(vid: number): Promise<Patient>;
}
