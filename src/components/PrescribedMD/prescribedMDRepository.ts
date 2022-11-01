import { Service } from "typedi";

import { PrescribedMD } from "@entities/PrescribedMD";
import { IPrescribedMDRepository } from "./interface/IPrescribedMDRepository";

@Service()
export class PrescribedMDRepository implements IPrescribedMDRepository {
    async findByChartId(chart_id: number): Promise<PrescribedMD[]> {
        console.log(chart_id);
        const result = await PrescribedMD.find({
            where: {
                chart: { id: chart_id },
            },
            relations: ["chart", "md"],
            order: { id: "DESC" },
        });

        return result;
    }
}

export { PrescribedMD };
