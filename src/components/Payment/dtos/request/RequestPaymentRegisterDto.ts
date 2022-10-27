export class RequestPaymentRegisterDto {
    readonly individual_copayment: number;
    readonly uninsured_payment: number;
    readonly nhis_copayment: number;
    readonly paid_amount: number;
    readonly payment_type: string;
    readonly vid: string;

    constructor(body: any) {
        this.individual_copayment = body.individual_copayment;
        this.uninsured_payment = body.uninsured_payment;
        this.nhis_copayment = body.nhis_copayment;
        this.paid_amount = body.paid_amount;
        this.payment_type = body.payment_type;
        this.vid = body.visitor_id;
    }
}
