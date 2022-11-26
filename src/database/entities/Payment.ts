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
    @Column({ nullable: true })
    paidAmount: number;

    // 카드 등
    @Column({ nullable: true })
    paymentType: string;

    @OneToOne(() => Visit)
    @JoinColumn()
    visit: Visit;

    @OneToOne(() => Chart)
    @JoinColumn()
    chart: Chart;

    readonly date: BaseTimeEntity;

    public static createPayment = (
        individual_copayment: number,
        uninsured_payment: number,
        nhis_copayment: number,
        visit: Visit,
        chart: Chart,
    ): Payment => {
        const payment: Payment = new Payment();

        payment.individualCopayment = individual_copayment;
        payment.uninsuredPayment = uninsured_payment;
        payment.nhisCopayment = nhis_copayment;
        payment.visit = visit;
        payment.chart = chart;

        return payment;
    };

    public setPaidAmount = (paid_amount: number): void => {
        this.paidAmount = paid_amount;
    };

    public setPaymentType = (payment_type: string): void => {
        this.paymentType = payment_type;
    };
}
