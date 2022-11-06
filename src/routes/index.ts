import fs from "fs";
import path from "path";
import schedule from "node-schedule";

import express, { Router } from "express";
import { VisitConstroller } from "components/Visit/visitController";

const basename: string = path.basename(__filename);
const dir: string = path.join(__dirname, "routers");

class ApiRouter {
    public router: Router = express.Router();
    private visitController: VisitConstroller;

    constructor() {
        this.router;
        this.visitController = new VisitConstroller();
        this.setRouter();
    }

    setRouter() {
        fs.readdirSync(dir)
            .filter(file => {
                return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts";
            })
            .forEach(async file => {
                const cur_basename: string = file.split(".")[0];

                this.router.use(
                    "/api/" + cur_basename,
                    await import("./routers/" + cur_basename).then(router => {
                        return router.default;
                    }),
                );
            });

        schedule.scheduleJob({ rule: " * * 0 * * *" }, async () => {
            this.visitController.scheduler();
        });
    }
}

export default new ApiRouter().router;
