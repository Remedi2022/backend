import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseVisitorInfoDto, ResponseVisitorListDto } from "./dtos";
import { IVisitorService } from "./interface/IVisitorService";
import { VisitorRepository } from "./visitorRepository";

@Service()
export class VisitorService implements IVisitorService {
    constructor(private visitorRepository: VisitorRepository) {}

    async list(): Promise<Mutation<ResponseVisitorListDto[]>> {
        try {
            const visitors = await this.visitorRepository.findall();
            const result: ResponseVisitorListDto[] = [];

            for (const visitor of visitors) {
                const responseVisitorListDto: ResponseVisitorListDto = new ResponseVisitorListDto(visitor);

                result.push(responseVisitorListDto);
            }

            return {
                status: OK,
                success: true,
                message: "환자 리스트 반환 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async info(pid: string): Promise<Mutation<ResponseVisitorInfoDto>> {
        return await this.visitorRepository.findInfo(pid);
    }
}
