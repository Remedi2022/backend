import express, { Router } from "express";

import { MDController } from "components/MD/mdController";

class MDRouter {
    public router: Router = express.Router();
    private mdController: MDController;

    constructor() {
        this.router;
        this.mdController = new MDController();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/list", this.mdController.list);
        this.router.get("/search", this.mdController.search);
        this.router.get("/:id", this.mdController.findById);
    }

    post() {
        this.router.post("/register", this.mdController.register);
    }
}

export default new MDRouter().router;
