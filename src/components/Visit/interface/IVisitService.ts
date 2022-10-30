import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";
import { ResponseVisitRecordDto } from "../dtos/response/ResponseVisitRecordDto";

export interface IVisitService {
    list(): Promise<Mutation<ResponseVisitListDto[]>>;
    info(pid: string): Promise<Mutation<ResponseVisitInfoDto>>;
    record(pid: string): Promise<Mutation<ResponseVisitRecordDto[]>>;
}
