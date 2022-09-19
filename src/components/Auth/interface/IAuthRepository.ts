import { ResponseSignUpDto } from "../dtos/response/ResponseSingUpDto";
import { User } from "database/entities/User";

export interface IAuthRepository {
    save(user: User): Promise<Mutation<ResponseSignUpDto>>;
    findOneByEmail(email: string): Promise<User | undefined>;
}
