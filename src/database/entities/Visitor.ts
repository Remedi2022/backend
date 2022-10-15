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
import { Patient } from "./Patient";

@Entity("visitor")
export class Visitor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

    @ManyToOne(type => Patient, patient => patient.visitor, { nullable: false, onDelete: "CASCADE" })
    patient: Patient;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
