import { ErrorSafety } from "./return";
import { User as UserModel } from "@entities/User";

declare global {
    interface Mutation<T> extends ErrorSafety<T> {}

    namespace Express {
        interface User extends UserModel {}
    }

    interface Signature {
        [key: string]: any; // index signature
    }
}
