import { RequestPatientRegiserDto } from "../dtos/request/RequestPatientRegisterDto";
import { ResponsePatientListDto } from "../dtos/response/ResponsePatientListDto";

export interface IPatientService {
    register(requestPatientRegisterDto: RequestPatientRegiserDto): Promise<Mutation<void>>;
    list(): Promise<Mutation<ResponsePatientListDto[]>>;
}
