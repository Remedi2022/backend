import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Visitor } from "./Visitor";

@Entity("doctor")
export class Doctor extends BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    @Generated("uuid")
    id: string;

    @Column({
        nullable: false,
    })
    hospital: string;

    @Column({
        nullable: false,
    })
    license: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        nullable: false,
        unique: true,
    })
    password!: string;

    @Column()
    name: string;

    @OneToMany(type => Visitor, visitor => visitor.patient)
    visitor!: Visitor[];

    @OneToMany(type => Chart, chart => chart.patient)
    chart!: Chart[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
