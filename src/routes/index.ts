import fs from "fs";
import path from "path";

import express, { Router } from "express";

const basename: string = path.basename(__filename);
const dir: string = path.join(__dirname, "routers");

class ApiRouter {
    public router: Router = express.Router();

    constructor() {
        this.router;
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
    }
}

export default new ApiRouter().router;
