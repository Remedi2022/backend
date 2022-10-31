import { PatientController } from "components/Patient/patientController";
import express, { Router } from "express";

class PatientRouter {
    public router: Router = express.Router();
    private patientController: PatientController;

    constructor() {
        this.router;
        this.patientController = new PatientController();
        this.post();
    }

    post() {
        this.router.post("/register", this.patientController.register);
        this.router.get("/search", this.patientController.search);
        this.router.post("/", this.patientController.find);
    }
}

export default new PatientRouter().router;
