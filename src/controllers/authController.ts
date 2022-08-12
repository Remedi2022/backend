import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import passport from "passport";
import Container from "typedi";

import { UserRequestDto } from "@dtos/UserDto";
import { AuthService } from "@services/authService";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = Container.get(AuthService);
    }

    signin = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", async (err, user) => {
            if (err) {
                next({
                    status: err.status,
                    success: false,
                    message: err.message,
                    error: err,
                });
            }
            console.log("로그인 전");
            req.login(user, loginError => {
                if (loginError) {
                    next({
                        status: loginError.status,
                        success: false,
                        message: loginError.message,
                        error: loginError,
                    });
                }
                res.status(OK).send({
                    success: true,
                    message: `${user.email}님 로그인 성공`,
                    result: user,
                });
            });
        })(req, res, next);
    };

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userDto: UserRequestDto = req.body;
            const result = await this.authService.signup(userDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    signout = async (req: any, res: Response, next: NextFunction) => {
        const result = await this.authService.signout(req);

        if (!result.success) next(result);
        else res.status(result.status).send(result);
    };
}
