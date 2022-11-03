import { ResponseChartListDto } from "../dtos";
import { RequestChartRegisterDto } from "../dtos/request/RequestChartRegisterDto";

export interface IChartService {
    list(pid: string): Promise<Mutation<ResponseChartListDto[]>>;
    register(dto: RequestChartRegisterDto): Promise<Mutation<void>>;
}
