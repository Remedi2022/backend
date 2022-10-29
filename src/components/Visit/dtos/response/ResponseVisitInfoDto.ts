export class ResponseVisitInfoDto {
    readonly name: string;
    readonly gender: string;
    readonly temperature: number;
    readonly weight: number;
    readonly height: number;
    readonly blood_pressure_high: number;
    readonly blood_pressure_low: number;
    readonly blood_sugar: number;

    constructor(body: any) {
        this.name = body.patient.name;
        this.gender = body.patient.gender;
        this.temperature = body.temperature;
        this.weight = body.weight;
        this.height = body.height;
        this.blood_pressure_high = body.hBlood;
        this.blood_pressure_low = body.lBlood;
        this.blood_sugar = body.bloodSugar;
    }
}
