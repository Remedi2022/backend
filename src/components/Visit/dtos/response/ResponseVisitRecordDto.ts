export class ResponseVisitRecordDto {
    readonly vid: number;
    readonly date: Date;
    readonly doctor: string;

    constructor(body: any) {
        this.vid = body.id;
        this.date = body.date.updatedAt;
        this.doctor = body.doctor.id;
    }
}
