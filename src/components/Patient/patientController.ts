import { BadRequest } from "@errors/errorGenerator";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { RequestPatientRegisterDto, ResponseSearchPatientsDto } from "./dtos";
import { ResponsePatientDto } from "./dtos/response/ResponsePatientDto";
import { ResponseReceptionDto } from "./dtos/response/ResponseReceptionDto";
import { PatientService } from "./patientService";

export class PatientController {
    private patientService: PatientService;
    constructor() {
        this.patientService = Container.get(PatientService);
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Mutation<ResponsePatientDto[]> = await this.patientService.list();

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestPatientRegisterDto: RequestPatientRegisterDto = new RequestPatientRegisterDto(req.body);

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

    search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const patient_name: string = req.query.name as string;

            const result: Mutation<ResponseSearchPatientsDto[]> = await this.patientService.search(patient_name);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const patient_id: number = req.body.pid;

            const result: Mutation<ResponseSearchPatientsDto> = await this.patientService.find(patient_id);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    reception = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pid: number = parseInt(req.query.pid as string);

            const result: Mutation<ResponseReceptionDto> = await this.patientService.reception(pid);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
