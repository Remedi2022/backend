import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";

import { Doctor } from "@entities/Doctor";
import { IAuthRepository } from "./interface/IAuthRepository";
import { ResponseSignUpDto } from "./dtos";

@Service()
export class AuthRepository implements IAuthRepository {
    async save(doctor: Doctor): Promise<Mutation<ResponseSignUpDto>> {
        try {
            const result = await Doctor.save(doctor);
            const responseSignUpDto: ResponseSignUpDto = new ResponseSignUpDto(result);

            return {
                status: CREATED,
                success: true,
                message: "회원가입 성공",
                result: responseSignUpDto,
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async findByemail(email: string): Promise<boolean> {
        const result = await Doctor.findOne({ email });

        if (!result) return false;
        return true;
    }

    async findBypwd(password: string): Promise<boolean> {
        const result = await Doctor.findOne({ password });

        if (!result) return false;
        return true;
    }

    async findOneByemail(email: string): Promise<Doctor | undefined> {
        const result = await Doctor.findOne({ email });
        return result;
    }

    async findById(id: string): Promise<Doctor> {
        const result = await Doctor.findOne({ id });

        if (!result) throw Error("등록되지 않은 의사입니다.");
        return result;
    }

    async findOneByVid(vid: number): Promise<Doctor | undefined> {
        const result = await Doctor.findOne({
            where: {
                visit_id: vid,
            },
        });

        if (!result) throw Error;
        return result;
    }
}

export { Doctor };
