"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1WizziFsController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const rest_1 = require("../../../utils/rest");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizziFs_1 = require("../api/wizziFs");
const myname = 'features/wizzifs/controllers/apiv1wizzifs';
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
class ApiV1WizziFsController {
    constructor() {
        this.path = '/api/v1/wizzifs';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1WizziFsController.initialize');
            this.router.get('/ittf', this.getIttfDocument);
            this.router.put('/ittf', this.putIttfDocument);
        };
        this.getIttfDocument = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var __check = (0, rest_1.restParamsCheck)(request);
            var hash = __check.notEmpty('query', 'hash');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            (0, wizziFs_1.getIttfDocument)(hash).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putIttfDocument = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var __check = (0, rest_1.restParamsCheck)(request);
            var hash = __check.notEmpty('body', 'hash');
            var content = __check.notEmpty('body', 'content');
            var prettify = __check.optional('body', 'prettify');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            (0, wizziFs_1.putIttfDocument)(hash, content, prettify).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1WizziFsController = ApiV1WizziFsController;
//# sourceMappingURL=apiv1wizzifs.js.map