import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";

import { Doctor } from "@entities/Doctor";
import { IAuthRepository } from "./interface/IAuthRepository";
import { ResponseSignUpDto } from "./dtos";
import { Conflict } from "@errors/errorGenerator";
import { Visit } from "@entities/Visit";

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

    async findOneByemail(email: string): Promise<Doctor> {
        const result = await Doctor.findOne({ email });

        if (!result) throw new Conflict("해당 이메일은 등록되지 않은 아이디입니다");
        return result;
    }

    async findById(id: string): Promise<Doctor> {
        const result = await Doctor.findOne({ id });

        if (!result) throw Error("등록되지 않은 의사입니다.");
        return result;
    }

    async findOneByVid(vid: number): Promise<Doctor> {
        const result = await Doctor.findOne({
            where: {
                visit_id: vid,
            },
        });

        if (!result) throw Error;
        return result;
    }

    async findByVisit(visit: Visit): Promise<Doctor> {
        const result = await Doctor.findOne({
            where: {
                visit,
            },
        });

        if (!result) {
            throw new Conflict("해당 의사 정보가 없습니다.");
        }

        return result;
    }
}

export { Doctor };
