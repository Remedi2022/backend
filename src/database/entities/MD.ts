import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { PrescribedMD } from "./PrescribedMD";

@Entity("md")
export class MD extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    itemName: string;

    @Column()
    volume: number;

    @Column()
    unit: string;

    @Column()
    price: number;

    @Column()
    company: string;

    @Column()
    kcd: string;

    @OneToMany(type => PrescribedMD, prescribedmd => prescribedmd.md)
    prescribedmd: PrescribedMD[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
