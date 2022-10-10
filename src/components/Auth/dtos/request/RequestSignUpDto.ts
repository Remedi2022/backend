import { Length, Max } from "class-validator";

export class RequestSignUpDto {
    readonly email: string;

    readonly password: string;

    constructor(body: any) {
        this.email = body.email;
        this.password = body.password;
    }
}
