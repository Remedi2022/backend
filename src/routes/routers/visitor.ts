import { VisitorContoller } from "components/Visitor/visitorController";
import express, { Router } from "express";

class VisitorRouter {
    public router: Router = express.Router();
    private visitorController: VisitorContoller;

    constructor() {
        this.router;
        this.visitorController = new VisitorContoller();
        this.get();
    }

    get() {
        this.router.get("/list", this.visitorController.list);
        this.router.get("/info", this.visitorController.info);
    }
}

export default new VisitorRouter().router;
