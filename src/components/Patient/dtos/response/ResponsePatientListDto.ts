export class ResponsePatientListDto {
    readonly pid: string;
    readonly name: string;
    readonly status: number;
    readonly visit_time: Date;
    readonly checkup_time: Date;

    constructor(body: any) {
        this.pid = body.patient.id;
        this.name = body.patient.name;
        this.status = body.status;
        this.visit_time = body.date.createdAt;
        this.checkup_time = body.date.updatedAt;
    }
}
