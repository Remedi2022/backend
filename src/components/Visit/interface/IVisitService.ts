import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";

export interface IVisitService {
    list(): Promise<Mutation<ResponseVisitListDto[]>>;
    info(pid: string): Promise<Mutation<ResponseVisitInfoDto>>;
}
