import { PaymentController } from "components/Payment/paymentController";
import express, { Router } from "express";

class PaymentRouter {
    public router: Router = express.Router();
    private paymentController: PaymentController;

    constructor() {
        this.router;
        this.paymentController = new PaymentController();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/price", this.paymentController.price);
    }

    post() {
        this.router.post("/register", this.paymentController.register);
    }
}

export default new PaymentRouter().router;
