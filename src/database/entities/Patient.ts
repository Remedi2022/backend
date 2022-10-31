import md from "routes/routers/md";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { MD } from "./MD";
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

    @OneToMany(type => MD, md => md.patient)
    md!: MD[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
