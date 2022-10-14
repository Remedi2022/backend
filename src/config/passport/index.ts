import passport from "passport";

import local from "./localstrategy";
import { AuthRepository, Doctor } from "components/Auth/authRepository";

const authRepository = new AuthRepository();

export default () => {
    passport.serializeUser((user: Doctor, done) => {
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
