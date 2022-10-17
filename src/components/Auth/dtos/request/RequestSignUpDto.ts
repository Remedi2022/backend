export class RequestSignUpDto {
    readonly hospital: string;
    readonly license: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;

    constructor(body: any) {
        this.hospital = body.hospital;
        this.license = body.license;
        this.email = body.email;
        this.password = body.password;
        this.name = body.name;
    }
}
