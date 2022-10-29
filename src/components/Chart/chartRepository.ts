import { Chart } from "@entities/Chart";
import { Service } from "typedi";
import { IChartRepository } from "./interface/IChartRepository";

@Service()
export class ChartRepository implements IChartRepository {
    async findall(pid: string): Promise<Chart[]> {
        const result: Chart[] = await Chart.find({
            order: { id: "DESC" },
            where: { id: pid },
            relations: ["visit", "patient", "doctor"],
        });

        return result;
    }
}

export { Chart };
