export class ResponseVisitorListDto {
    readonly pid: string;
    readonly name: string;
    readonly status: number;
    readonly visit_time: Date;
    readonly checkup_time: Date;

    constructor(body: any) {
        this.pid = String(body.patient.id).padStart(6, "0");
        this.name = body.patient.name;
        this.status = body.status;
        this.visit_time = body.date.createdAt;
        this.checkup_time = body.date.updatedAt;
    }
}
