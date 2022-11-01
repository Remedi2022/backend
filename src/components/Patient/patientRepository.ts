import { Patient } from "@entities/Patient";
import { Conflict } from "@errors/errorGenerator";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";
import { Like } from "typeorm";
import { ResponsePatientDto } from "./dtos/response/ResponsePatientDto";
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

    async findByRRN(rrn: string): Promise<boolean> {
        const result = await Patient.findOne({ rrn });

        if (!result) return false;
        return true;
    }

    async findByName(patient_name: string): Promise<Patient[]> {
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

    async findById(id: number): Promise<Patient> {
        const result: Patient | undefined = await Patient.findOne({ id });

        if (!result) {
            throw Error("존재하지 않는 환자 입니다.");
        }

        return result;
    }

    async findByVid(vid: number): Promise<Patient> {
        const result = await Patient.findOne({
            where: {
                visit: {
                    id: vid,
                },
            },
        });

        if (!result) {
            throw new Conflict("진료가 완료되지 않았습니다.");
        }

        return result;
    }
}

export { Patient };
