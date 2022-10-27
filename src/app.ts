import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import FileStore from "session-file-store";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { COOKIE_SECRET, PORT } from "config/env";
import passportConfig from "./config/passport";
import ApiRouter from "./routes/index";

const MAXAGE = 1 * 60 * 60 * 1000;
const SESS_OPTION = {
    retries: 50,
    minTimeOut: 100,
    maxTimeout: 200,
};
const swaggerSpec = YAML.load(path.join(__dirname, "config/swagger/openapi.yaml"));
const sessionStore = FileStore(session);
const store = new sessionStore(SESS_OPTION);

// const kafka = new Kafka({
//     clientId: "REMEDI",
//     brokers: ["localhost:9092"],
// });

// export const producer = kafka.producer();
// export const consumer = kafka.consumer({
//     groupId: "test-group",
// });

// const initPubKafka = async () => {
//     console.log("start publish kafka");
//     const result = await producer.connect();
//     console.log(result);
// };

// const initSubKafka = async () => {
//     console.log("start subscribe");
//     await consumer.connect();
//     await consumer.subscribe({
//         topic: "REMEDI-kafka-test",
//         fromBeginning: true,
//     });
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             if (message.value) {
//                 console.log({
//                     value: message.value.toString(),
//                 });
//             }
//         },
//     });
// };

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setMiddleWare();
        this.setStatic();
        this.getRouter();
        this.errorHandler();
    }

    setMiddleWare() {
        this.app.set("port", PORT || 8080);
        passportConfig();

        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser(COOKIE_SECRET));
        this.app.use(
            session({
                resave: false,
                secret: COOKIE_SECRET || "secret",
                store: store,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    secure: false,
                    maxAge: MAXAGE,
                },
                rolling: true,
                genid: () => {
                    return "testCookie";
                },
            }),
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    setStatic() {
        // this.app.use('/', express.static(path.join(__dirname + 'public')));
    }

    getRouter() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
        this.app.use(ApiRouter);
    }

    errorHandler() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const err: any = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
            err.status = 404;
            next(err);
        });

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
            res.status(err.status || 500);

            console.error(err);
            res.status(err.status).json({
                success: err.success,
                message: err.message,
            });
        });
    }
}

// initPubKafka();
// initSubKafka();

export default new App().app;
