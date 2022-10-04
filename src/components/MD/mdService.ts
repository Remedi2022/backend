import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseMDListDto } from "./dtos";
import { MD, MDRepository } from "./mdRepository";

@Service()
export class MDService {
    constructor(private mdRepository: MDRepository) {}

    async md_list(): Promise<Mutation<ResponseMDListDto[]>> {
        try {
            const md_list = await this.mdRepository.findall();
            const result: ResponseMDListDto[] = [];

            for (const md of md_list) {
                const responseMDListDto: ResponseMDListDto = new ResponseMDListDto();

                responseMDListDto.name = md.itemName;
                responseMDListDto.volume = md.volume;
                responseMDListDto.unit = md.unit;
                responseMDListDto.price = md.price;
                responseMDListDto.company = md.company;
                responseMDListDto.kcd = md.kcd;

                result.push(responseMDListDto);
            }

            return {
                status: OK,
                success: true,
                message: "MD 리스트 반환 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
