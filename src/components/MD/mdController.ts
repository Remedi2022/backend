import { BadRequest } from "@errors/errorGenerator";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseMDListDto } from "./dtos";
import { MDService } from "./mdService";

export class MDController {
    private mdService: MDService;
    constructor() {
        this.mdService = Container.get(MDService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponseMDListDto[]> = await this.mdService.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
