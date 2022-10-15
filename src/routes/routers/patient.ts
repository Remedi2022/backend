import { PatientController } from "components/Patient/patientController";
import express, { Router } from "express";

class PatientRouter {
    public router: Router = express.Router();
    private patientController: PatientController;

    constructor() {
        this.router;
        this.patientController = new PatientController();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/list", this.patientController.list);
    }

    post() {
        this.router.post("/register", this.patientController.register);
    }
}

export default new PatientRouter().router;
