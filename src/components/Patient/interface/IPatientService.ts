import { ResponsePatientListDto } from "../dtos/response/ResponsePatientListDto";

export interface IPatientService {
    register(): Promise<Mutation<void>>;
    list(): Promise<Mutation<ResponsePatientListDto[]>>;
}
