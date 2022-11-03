import { Chart } from "../chartRepository";

export interface IChartRepository {
    save(chart: Chart): Promise<Mutation<Chart>>;
    findall(pid: string): Promise<Chart[]>;
    findByVid(vid: number): Promise<Chart>;
}
