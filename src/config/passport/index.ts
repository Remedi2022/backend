import passport from "passport";

import local from "./localStrategy";
import { AuthRepository, User } from "components/Auth/authRepository";

const authRepository = new AuthRepository();

export default () => {
    passport.serializeUser((user: User, done) => {
        done(null, user.email);
    });

    passport.deserializeUser((email: string, done) => {
        authRepository
            .findOneByEmail(email)
            .then(user => {
                done(null, user);
            })
            .catch(err => done(err));
    });

    local();
};
