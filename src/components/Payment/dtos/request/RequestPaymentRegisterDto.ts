export class RequestPaymentRegisterDto {
    readonly paid_amount: number;
    readonly payment_type: string;
    readonly vid: number;

    constructor(body: any) {
        this.paid_amount = body.paid_amount;
        this.payment_type = body.payment_type;
        this.vid = Number(body.visit_id);
    }
}
