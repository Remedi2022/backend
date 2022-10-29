import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ChartService } from "./chartService";
import { ResponseChartListDto } from "./dtos";

export class ChartController {
    private chartService: ChartService;
    constructor() {
        this.chartService = Container.get(ChartService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: string = req.query.pid as string;

            const result: Mutation<ResponseChartListDto[]> = await this.chartService.list(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
