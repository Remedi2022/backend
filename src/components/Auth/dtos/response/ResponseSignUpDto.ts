export class ResponseSignUpDto {
    readonly id: string;
    readonly hospital_code: string;
    readonly hospital_name: string;
    readonly license: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly business_registration_number: string;

    constructor(body: any) {
        this.id = body.id;
        this.hospital_code = body.hospital_code;
        this.hospital_name = body.hospital_name;
        this.business_registration_number = body.business_registration_number;
        this.license = body.license;
        this.email = body.email;
        this.password = body.password;
        this.name = body.name;
    }
}
