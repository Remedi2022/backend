export class ResponseMDListDto {
    readonly id: number;
    readonly name: string;
    readonly volume: number;
    readonly unit: string;
    readonly price: number;
    readonly company: string;
    readonly kcd: string;

    constructor(body: any) {
        this.id = body.id;
        this.name = body.itemName;
        this.volume = body.volume;
        this.unit = body.unit;
        this.price = body.price;
        this.company = body.company;
        this.kcd = body.kcd;
    }
}
