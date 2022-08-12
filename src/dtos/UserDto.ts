export interface UserRequestDto {
    readonly email: string;
    readonly password: string;
}

export interface UserResponseDto {
    readonly id: string;
    readonly email: string;
    readonly password: string;
}
