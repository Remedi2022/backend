import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";
import { Visit } from "../visitRepository";

export interface IVisitRepository {
    findall(): Promise<Visit[]>;
    findBypid(pid: string): Promise<Mutation<ResponseVisitInfoDto>>;
}
