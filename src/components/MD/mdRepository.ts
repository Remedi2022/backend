import { MD } from "@entities/MD";
import { Service } from "typedi";

@Service()
export class MDRepository {
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
