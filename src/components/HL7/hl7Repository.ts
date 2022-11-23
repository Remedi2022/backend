import { HL7 } from "@entities/HL7";
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
}

export { HL7 };
