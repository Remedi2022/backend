export class RequestPatientRegisterDto {
    readonly name: string;
    readonly gender: string;
    readonly rrn: string;
    readonly phone: string;
    readonly first_responder: string;
    readonly address: string;

    constructor(body: any) {
        this.name = body.name;
        this.gender = body.gender;
        this.rrn = body.rrn;
        this.phone = body.phone;
        this.first_responder = body.first_responder;
        this.address = body.address;
    }
}