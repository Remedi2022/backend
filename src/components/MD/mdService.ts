import { Visit } from "@entities/Visit";
import { AuthRepository } from "components/Auth/authRepository";
import { ChartRepository } from "components/Chart/chartRepository";
import { PatientRepository } from "components/Patient/patientRepository";
import { FORBIDDEN, OK } from "http-status-codes";
import patient from "routes/routers/patient";
import { Service } from "typedi";
import { ResponseMDListDto } from "./dtos";
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

            const visit = await Visit.findOne({ where: { id: 1 }, relations: ["doctor", "patient"] });
            if (!visit) {
                throw new Error("방문 정보가 없습니다.");
            }

            const mdRepository = new MDRepository();
            const chartRepository = new ChartRepository();

            // const MDInfo = await mdRepository.listByVid(visit.id);
            const ChartInfo = await chartRepository.findOneByVid(visit.id);
            // const PatientInfo = await patientRepository.findById(visit.patient.id);

            console.log("VisitInfo : ", visit.id);
            console.log("ChartInfo : ", ChartInfo);

            const HL7 = "";

            const MSH = `MSH||||${visit.hBlood}||||`;
            const IVC = "IVC||||||||";
            const PSS = "PSS|";
            const PSG = "PSG|";
            const PSL = "PSL|";
            const PID = "PID|";
            const IN1 = "IN1|";
            const IN2 = "IN2|";

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

    async findOneById(id: number): Promise<Mutation<MD>> {
        try {
            const md = await this.mdRepository.findOneById(id);
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
}
