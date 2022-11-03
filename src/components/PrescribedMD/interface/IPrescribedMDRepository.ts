import { PrescribedMD } from "../prescribedMDRepository";

export interface IPrescribedMDRepository {
    findByChartId(chart_id: number): Promise<PrescribedMD[]>;
}
