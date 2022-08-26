import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";

import { User } from "@entities/User";
import { IAuthRepository } from "./interface/IAuthRepository";
import { ResponseSignUpDto } from "./dtos";

@Service()
export class AuthRepository implements IAuthRepository {
    async save(user: User): Promise<Mutation<ResponseSignUpDto>> {
        try {
            const result: ResponseSignUpDto = await User.save(user);
            return {
                status: OK,
                success: true,
                message: "회원가입 성공",
                result,
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

    async findOneByEmail(email: string): Promise<User | undefined> {
        const result = await User.findOne({ email: email });
        return result;
    }
}

export { User };
