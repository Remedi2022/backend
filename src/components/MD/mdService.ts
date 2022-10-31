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
            const chart = await chartRepository.findOneByVid(visit.id);
            // const PatientInfo = await patientRepository.findById(visit.patient.id);

            console.log("VisitInfo : ", visit.id);
            console.log("ChartInfo : ", chart);

            const doctor = visit.doctor;
            const patient = visit.patient;

            const DT = new Date();
            const YYYY = DT.getFullYear();
            const MM = DT.getMonth() + 1;
            const DD = DT.getDate();
            const HH = DT.getHours();
            const mm = DT.getMinutes();
            const SS = DT.getSeconds();

            const createdTime = `${YYYY}${MM}${DD}${HH}${mm}${SS}`;

            const HL7 = "";

            const MSH = `MSH|^~.&|||||${createdTime}||EHC^E01^EHC_E01|1817457|P|2.6||||||||||||||`;
            const IVC = `IVC|15|||OR|NORM|FN|${createdTime}| ||REMEDI^12345|NHLS||||||||${doctor.name}||||||AMB||||||`;
            const PSS = `PSS|1||1| |진료비 세부산정내역|`;
            const PSG = `PSG|1||1|Y| |진찰료|`;
            const PSL = `PSL|1||1|||P|md.kcd||md.item_name|${chart.date}|||md.price|chart.prescribedMD|?|req.individual_copayment|||||Y|||||||2||||||||||||||||||||chart.prescribedMD|`;
            const PID = `PID|||${patient.id}^^^^PI~${patient.rrn}^^^SS||${patient.name}|`;
            const IN1 = `IN1|`;
            const IN2 = `IN2|`;

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
