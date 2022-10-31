import patient from "routes/routers/patient";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Visit } from "./Visit";

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
