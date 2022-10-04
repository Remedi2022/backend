import { Request } from "express";

import { RequestSignUpDto, ResponseSignUpDto } from "../dtos";

export interface IAuthService {
    signup(requestSignUpDto: RequestSignUpDto): Promise<Mutation<ResponseSignUpDto>>;
    signout(req: Request): Promise<Mutation<undefined>>;
}
