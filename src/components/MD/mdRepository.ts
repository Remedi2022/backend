import { MD } from "@entities/MD";
import { Service } from "typedi";
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

    async listByVid(vid: number): Promise<MD[] | undefined> {
        const result: MD[] | undefined = await MD.find({
            relations: ["visit"],
        });

        if (!result) {
            throw Error("처방 받은 제품이 없습니다.");
        }

        return result;
    }

    async findOneById(id: number): Promise<MD> {
        const result: MD | undefined = await MD.findOne({
            id,
        });

        if (!result) {
            throw new Error("등록되지 않은 제품입니다.");
        }

        return result;
    }
}

export { MD };
