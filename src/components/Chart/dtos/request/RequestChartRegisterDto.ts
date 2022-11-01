import { PrescribedMD } from "@entities/PrescribedMD";

export class RequestChartRegisterDto {
    readonly vid: number;
    readonly pid: number;
    readonly did: string;
    readonly examination: string;
    readonly diagnosis: string;
    readonly prescription: string;
    readonly consultation_fee: number;
    readonly prescribed_md: Array<{
        md_id: number;
        md_amount_per_unit: number;
        md_count_per_day: number;
        md_administration_day: number;
    }>;

    constructor(body: any) {
        this.vid = Number(body.visit_id);
        this.pid = body.patient_id;
        this.did = body.doctor_id;
        this.examination = body.examination;
        this.diagnosis = body.diagnosis;
        this.prescription = body.prescription;
        this.consultation_fee = body.consultation_fee;
        this.prescribed_md = body.prescribed_md;
    }
}
