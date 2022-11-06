import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";
import { Visit } from "../visitRepository";

export interface IVisitRepository {
    findAll(): Promise<Visit[]>;
    findBypid(pid: string): Promise<Mutation<ResponseVisitInfoDto>>;
}
