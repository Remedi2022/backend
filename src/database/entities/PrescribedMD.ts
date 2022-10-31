import chart from "routes/routers/chart";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";

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

    @ManyToOne(type => Chart, chart => chart.prescribedmd, { nullable: true, onDelete: "CASCADE" })
    chart: Chart;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
