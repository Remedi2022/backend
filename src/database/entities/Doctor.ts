import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

import { BaseTimeEntity } from "./base/BaseTimeEntity";
import { Chart } from "./Chart";
import { Visit } from "./Visit";

@Entity("doctor")
export class Doctor extends BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    @Generated("uuid")
    id: string;

    @Column({
        nullable: false,
    })
    hospitalCode: string;

    @Column({
        nullable: false,
    })
    hospitalName: string;

    @Column()
    businessRegistrationNumber: string;

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

    @OneToMany(type => Chart, chart => chart.patient)
    chart!: Chart[];

    @Column((type: any) => BaseTimeEntity)
    readonly date: BaseTimeEntity;

    public static createDoctor = (
        hospital_code: string,
        hospital_name: string,
        business_registration_number: string,
        license: string,
        email: string,
        pwd: string,
        name: string,
    ): Doctor => {
        const doctor: Doctor = new Doctor();

        doctor.hospitalCode = hospital_code;
        doctor.hospitalName = hospital_name;
        doctor.businessRegistrationNumber = business_registration_number;
        doctor.license = license;
        doctor.email = email;
        doctor.password = pwd;
        doctor.name = name;

        return doctor;
    };
}
