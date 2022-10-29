import { Visit } from "@entities/Visit";
import { NO_CONTENT, OK } from "http-status-codes";
import { Service } from "typedi";
import { LessThan } from "typeorm";
import { ResponseVisitInfoDto } from "./dtos/response/ResponseVisitInfoDto";
import { IVisitRepository } from "./interface/IVisitRepository";

@Service()
export class VisitRepository implements IVisitRepository {
    async findall(): Promise<Visit[]> {
        const result: Visit[] = await Visit.find({
            where: {
                status: LessThan(4),
            },
            relations: ["patient"],
        });

        return result;
    }

    async findBypid(pid: string): Promise<Mutation<ResponseVisitInfoDto>> {
        const result = await Visit.findOne({
            where: { id: pid },
            relations: ["patient"],
        });

        const response: ResponseVisitInfoDto = new ResponseVisitInfoDto(result);

        if (result) {
            return {
                status: OK,
                success: true,
                message: "환자 정보 반환 성공",
                result: response,
            };
        } else {
            return {
                status: NO_CONTENT,
                success: false,
                message: "환자 정보 없음",
            };
        }
    }
}

export { Visit };
