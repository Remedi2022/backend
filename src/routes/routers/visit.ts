import { VisitConstroller } from "components/Visit/visitController";
import express, { Router } from "express";

class VisitRouter {
    public router: Router = express.Router();
    private visitController: VisitConstroller;

    constructor() {
        this.router;
        this.visitController = new VisitConstroller();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/list", this.visitController.list);
        this.router.get("/vital", this.visitController.vital);
        this.router.get("/record", this.visitController.record);
        // this.router.get("/reception", this.visitController.reception);
    }

    post() {
        this.router.post("/register", this.visitController.register);
    }
}

export default new VisitRouter().router;
