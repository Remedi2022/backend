import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Doctor } from "./Doctor";
import { MD } from "./MD";
import { Patient } from "./Patient";

@Entity("visit")
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    status: number;

    @Column()
    benefitType: string; // 항상 건강보험

    @Column()
    purpose: string; // 방문목적

    @Column({ nullable: true })
    purposeDetail: string; // 세부목적

    @Column({ nullable: true })
    temperature: number;

    @Column({ nullable: true })
    weight: number;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    hBlood: number;

    @Column({ nullable: true })
    lBlood: number;

    @Column({ nullable: true })
    bloodSugar: number;

    @ManyToOne(type => Patient, patient => patient.visit, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.visit, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
