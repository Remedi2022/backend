export class RequestMDRegisterDto {
    readonly itme_name: string;
    readonly volume: number;
    readonly unit: string;
    readonly price: number;
    readonly company: string;
    readonly kcd: string;

    constructor(body: any) {
        this.itme_name = body.name;
        this.volume = body.volume;
        this.unit = body.unit;
        this.price = body.price;
        this.company = body.company;
        this.kcd = body.kcd;
    }
}
