import { ResponseMDListDto } from "../dtos";
import { MD } from "../mdRepository";

export interface IMDService {
    list(): Promise<Mutation<ResponseMDListDto[]>>;
    findById(id: number): Promise<Mutation<MD>>;
}
