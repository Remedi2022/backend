import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponseHL7Dto } from "./dtos/ResponseHL7Dto";
import { HL7Service } from "./hl7Service";

export class HL7Controller {
    private hl7Service: HL7Service;
    constructor() {
        this.hl7Service = Container.get(HL7Service);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponseHL7Dto[]> = await this.hl7Service.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
