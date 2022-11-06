import { MD } from "@entities/MD";
import { Conflict } from "@errors/errorGenerator";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";
import { Like } from "typeorm";
import { IMDRepository } from "./interface/IMDRepository";

@Service()
export class MDRepository implements IMDRepository {
    async findall(): Promise<MD[]> {
        const result: MD[] = await MD.find({
            order: {
                id: "DESC",
            },
        });

        return result;
    }

    async listByVid(vid: number): Promise<MD[]> {
        const result: MD[] = await MD.find({
            relations: ["visit"],
        });

        if (!result) {
            throw new Conflict("처방 받은 제품이 없습니다.");
        }

        return result;
    }

    async findById(id: number): Promise<MD> {
        const result: MD | undefined = await MD.findOne({
            id,
        });

        if (!result) {
            throw new Conflict("등록되지 않은 제품입니다.");
        }

        return result;
    }

    async findByName(md_name: string): Promise<MD[]> {
        const result: MD[] = await MD.find({
            where: {
                itemName: Like(`%${md_name}%`),
            },
            order: {
                id: "DESC",
            },
        });

        return result;
    }

    async save(md: MD): Promise<Mutation<void>> {
        try {
            const result = await MD.save(md);

            return {
                status: CREATED,
                success: true,
                message: "MD 등록 성공",
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

export { MD };
