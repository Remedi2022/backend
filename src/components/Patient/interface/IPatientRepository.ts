import { Patient, Visitor } from "../patientRepository";

export interface IPatientRepository {
    findall(): Promise<Visitor[]>;
}
