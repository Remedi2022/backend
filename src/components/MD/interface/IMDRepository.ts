import { MD } from "../mdRepository";

export interface IMDRepository {
    findall(): Promise<MD[]>;
}
