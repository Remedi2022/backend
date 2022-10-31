import express, { Router } from "express";

import { ChartController } from "components/Chart/chartController";

class ChartRouter {
    public router: Router = express.Router();
    private chartController: ChartController;

    constructor() {
        this.router;
        this.chartController = new ChartController();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/list", this.chartController.list);
    }

    post() {
        this.router.post("/register", this.chartController.register);
    }
}

export default new ChartRouter().router;
