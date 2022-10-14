import { ErrorSafety } from "./return";
import { Doctor as UserModel } from "@entities/Doctor";

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
