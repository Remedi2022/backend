import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
        unique: true,
    })
    password!: string;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
