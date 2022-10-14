import { ResponseMDListDto } from "../dtos";

export interface IMDService {
    list(): Promise<Mutation<ResponseMDListDto[]>>;
}
