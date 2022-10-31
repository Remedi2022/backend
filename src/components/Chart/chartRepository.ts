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

    async findOneByVid(vid: number): Promise<Chart> {
        const result: Chart | undefined = await Chart.findOne({
            where: {
                visit_id: vid,
            },
            relations: ["Visit"],
        });

        if (!result) {
            throw Error("진료가 완료되지 않았습니다.");
        }

        return result;
    }
}

export { Chart };
