export class ResponseHL7Dto {
    readonly id: number;
    readonly hl7: string;

    constructor(body: any) {
        this.id = body.id;
        this.hl7 = body.content;
    }
}
