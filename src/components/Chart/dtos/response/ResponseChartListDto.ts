export class ResponseChartListDto {
    readonly id: number;
    readonly examination: string;
    readonly diagnosis: string;
    readonly prescription: string;
    readonly consultation_fee: number;
    readonly vid: string;
    readonly pid: string;
    readonly did: string;

    constructor(body: any) {
        this.id = body.id;
        this.examination = body.examination;
        this.diagnosis = body.diagnosis;
        this.prescription = body.prescription;
        this.consultation_fee = body.consultation_fee;
        this.vid = body.visit.id;
        this.pid = body.patient.id;
        this.did = body.doctor.id;
    }
}
