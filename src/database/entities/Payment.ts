import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Visit } from "./Visit";

@Entity("payment")
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 본인 부담금 // 40000
    @Column()
    individualCopayment: number;

    // 비급여 // 5000
    @Column()
    uninsuredPayment: number;

    // 공단 부담금 // 80000
    @Column()
    nhisCopayment: number;

    // 45000
    @Column()
    paidAmount: number;

    // 카드 등
    @Column()
    paymentType: string;

    @OneToOne(() => Visit)
    @JoinColumn()
    visit: Visit;

    @OneToOne(() => Chart)
    @JoinColumn()
    chart: Chart;

    readonly date: BaseTimeEntity;
}
