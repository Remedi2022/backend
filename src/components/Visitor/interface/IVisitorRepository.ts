import { ResponseVisitorInfoDto } from "../dtos";
import { Visitor } from "../visitorRepository";

export interface IVisitorRepository {
    findall(): Promise<Visitor[]>;
    findInfo(pid: string): Promise<Mutation<ResponseVisitorInfoDto>>;
}
