import { UserResponseDto } from "@dtos/UserDto";
import { User } from "@entities/User";

export interface IAuthRepository {
    save(user: User): Promise<Mutation<UserResponseDto>>;
    findOneByEmail(email: string): Promise<User | undefined>;
}
