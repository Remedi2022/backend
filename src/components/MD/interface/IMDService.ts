import { ResponseMDListDto } from "../dtos";

export interface IMDService {
    md_list(): Promise<Mutation<ResponseMDListDto[]>>;
}
