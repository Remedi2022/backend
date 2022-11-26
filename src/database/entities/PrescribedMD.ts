import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { MD } from "./MD";

@Entity("prescribedmd")
export class PrescribedMD extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    // 생성자 메서드
    public static createPMD = (
        md_amount_per_unit: number,
        md_count_per_day: number,
        md_administration_day: number,
        md: MD,
        chart: Chart,
    ): PrescribedMD => {
        const pmd: PrescribedMD = new PrescribedMD();

        pmd.mdAmountPerUnit = md_amount_per_unit;
        pmd.mdCountPerDay = md_count_per_day;
        pmd.mdAdministrationDay = md_administration_day;
        pmd.md = md;
        pmd.chart = chart;

        return pmd;
    };
}
