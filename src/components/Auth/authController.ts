import { NextFunction, Request, Response } from "express";
import passport from "passport";
import Container from "typedi";

import { RequestSignUpDto, ResponseSignUpDto } from "./dtos";
import { AuthService } from "./authService";
import { passportCb } from "config/passport/callback";

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
            const userDto: RequestSignUpDto = req.body;
            const result: Mutation<ResponseSignUpDto> = await this.authService.signup(userDto);

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
