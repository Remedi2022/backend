import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity("visitor")
export class Visitor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

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

    @ManyToOne(type => Patient, patient => patient.visitor, { nullable: false, onDelete: "CASCADE" })
    patient: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.visitor, { nullable: true, onDelete: "CASCADE" })
    doctor: Doctor;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
