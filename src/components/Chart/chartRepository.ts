import { Chart } from "@entities/Chart";
import { Service } from "typedi";
import { IChartRepository } from "./interface/IChartRepository";

@Service()
export class ChartRepository implements IChartRepository {
    async findall(): Promise<Chart[]> {
        const result: Chart[] = await Chart.find({
            order: {
                id: "DESC",
            },
        });

        return result;
    }
}

export { Chart };
