import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { MD } from "./MD";

@Entity("prescribedmd")
export class PrescribedMD extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    mdId: number;

    @Column()
    mdAmountPerUnit: number;

    @Column()
    mdCountPerDay: number;

    @Column()
    mdAdministrationDay: number;

    @ManyToOne(type => MD, md => md.prescribedmd, { nullable: true, onDelete: "CASCADE" })
    md: MD;

    @ManyToOne(type => Chart, chart => chart.prescribedmd, { nullable: true, onDelete: "CASCADE" })
    chart: Chart;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
