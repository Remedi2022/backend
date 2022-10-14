import express, { Router } from "express";

import { MDController } from "components/MD/mdController";

class MDRouter {
    public router: Router = express.Router();
    private mdController: MDController;

    constructor() {
        this.router;
        this.mdController = new MDController();
        this.get();
    }

    get() {
        this.router.get("/list", this.mdController.list);
    }
}

export default new MDRouter().router;
