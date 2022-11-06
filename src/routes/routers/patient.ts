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
        // this.router.get("/search", this.patientController.search);
        this.router.get("/reception", this.patientController.reception);
    }

    post() {
        this.router.post("/register", this.patientController.register);
        this.router.post("/search", this.patientController.find);
    }
}

export default new PatientRouter().router;
