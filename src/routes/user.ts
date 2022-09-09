import express, { NextFunction, Request, Response, Router } from "express";

import { UserController } from "components/User/userController";
import { isLoggedIn, isNotLoggedIn } from "./middlewares/index";

class AuthRouter {
    public router: Router = express.Router();
    private userController: UserController;

    constructor() {
        this.router;
        this.userController = new UserController();
        this.get();
        this.post();
    }

    get() {}

    post() {}
}

export default new AuthRouter().router;
