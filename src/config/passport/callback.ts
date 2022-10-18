import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";

export const passportCb = (req: Request, res: Response, next: NextFunction) => {
    return (err: any, user: any) => {
        if (err) {
            return next(err);
        }
        req.login(user, loginError => {
            if (loginError) {
                return next(loginError);
            }
            res.status(OK).send({
                status: OK,
                success: true,
                message: `${user.name}님 로그인 성공`,
                result: user,
            });
        });
    };
};
