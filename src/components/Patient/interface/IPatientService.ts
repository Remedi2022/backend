import { ResponseSearchPatientsDto } from "../dtos";
import { RequestPatientRegisterDto } from "../dtos/request/RequestPatientRegisterDto";
import { ResponsePatientDto } from "../dtos/response/ResponsePatientDto";

export interface IPatientService {
    register(requestPatientRegisterDto: RequestPatientRegisterDto): Promise<Mutation<void>>;
    search(patient_name: string): Promise<Mutation<ResponseSearchPatientsDto[]>>;
    find(patient_id: number): Promise<Mutation<ResponsePatientDto>>;
}
