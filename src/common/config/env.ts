import { config } from "dotenv";

config({ path: "src/.env" });

const PORT = process.env.PORT;
const _USERNAME = process.env._USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const HOST = process.env.HOST;
const DB_PORT = Number(process.env.DB_PORT);
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const ENV: string = process.env.NODE_ENV || "development";

export { PORT, _USERNAME, PASSWORD, DATABASE, HOST, DB_PORT, COOKIE_SECRET, ENV };
