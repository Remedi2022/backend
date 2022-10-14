import { ResponseSignUpDto } from "../dtos/response/ResponseSignUpDto";
import { Doctor } from "@entities/Doctor";

export interface IAuthRepository {
    save(doctor: Doctor): Promise<Mutation<ResponseSignUpDto>>;
    findOneByEmail(email: string): Promise<Doctor | undefined>;
}
