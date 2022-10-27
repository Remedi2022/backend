import { ResponseChartListDto } from "../dtos";

export interface IChartService {
    list(): Promise<Mutation<ResponseChartListDto[]>>;
}
