import { BadRequest } from "@errors/errorGenerator";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { RequestMDRegisterDto, ResponseMDListDto } from "./dtos";
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

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestMDRegisterDto: RequestMDRegisterDto = new RequestMDRegisterDto(req.body);

            const errors: ValidationError[] = await validate(requestMDRegisterDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<void> = await this.mdService.register(requestMDRegisterDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
