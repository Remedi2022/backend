import { RequestPatientRegisterDto } from "../dtos/request/RequestPatientRegisterDto";

export interface IPatientService {
    register(requestPatientRegisterDto: RequestPatientRegisterDto): Promise<Mutation<void>>;
}
