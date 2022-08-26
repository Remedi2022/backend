import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import Container from "typedi";

import { Unauthorized } from "@errors/errorGenerator";
import { AuthRepository } from "components/Auth/authRepository";

const LocalStrategy = passportLocal.Strategy;
const config = {
    usernameField: "email",
    passwordField: "password",
};

export default () => {
    const authRepository = Container.get(AuthRepository);
    passport.use(
        new LocalStrategy(config, async (email: string, password: string, done) => {
            try {
                const exUser = await authRepository.findOneByEmail(email);
                if (!exUser) {
                    throw new Unauthorized("회원을 찾을 수 없습니다.");
                }

                const result: boolean = await bcrypt.compare(password, exUser.password);

                if (!result) {
                    throw new Unauthorized("비밀번호가 일치하지 않습니다");
                }

                return done(null, exUser);
            } catch (err: any) {
                done(err);
            }
        }),
    );
};
