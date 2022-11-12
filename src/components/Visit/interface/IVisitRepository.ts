import { ResponseVisitInfoDto, ResponseVisitListDto } from "../dtos";
import { Visit } from "../visitRepository";

export interface IVisitRepository {
    findAll(): Promise<Visit[]>;
    findByPid(id: number): Promise<Mutation<ResponseVisitInfoDto>>;
}
