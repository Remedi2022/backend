import { config } from "dotenv";

config({ path: "src/.env" });

const PORT = 8888;
const _USERNAME = "oogab";
const PASSWORD = "rejavaji";
const DATABASE = "REMEDI";
const HOST = "127.0.0.1";
const DB_PORT = 5432;
const COOKIE_SECRET = "";
const ENV = process.env.NODE_ENV || "development";
// const PORT = Number(process.env.PORT);
// const _USERNAME = process.env._USERNAME;
// const PASSWORD = process.env.PASSWORD;
// const DATABASE = process.env.DATABASE;
// const HOST = process.env.HOST;
// const DB_PORT = Number(process.env.DB_PORT);
// const COOKIE_SECRET = process.env.COOKIE_SECRET;
// const ENV = process.env.NODE_ENV || "development";

export { PORT, _USERNAME, PASSWORD, DATABASE, HOST, DB_PORT, COOKIE_SECRET, ENV };
