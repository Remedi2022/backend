import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, Generated } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";

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

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
