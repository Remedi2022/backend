import { ResponseChartListDto } from "../dtos";

export interface IChartService {
    list(pid: string): Promise<Mutation<ResponseChartListDto[]>>;
}
