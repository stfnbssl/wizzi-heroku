"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1WizziGistController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const rest_1 = require("../../../utils/rest");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizziGist_1 = require("../api/wizziGist");
const myname = 'features/wizzigist/controllers/apiv1wizzigist';
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
class ApiV1WizziGistController {
    constructor() {
        this.path = '/api/v1/gist';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1WizziGistController.initialize');
            this.router.post('/', this.execCreateGist);
            this.router.put('/', this.execUpdateGist);
        };
        this.execCreateGist = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('execCreateGist.request.params', request.params, __filename);
            var __check = (0, rest_1.restParamsCheck)(request);
            var kind = __check.notEmpty('query', 'kind');
            var name = __check.notEmpty('query', 'name');
            var schema = __check.notEmpty('query', 'schema');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            (0, wizziGist_1.createGist)(kind, name, schema).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.execUpdateGist = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('request.body', request.body, __filename);
            console.log('request.query', request.query, __filename);
            var __check = (0, rest_1.restParamsCheck)(request);
            var hash = __check.notEmpty('body', 'hash');
            var content = __check.notEmpty('body', 'content');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            (0, wizziGist_1.updateGist)(hash, content).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1WizziGistController = ApiV1WizziGistController;
//# sourceMappingURL=apiv1wizzigist.js.map