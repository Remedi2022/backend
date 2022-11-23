import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { RequestMDRegisterDto, ResponseMDListDto } from "./dtos";
import { IMDService } from "./interface/IMDService";
import { MD, MDRepository } from "./mdRepository";

@Service()
export class MDService implements IMDService {
    constructor(private mdRepository: MDRepository) {}

    async list(): Promise<Mutation<ResponseMDListDto[]>> {
        try {
            const mds = await this.mdRepository.findall();
            const result: ResponseMDListDto[] = [];

            for (const md of mds) {
                const responseMDListDto: ResponseMDListDto = new ResponseMDListDto(md);

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

    async findById(id: number): Promise<Mutation<MD>> {
        try {
            const md = await this.mdRepository.findById(id);
            const result: MD = md;

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

    async search(patient_name: string): Promise<Mutation<ResponseMDListDto[]>> {
        try {
            const mds = await this.mdRepository.findByName(patient_name);
            const result: ResponseMDListDto[] = [];

            for (const md of mds) {
                const responseSearchMDListDto: ResponseMDListDto = new ResponseMDListDto(md);

                result.push(responseSearchMDListDto);
            }

            return {
                status: OK,
                success: true,
                message: "MD 검색 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: 400,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }

    async register(dto: RequestMDRegisterDto): Promise<Mutation<void>> {
        try {
            const { item_name, volume, unit, price, company, kcd } = dto;

            const md: MD = MD.createMD(item_name, volume, unit, price, company, kcd);

            return this.mdRepository.save(md);
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
