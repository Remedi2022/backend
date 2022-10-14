import { BaseEntity, Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";

@Entity("patient")
export class Patient extends BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    @Generated("uuid")
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column()
    ppn: string;

    @Column()
    phone: string;

    @Column()
    firstResponder: string;

    @Column()
    address: string;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
