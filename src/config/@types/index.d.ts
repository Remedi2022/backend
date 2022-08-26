import { ErrorSafety } from "./return";
import { User as UserModel } from "database/entities/User";

declare global {
    interface Mutation<T> extends ErrorSafety<T> {}

    namespace Express {
        interface User extends UserModel {}
    }

    namespace NodeJS {
        interface ProcessEnv {
            // 환경 변수 타입 설정
        }
    }

    interface Signature {
        [key: string]: any; // index signature
    }
}
