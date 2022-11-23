import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { ResponseHL7Dto } from "./dtos/ResponseHL7Dto";
import { HL7Repository } from "./hl7Repository";

@Service()
export class HL7Service {
    constructor(private hl7Repository: HL7Repository) {}

    async list(): Promise<Mutation<ResponseHL7Dto[]>> {
        try {
            const hl7s = await this.hl7Repository.findall();
            const result: ResponseHL7Dto[] = [];

            for (const hl7 of hl7s) {
                const responseHL7Dto: ResponseHL7Dto = new ResponseHL7Dto(hl7);

                result.push(responseHL7Dto);
            }

            return {
                status: OK,
                success: true,
                message: "hl7 리스트 반환 성공",
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
