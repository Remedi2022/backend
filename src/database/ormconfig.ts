import { ConnectionOptions } from "typeorm";

import { configs } from ".";
import { ENV } from "../config/env";

const connectionOptions: ConnectionOptions = configs[ENV];

export { connectionOptions };
