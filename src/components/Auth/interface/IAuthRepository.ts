import { ResponseSignUpDto } from "../dtos/response/ResponseSignUpDto";
import { Doctor } from "@entities/Doctor";
import { Visit } from "@entities/Visit";

export interface IAuthRepository {
    save(doctor: Doctor): Promise<Mutation<ResponseSignUpDto>>;
    findByemail(email: string): Promise<boolean>;
    findBypwd(password: string): Promise<boolean>;
    findOneByemail(email: string): Promise<Doctor>;
    findById(id: string): Promise<Doctor>;
    findOneByVid(vid: number): Promise<Doctor>;
    findByVisit(visit: Visit): Promise<Doctor>;
}
