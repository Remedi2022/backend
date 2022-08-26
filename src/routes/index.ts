import fs from "fs";
import path from "path";

import express, { Router } from "express";

const basename: string = path.basename(__filename);

class ApiRouter {
    public router: Router = express.Router();

    constructor() {
        this.router;
        this.setRouter();
    }

    setRouter() {
        fs.readdirSync(__dirname)
            .filter(file => {
                return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts";
            })
            .forEach(async file => {
                const cur_basename: string = file.split(".")[0];

                this.router.use(
                    "/api/" + cur_basename,
                    await import("./" + cur_basename).then(router => {
                        return router.default;
                    }),
                );
            });
    }
}

export default new ApiRouter().router;
