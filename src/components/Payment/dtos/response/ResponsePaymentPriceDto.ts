export class ResponsePaymentPriceDto {
    readonly individual_copayment: number;
    readonly uninsured_payment: number;
    readonly nhis_copayment: number;

    constructor(body: any) {
        this.individual_copayment = body.individualCopayment;
        this.uninsured_payment = body.uninsuredPayment;
        this.nhis_copayment = body.nhisCopayment;
    }
}
