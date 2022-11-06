export class ResponseReceptionDto {
    readonly name: string;
    readonly rrn: string;
    readonly phone: string;
    readonly first_responder: string;
    readonly address: string;

    constructor(body: any) {
        this.name = body.name;
        this.rrn = body.rrn;
        this.phone = body.phone;
        this.first_responder = body.firstResponder;
        this.address = body.address;
    }
}
