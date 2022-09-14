import joi from "joi";
import { RequestSignUpDto } from "./dtos";

export const signup_validation = (dto: RequestSignUpDto) => {
    const schema = {
        email: joi.string().min(8).max(13).required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,13}$")).required(),
    };
    return joi.Validation(dto, schema);
};
