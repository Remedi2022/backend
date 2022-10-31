import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity("visit")
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

    @Column()
    benefitType: string; // 항상 건강보험

    @Column()
    purpose: string; // 방문목적

    @Column()
    purposeDetail: string; // 세부목적

    @Column()
    temperature: number;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    hBlood: number;

    @Column()
    lBlood: number;

    @Column()
    bloodSugar: number;

    @ManyToOne(type => Patient, patient => patient.visit, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.visit, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}