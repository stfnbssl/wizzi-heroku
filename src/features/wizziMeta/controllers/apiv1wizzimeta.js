"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1WizziMetaController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const rest_1 = require("../../../utils/rest");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizziMeta_1 = require("../api/wizziMeta");
const myname = 'features/wizzimeta/controllers/wizzimeta';
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
class ApiV1WizziMetaController {
    constructor() {
        this.path = '/api/v1/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1WizziMetaController.initialize');
            this.router.post('/execute', this.execute);
        };
        this.execute = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var __check = (0, rest_1.restParamsCheck)(request);
            var hash = __check.notEmpty('query', 'hash');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            (0, wizziMeta_1.executeMetaProduction)({}).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1WizziMetaController = ApiV1WizziMetaController;
//# sourceMappingURL=apiv1wizzimeta.js.map