import { BadRequest } from "@errors/errorGenerator";
import { validate, ValidationError } from "class-validator";
import { RequestVisitRegisterDto } from "components/Visit/dtos/request/RequestVisitRegisterDto";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ChartService } from "./chartService";
import { ResponseChartListDto } from "./dtos";
import { RequestChartRegisterDto } from "./dtos/request/RequestChartRegisterDto";

export class ChartController {
    private chartService: ChartService;
    constructor() {
        this.chartService = Container.get(ChartService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vid: string = req.query.vid as string;

            const result: Mutation<ResponseChartListDto> = await this.chartService.list(vid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestChartRegisterDto: RequestChartRegisterDto = new RequestChartRegisterDto(req.body);

            const errors: ValidationError[] = await validate(requestChartRegisterDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<void> = await this.chartService.register(requestChartRegisterDto);

            if (!result.success) throw result;
            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
