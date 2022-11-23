import { HL7Controller } from "components/HL7/hl7Controller";
import express, { Router } from "express";

class HL7Router {
    public router: Router = express.Router();
    private hl7Controller: HL7Controller;

    constructor() {
        this.router;
        this.hl7Controller = new HL7Controller();
        this.get();
    }

    get() {
        this.router.get("/list", this.hl7Controller.list);
    }
}

export default new HL7Router().router;
