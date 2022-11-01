import { MD } from "../mdRepository";

export interface IMDRepository {
    findall(): Promise<MD[]>;
    findById(id: number): Promise<MD | undefined>;
}
