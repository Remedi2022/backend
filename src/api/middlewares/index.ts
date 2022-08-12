import { NextFunction, Request, Response } from "express";

import { Forbidden } from "@errors/errorGenerator";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            throw new Forbidden("로그인이 필요한 상태입니다 .");
        }
    } catch (err) {
        next(err);
    }
};

const isNotLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.isAuthenticated()) {
            next();
        } else {
            throw new Forbidden("이미 로그인 중입니다.");
        }
    } catch (err: any) {
        next(err);
    }
};

export { isLoggedIn, isNotLoggedIn };
