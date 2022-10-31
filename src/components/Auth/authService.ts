import { Request } from "express";
import bcrypt from "bcrypt";
import { Service } from "typedi";

import { BadRequest, Conflict } from "@errors/errorGenerator";
import { RequestSignUpDto, ResponseSignUpDto } from "./dtos";
import { AuthRepository, Doctor } from "./authRepository";
import { IAuthService } from "./interface/IAuthService";

@Service()
export class AuthService implements IAuthService {
    constructor(private authRepository: AuthRepository) {}

    async signup(requestSignUpDto: RequestSignUpDto): Promise<Mutation<ResponseSignUpDto>> {
        const { hospital_code, hospital_name, business_registration_number, license, email, password, name } =
            requestSignUpDto;

        try {
            const exEmail = await this.authRepository.findByemail(email);
            const exPassword = await this.authRepository.findBypwd(password);

            if (exEmail) {
                throw new Conflict("중복된 아이디가 이미 존재합니다");
            }
            if (exPassword) {
                throw new Conflict("중복된 비밀번호가 이미 존재합니다");
            }

            const hash_hospital = await bcrypt.hash(hospital_code, 10);
            const hash_license = await bcrypt.hash(license, 10);
            const hash_pwd = await bcrypt.hash(password, 10);

            const doctor = new Doctor();
            doctor.hospitalCode = hash_hospital;
            doctor.hospitalName = hospital_name;
            doctor.businessRegistrationNumber = business_registration_number;
            doctor.license = hash_license;
            doctor.email = email;
            doctor.password = hash_pwd;
            doctor.name = name;

            return this.authRepository.save(doctor);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async signout(req: Request): Promise<Mutation<undefined>> {
        req.logout((err: any): any => {
            if (err) {
                return {
                    status: 403,
                    success: false,
                    message: "로그아웃 실패",
                    error: err,
                };
            }
            console.log(req.user);
        });

        return {
            status: 200,
            success: true,
            message: "로그아웃 성공",
        };
    }
}
