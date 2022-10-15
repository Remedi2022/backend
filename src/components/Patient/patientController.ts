import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ResponsePatientListDto } from "./dtos/response/ResponsePatientListDto";
import { PatientService } from "./patientService";

export class PatientController {
    private patientService: PatientService;
    constructor() {
        this.patientService = Container.get(PatientService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponsePatientListDto[]> = await this.patientService.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {};
}
