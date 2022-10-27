import express, { Router } from "express";

import { ChartController } from "components/Chart/chartController";

class ChartRouter {
    public router: Router = express.Router();
    private chartController: ChartController;

    constructor() {
        this.router;
        this.chartController = new ChartController();
        this.get();
    }

    get() {
        this.router.get("/list", this.chartController.list);
    }
}

export default new ChartRouter().router;
