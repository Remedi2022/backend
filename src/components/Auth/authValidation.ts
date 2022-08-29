import joi from "joi";
import { RequestSignUpDto } from "./dtos";

class AuthValidation {
    signup_validation = (dto: RequestSignUpDto) => {
        return joi.object({
            email: joi.string().min(8).max(13).required(),
            password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,13}$")).required(),
        });
    };
}

export { AuthValidation };
