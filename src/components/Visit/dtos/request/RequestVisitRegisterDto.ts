export class RequestVisitRegisterDto {
    readonly pid: number;
    readonly did: string;
    readonly benefit_type: string;
    readonly purpose: string;
    readonly purpose_detail: string;
    readonly temperature: number;
    readonly weight: number;
    readonly height: number;
    readonly blood_pressure_high: number;
    readonly blood_pressure_low: number;
    readonly blood_sugar: number;

    constructor(body: any) {
        this.pid = Number(body.patient_id);
        this.did = body.doctor_id;
        this.benefit_type = body.benefit_type;
        this.purpose = body.purpose;
        this.purpose_detail = body.purpose_detail;
        this.temperature = body.temperature;
        this.weight = body.weight;
        this.height = body.height;
        this.blood_pressure_high = body.blood_pressure_high;
        this.blood_pressure_low = body.blood_pressure_low;
        this.blood_sugar = body.blood_sugar;
    }
}
