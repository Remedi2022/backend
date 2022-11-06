import { BadRequest } from "@errors/errorGenerator";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseVisitInfoDto, ResponseVisitListDto } from "./dtos";
import { RequestVisitRegisterDto } from "./dtos/request/RequestVisitRegisterDto";
import { ResponseVisitRecordDto } from "./dtos/response/ResponseVisitRecordDto";
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

    vital = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: string = req.query.pid as string;

            const result: Mutation<ResponseVisitInfoDto> = await this.visitService.vital(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    record = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: string = req.query.pid as string;

            const result: Mutation<ResponseVisitRecordDto[]> = await this.visitService.record(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestVisitRegisterDto: RequestVisitRegisterDto = new RequestVisitRegisterDto(req.body);

            const errors: ValidationError[] = await validate(requestVisitRegisterDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<void> = await this.visitService.register(requestVisitRegisterDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    status = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vid: number = parseInt(req.body.visit_id as string);

            const result: Mutation<void> = await this.visitService.status(vid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
