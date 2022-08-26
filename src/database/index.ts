import path from "path";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { DATABASE, DB_PORT, HOST, PASSWORD, _USERNAME } from "@env";

const configs: Signature = {
    development: {
        type: "mysql",
        host: HOST,
        port: DB_PORT,
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [path.join("src", "database", "entities", "**", "*{.js,.ts}")],
    },

    production: {
        type: "mysql",
        host: HOST,
        port: DB_PORT,
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [path.join("src", "database", "entities", "**", "*{.js,.ts}")],
    },
};

export { configs };
