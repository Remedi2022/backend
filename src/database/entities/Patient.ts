import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Visit } from "./Visit";

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

    @OneToMany(type => Visit, visitor => visitor.patient)
    visit!: Visit[];

    @OneToMany(type => Chart, chart => chart.patient)
    chart!: Chart[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
