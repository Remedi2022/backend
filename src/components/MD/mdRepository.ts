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
}

export { MD };
