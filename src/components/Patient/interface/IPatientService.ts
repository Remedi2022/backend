import { ResponseSearchPatientsDto } from "../dtos";
import { RequestPatientRegisterDto } from "../dtos/request/RequestPatientRegisterDto";

export interface IPatientService {
    register(requestPatientRegisterDto: RequestPatientRegisterDto): Promise<Mutation<void>>;
    search(patient_name: string): Promise<Mutation<ResponseSearchPatientsDto[]>>;
}
