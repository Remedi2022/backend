import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseVisitorInfoDto } from "./dtos/response/ResponseVisitorInfoDto";
import { ResponseVisitorListDto } from "./dtos/response/ResponseVisitorListDto";
import { VisitorService } from "./visitorService";

export class VisitorContoller {
    private visitorService: VisitorService;
    constructor() {
        this.visitorService = Container.get(VisitorService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponseVisitorListDto[]> = await this.visitorService.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    info = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: string = req.query.pid as string;

            const result: Mutation<ResponseVisitorInfoDto> = await this.visitorService.info(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
