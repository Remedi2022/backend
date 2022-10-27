import { BadRequest } from "@errors/errorGenerator";
// import { producer } from "app";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { RequestPaymentRegisterDto } from "./dtos";
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

            // const kafkaMessage = JSON.stringify(req.body);
            // await producer.send({
            //     topic: "REMEDI-kafka-test",
            //     messages: [
            //         {
            //             value: kafkaMessage,
            //         },
            //     ],
            // });

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };
}
