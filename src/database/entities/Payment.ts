import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Visitor } from "./Visitor";

@Entity("payment")
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 본인 부담금 // 40000
    @Column()
    individual_copayment: number;

    // 비급여 // 5000
    @Column()
    uninsured_payment: number;

    // 공단 부담금 // 80000
    @Column()
    nhis_copayment: number;

    // 45000
    @Column()
    paid_amount: number;

    // 카드 등
    @Column()
    payment_type: string;

    @OneToOne(() => Visitor)
    @JoinColumn()
    visitor: Visitor;

    readonly date: BaseTimeEntity;
}
