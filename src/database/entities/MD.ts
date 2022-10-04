import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";

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

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;
}
