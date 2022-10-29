import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseVisitInfoDto, ResponseVisitListDto } from "./dtos";
import { VisitService } from "./visitService";

export class VisitConstroller {
    private visitService: VisitService;
    constructor() {
        this.visitService = Container.get(VisitService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponseVisitListDto[]> = await this.visitService.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    info = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: string = req.query.pid as string;

            const result: Mutation<ResponseVisitInfoDto> = await this.visitService.info(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    // record = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const pid: string = req.query.pid as string;
    //     }
    // }
}
