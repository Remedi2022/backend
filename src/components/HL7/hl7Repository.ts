import { HL7 } from "@entities/HL7";
import { CREATED, FORBIDDEN } from "http-status-codes";
import { Service } from "typedi";

@Service()
export class HL7Repository {
    async findall(): Promise<HL7[]> {
        const result: HL7[] = await HL7.find({
            order: {
                id: "DESC",
            },
        });

        return result;
    }

    async save(hl7: HL7): Promise<Mutation<void>> {
        try {
            const result = await HL7.save(hl7);

            return {
                status: CREATED,
                success: true,
                message: "HL7 등록 성공",
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

export { HL7 };
