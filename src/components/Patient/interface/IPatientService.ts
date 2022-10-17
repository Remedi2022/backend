import { RequestPatientRegiserDto } from "../dtos/request/RequestPatientRegisterDto";

export interface IPatientService {
    register(requestPatientRegisterDto: RequestPatientRegiserDto): Promise<Mutation<void>>;
}
