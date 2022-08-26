import { Request } from "express";
import bcrypt from "bcrypt";
import { Service } from "typedi";

import { BadRequest, Conflict } from "@errors/errorGenerator";
import { RequestSignUpDto, ResponseSignUpDto } from "./dtos";
import { AuthRepository, User } from "./authRepository";

@Service()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async signup(userDto: RequestSignUpDto): Promise<Mutation<ResponseSignUpDto>> {
        const { email, password } = userDto;

        try {
            const exEmail = await User.findOne({ email });
            const exPassword = await User.findOne({ password });

            if (!email) {
                throw new BadRequest("아이디는 필수로 적어야 합니다");
            }
            if (!password) {
                throw new BadRequest("비밀번호는 필수로 적어야 합니다");
            }
            if (exEmail) {
                throw new Conflict("중복된 아이디가 이미 존재합니다");
            }
            if (exPassword) {
                throw new Conflict("중복된 비밀번호가 이미 존재합니다");
            }

            const hash = await bcrypt.hash(password, 10);

            const user = new User();
            user.email = email;
            user.password = hash;

            return this.authRepository.save(user);
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
