import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseMDListDto } from "./dtos";
import { MD } from "./mdRepository";
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

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<MD> = await this.mdService.findById(parseInt(req.params.id));

            if (!result.status) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const md_name: string = req.query.name as string;

            const result: Mutation<ResponseMDListDto[]> = await this.mdService.search(md_name);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            console.log(1);
            next(err);
        }
    };
}
