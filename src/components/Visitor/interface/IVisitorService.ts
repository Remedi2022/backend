import { ResponseVisitorInfoDto, ResponseVisitorListDto } from "../dtos";

export interface IVisitorService {
    list(): Promise<Mutation<ResponseVisitorListDto[]>>;
    info(pid: string): Promise<Mutation<ResponseVisitorInfoDto>>;
}
