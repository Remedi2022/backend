import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Visitor } from "./Visitor";

@Entity("patient")
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column()
    gender: string;

    @Column()
    rrn: string;

    @Column()
    phone: string;

    @Column()
    firstResponder: string;

    @Column()
    address: string;

    @OneToMany(type => Visitor, visitor => visitor.patient)
    visitor!: Visitor[];

    @OneToMany(type => Chart, chart => chart.patient)
    chart!: Chart[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
