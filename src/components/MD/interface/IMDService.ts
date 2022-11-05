import { RequestMDRegisterDto, ResponseMDListDto } from "../dtos";
import { MD } from "../mdRepository";

export interface IMDService {
    list(): Promise<Mutation<ResponseMDListDto[]>>;
    findById(id: number): Promise<Mutation<MD>>;
    search(patient_name: string): Promise<Mutation<ResponseMDListDto[]>>;
    register(dto: RequestMDRegisterDto): Promise<Mutation<void>>;
}
