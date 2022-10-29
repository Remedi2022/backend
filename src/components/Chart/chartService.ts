import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ChartRepository } from "./chartRepository";
import { ResponseChartListDto } from "./dtos";
import { IChartService } from "./interface/IChartService";

@Service()
export class ChartService implements IChartService {
    constructor(private chartRepository: ChartRepository) {}

    async list(pid: string): Promise<Mutation<ResponseChartListDto[]>> {
        try {
            const charts = await this.chartRepository.findall(pid);
            const result: ResponseChartListDto[] = [];

            for (const chart of charts) {
                const responseChartListDto: ResponseChartListDto = new ResponseChartListDto(chart);

                result.push(responseChartListDto);
            }

            return {
                status: OK,
                success: true,
                message: "chart 리스트 반환 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
