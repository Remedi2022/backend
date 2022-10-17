import { BadRequest } from "@errors/errorGenerator";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { RequestPatientRegiserDto } from "./dtos/request/RequestPatientRegisterDto";
import { PatientService } from "./patientService";

export class PatientController {
    private patientService: PatientService;
    constructor() {
        this.patientService = Container.get(PatientService);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestPatientRegisterDto: RequestPatientRegiserDto = new RequestPatientRegiserDto(req.body);

            const errors: ValidationError[] = await validate(requestPatientRegisterDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<void> = await this.patientService.register(requestPatientRegisterDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
