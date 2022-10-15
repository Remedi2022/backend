import { ResponseSignUpDto } from "../dtos/response/ResponseSignUpDto";
import { Doctor } from "@entities/Doctor";

export interface IAuthRepository {
    save(doctor: Doctor): Promise<Mutation<ResponseSignUpDto>>;
    findByemail(email: string): Promise<boolean>;
    findBypwd(password: string): Promise<boolean>;
    findOneByemail(email: string): Promise<Doctor | undefined>;
}
