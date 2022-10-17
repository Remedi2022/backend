import { Visitor } from "@entities/Visitor";
import { NO_CONTENT, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseVisitorInfoDto } from "./dtos/response/ResponseVisitorInfoDto";
import { IVisitorRepository } from "./interface/IVisitorRepository";

@Service()
export class VisitorRepository implements IVisitorRepository {
    async findall(): Promise<Visitor[]> {
        const result: Visitor[] = await Visitor.find({
            relations: ["patient"],
        });

        return result;
    }

    async findInfo(pid: string): Promise<Mutation<ResponseVisitorInfoDto>> {
        const result = await Visitor.findOne({
            where: { id: pid },
            relations: ["patient"],
        });

        const response: ResponseVisitorInfoDto = new ResponseVisitorInfoDto(result);

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

export { Visitor };
