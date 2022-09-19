import { NextFunction, Request, Response } from "express";
import passport from "passport";
import Container from "typedi";

import { RequestSignUpDto, ResponseSignUpDto } from "./dtos";
import { AuthService } from "./authService";
import { passportCb } from "config/passport/callback";
import { validate, ValidationError } from "class-validator";
import { BadRequest } from "@errors/errorGenerator";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = Container.get(AuthService);
    }

    signin = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", passportCb(req, res, next))(req, res, next);
    };

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestSignUpDto: RequestSignUpDto = new RequestSignUpDto(req.body);
            const errors: ValidationError[] = await validate(requestSignUpDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<ResponseSignUpDto> = await this.authService.signup(requestSignUpDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    signout = async (req: any, res: Response, next: NextFunction) => {
        const result: Mutation<undefined> = await this.authService.signout(req);

        if (!result.success) next(result);
        else res.status(result.status).send(result);
    };
}
