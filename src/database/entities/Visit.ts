import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Payment } from "./Payment";

@Entity("visit")
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    status: number;

    @Column()
    revisit: number; // 초진, 재진료 여부

    @Column()
    benefitType: string; // 항상 건강보험

    @Column()
    purpose: string; // 방문목적

    @Column({ nullable: true })
    purposeDetail: string; // 세부목적

    @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
    temperature: number;

    @Column({ type: "decimal", precision: 4, scale: 1, nullable: true })
    weight: number;

    @Column({ type: "decimal", precision: 4, scale: 1, nullable: true })
    height: number;

    @Column({ nullable: true })
    hBlood: number;

    @Column({ nullable: true })
    lBlood: number;

    @Column({ nullable: true })
    bloodSugar: number;

    @OneToOne(() => Chart)
    @JoinColumn()
    chart: Chart;

    @OneToOne(() => Payment)
    payment: Payment;

    @ManyToOne(type => Patient, patient => patient.visit, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.visit, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;

    public static createVisit = (
        revisit: number,
        benefit_type: string,
        purpose: string,
        purpose_detail: string,
        temperature: number,
        weight: number,
        height: number,
        blood_pressure_high: number,
        blood_pressure_low: number,
        blood_sugar: number,
        patient: Patient,
        doctor: Doctor,
    ): Visit => {
        const visit: Visit = new Visit();

        visit.status = 1;
        visit.revisit = revisit;
        visit.benefitType = benefit_type;
        visit.purpose = purpose;
        visit.purposeDetail = purpose_detail;
        visit.temperature = temperature;
        visit.weight = weight;
        visit.height = height;
        visit.hBlood = blood_pressure_high;
        visit.lBlood = blood_pressure_low;
        visit.bloodSugar = blood_sugar;
        visit.patient = patient;
        visit.doctor = doctor;

        return visit;
    };

    public setStatus = (status: number) => {
        this.status = status;
    };
}
