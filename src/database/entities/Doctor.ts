import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, Generated, OneToMany } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Visit } from "./Visit";

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

    @OneToMany(type => Visit, visitor => visitor.patient)
    visit!: Visit[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
