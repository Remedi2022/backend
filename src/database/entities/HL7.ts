import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";

@Entity("hl7s")
export class HL7 extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    content: string;

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;

    public static createMD = (content: string): HL7 => {
        const hl7: HL7 = new HL7();

        hl7.content = content;

        return hl7;
    };
}
