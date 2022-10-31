import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";
import { RequestVisitRegisterDto } from "../dtos/request/RequestVisitRegisterDto";
import { ResponseVisitRecordDto } from "../dtos/response/ResponseVisitRecordDto";

export interface IVisitService {
    list(): Promise<Mutation<ResponseVisitListDto[]>>;
    vital(pid: string): Promise<Mutation<ResponseVisitInfoDto>>;
    record(pid: string): Promise<Mutation<ResponseVisitRecordDto[]>>;
    register(dto: RequestVisitRegisterDto): Promise<Mutation<void>>;
}
