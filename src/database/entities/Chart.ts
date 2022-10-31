import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
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
    consultation_fee: number;

    @OneToOne(() => Visit)
    @JoinColumn()
    visit: Visit;

    @ManyToOne(type => Patient, patient => patient.chart, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.chart, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}