"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\middlewares\apiSecured.ts.ittf
*/
const utils_1 = require("../utils");
const error_1 = require("../utils/error");
//
exports.default = (request, response, next) => {
    if (request.session && request.session.user) {
        return next();
    }
    const error = new error_1.FcError(error_1.LOGIN_REQUIRED);
    response.status(utils_1.statusCode.FORBIDDEN).send({
        error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
        }
    });
};
//# sourceMappingURL=apiSecured.js.map