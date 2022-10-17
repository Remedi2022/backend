import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, Generated, OneToMany } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";
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

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
