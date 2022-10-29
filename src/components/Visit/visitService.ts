import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseVisitInfoDto, ResponseVisitListDto } from "./dtos";
import { IVisitService } from "./interface/IVisitService";
import { VisitRepository } from "./visitRepository";

@Service()
export class VisitService implements IVisitService {
    constructor(private visitorRepository: VisitRepository) {}

    async list(): Promise<Mutation<ResponseVisitListDto[]>> {
        try {
            const visitors = await this.visitorRepository.findall();
            const result: ResponseVisitListDto[] = [];

            for (const visitor of visitors) {
                const responseVisitorListDto: ResponseVisitListDto = new ResponseVisitListDto(visitor);

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

    async info(pid: string): Promise<Mutation<ResponseVisitInfoDto>> {
        return await this.visitorRepository.findBypid(pid);
    }
}
