import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseVisitInfoDto, ResponseVisitListDto, ResponseVisitRecordDto } from "./dtos";
import { IVisitService } from "./interface/IVisitService";
import { VisitRepository } from "./visitRepository";

@Service()
export class VisitService implements IVisitService {
    constructor(private visitRepository: VisitRepository) {}

    async list(): Promise<Mutation<ResponseVisitListDto[]>> {
        try {
            const visits = await this.visitRepository.findall();
            const result: ResponseVisitListDto[] = [];

            for (const visit of visits) {
                const responseVisitorListDto: ResponseVisitListDto = new ResponseVisitListDto(visit);

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
        return await this.visitRepository.findBypid(pid);
    }

    async record(pid: string): Promise<Mutation<ResponseVisitRecordDto[]>> {
        try {
            const visits = await this.visitRepository.findallBypid(pid);
            console.log(visits);
            const result: ResponseVisitRecordDto[] = [];

            for (const visit of visits) {
                const responseVisitRecordDto: ResponseVisitRecordDto = new ResponseVisitRecordDto(visit);

                result.push(responseVisitRecordDto);
            }

            return {
                status: OK,
                success: true,
                message: "방문 내역 반환 성공",
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
}
