"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1UserController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\account\controllers\apiv1user.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const user_1 = require("../api/user");
const myname = 'features/account/controllers/apiv1user';
function makeHandlerAwareOfAsyncErrors(handler) {
    return function (request, response, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(request, response, next);
            }
            catch (error) {
                if (error instanceof error_1.FcError) {
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: error.code,
                        message: error.message,
                        data: error.data || {}
                    });
                }
                else {
                    const fcError = new error_1.FcError(error_1.SYSTEM_ERROR);
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: fcError.code,
                        message: error.message,
                        data: fcError.data || {}
                    });
                }
            }
        });
    };
}
class ApiV1UserController {
    constructor() {
        this.path = '/api/v1/user';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1UserController.initialize');
            this.router.get('/checkusername/:username', this.getCheckUsername);
        };
        this.getCheckUsername = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, user_1.validateUsername)(request.params.username).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch(err => (0, sendResponse_1.sendFailure)(response, {
                err: err
            }, 501));
        });
    }
}
exports.ApiV1UserController = ApiV1UserController;
//# sourceMappingURL=apiv1user.js.map