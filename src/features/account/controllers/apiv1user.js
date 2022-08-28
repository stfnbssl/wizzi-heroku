"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1UserController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\features\account\controllers\apiv1user.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const user_1 = require("../api/user");
const myname = 'features/account/controllers/apiv1user';
class ApiV1UserController {
    constructor() {
        this.path = '/api/v1/user';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1UserController.initialize');
            this.router.get('/checkusername/:username', this.getCheckUsername);
        };
        this.getCheckUsername = 
        // loog 'getCheckUsername.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, user_1.validateUsername)(request.params.username).then(
            // loog 'getCheckUsername.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch(err => (0, sendResponse_1.sendFailure)(response, {
                err: err
            }, 501));
        });
    }
}
exports.ApiV1UserController = ApiV1UserController;
//# sourceMappingURL=apiv1user.js.map