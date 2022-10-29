import { Chart } from "../chartRepository";

export interface IChartRepository {
    findall(pid: string): Promise<Chart[]>;
}
