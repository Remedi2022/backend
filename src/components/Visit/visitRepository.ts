import { Patient } from "@entities/Patient";
import { Visit } from "@entities/Visit";
import { BadRequest, Conflict } from "@errors/errorGenerator";
import { CREATED, FORBIDDEN, NO_CONTENT, OK } from "http-status-codes";
import { Service } from "typedi";
import { LessThan } from "typeorm";
import { ResponseVisitRecordDto } from "./dtos";
import { ResponseVisitInfoDto } from "./dtos/response/ResponseVisitInfoDto";
import { IVisitRepository } from "./interface/IVisitRepository";

@Service()
export class VisitRepository implements IVisitRepository {
    async save(visit: Visit): Promise<Mutation<void>> {
        try {
            const result = await Visit.save(visit);

            return {
                status: CREATED,
                success: true,
                message: "방문 환자 등록 성공",
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

    async findall(): Promise<Visit[]> {
        const result: Visit[] = await Visit.find({
            where: {
                status: LessThan(5),
            },
            relations: ["patient"],
        });

        return result;
    }

    async findBypid(id: string): Promise<Mutation<ResponseVisitInfoDto>> {
        const result = await Visit.findOne({
            where: { patient: { id } },
            relations: ["patient"],
        });

        if (result) {
            const response: ResponseVisitInfoDto = new ResponseVisitInfoDto(result);

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

    async findallBypid(pid: string): Promise<Visit[]> {
        return await Visit.find({
            where: {
                patient: {
                    id: pid,
                },
            },
            relations: ["doctor"],
        });
    }

    async findById(id: number): Promise<Visit> {
        const result = await Visit.findOne({
            where: { id },
            relations: ["doctor", "patient"],
        });

        if (!result) {
            throw new Conflict("방문 기록이 없습니다.");
        }

        return result;
    }
}

export { Visit };
