import { Chart } from "../chartRepository";

export interface IChartRepository {
    findall(): Promise<Chart[]>;
}
