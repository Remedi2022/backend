import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Payment } from "./Payment";
import { PrescribedMD } from "./PrescribedMD";
import { Visit } from "./Visit";

@Entity("chart")
export class Chart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    examination: string;

    @Column()
    diagnosis: string;

    @Column("varchar", { length: 200 })
    prescription: string;

    // 1(초진진찰료)->16970로 저장, 2(재진진찰료)->12130로 저장
    @Column()
    consultationFee: number;

    @OneToOne(() => Visit)
    @JoinColumn()
    visit: Visit;

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;

    @ManyToOne(type => Patient, patient => patient.chart, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.chart, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @OneToMany(type => PrescribedMD, prescribedmd => prescribedmd.chart, { nullable: true, onDelete: "CASCADE" })
    prescribedmd!: PrescribedMD[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;

    public static createChart = (
        visit: Visit,
        patient: Patient,
        doctor: Doctor,
        examination: string,
        diagnosis: string,
        prescription: string,
        consultation_fee: number,
    ): Chart => {
        const chart: Chart = new Chart();

        chart.visit = visit;
        chart.patient = patient;
        chart.doctor = doctor;
        chart.examination = examination;
        chart.diagnosis = diagnosis;
        chart.prescription = prescription;
        chart.consultationFee = consultation_fee;

        return chart;
    };
}
