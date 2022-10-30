import { VisitConstroller } from "components/Visit/visitController";
import express, { Router } from "express";

class VisitRouter {
    public router: Router = express.Router();
    private visitController: VisitConstroller;

    constructor() {
        this.router;
        this.visitController = new VisitConstroller();
        this.get();
    }

    get() {
        this.router.get("/list", this.visitController.list);
        this.router.get("/info", this.visitController.info);
        this.router.get("/record", this.visitController.record);
    }
}

export default new VisitRouter().router;
