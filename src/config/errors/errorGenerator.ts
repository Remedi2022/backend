import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "http-status-codes";

import { MESSAGE } from "./message";

abstract class RequestError extends Error {
    status: number;
    success: boolean;

    constructor(message?: string) {
        super(message);
        this.success = false;
    }
}

class BadRequest extends RequestError {
    constructor(message: string = MESSAGE.BAD_REQUEST) {
        super(message);
        this.status = BAD_REQUEST;
    }
}

class NotFound extends RequestError {
    constructor(message: string = MESSAGE.NOT_FOUND) {
        super(message);
        this.status = NOT_FOUND;
    }
}

class Forbidden extends RequestError {
    constructor(message: string = MESSAGE.FORBIDDEN) {
        super(message);
        this.status = FORBIDDEN;
    }
}

class Conflict extends RequestError {
    constructor(message: string = MESSAGE.CONFLICT) {
        super(message);
        this.status = CONFLICT;
    }
}

class Unauthorized extends RequestError {
    constructor(message: string = MESSAGE.UNAUTHORIZED) {
        super(message);
        this.status = UNAUTHORIZED;
    }
}

export { BadRequest, NotFound, Forbidden, Conflict, Unauthorized };
