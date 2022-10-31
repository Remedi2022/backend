import patient from "routes/routers/patient";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Patient } from "./Patient";

@Entity("md")
export class MD extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    itemName: string;

    @Column()
    volume: number;

    @Column()
    unit: string;

    @Column()
    price: number;

    @Column()
    company: string;

    @Column()
    kcd: string;

    @ManyToOne(type => Patient, patient => patient.chart, { nullable: true, onDelete: "CASCADE" })
    patient: Patient;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
