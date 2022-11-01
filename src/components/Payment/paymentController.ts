import { BadRequest } from "@errors/errorGenerator";
// import { producer } from "app";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { RequestPaymentRegisterDto, ResponsePaymentPriceDto } from "./dtos";
import { PaymentService } from "./paymentService";

export class PaymentController {
    private paymentService: PaymentService;
    constructor() {
        this.paymentService = Container.get(PaymentService);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestPaymentRegisterDto: RequestPaymentRegisterDto = new RequestPaymentRegisterDto(req.body);

            const errors: ValidationError[] = await validate(requestPaymentRegisterDto);

            if (errors.length > 0) {
                const errorMessage: any = errors[0].constraints;
                const message: any = Object.values(errorMessage)[0];
                throw new BadRequest(message);
            }

            const result: Mutation<void> = await this.paymentService.register(requestPaymentRegisterDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    price = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const visit_id = req.query.vid;

            const result: Mutation<ResponsePaymentPriceDto> = await this.paymentService.price(Number(visit_id));

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
