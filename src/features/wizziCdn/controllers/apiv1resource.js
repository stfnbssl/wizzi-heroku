"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1WizziCdnResourceController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const resource_1 = require("../api/resource");
const myname = 'features/wizziCdn/controllers/apiv1resource';
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
class ApiV1WizziCdnResourceController {
    constructor() {
        this.path = '/api/v1/wizzicdn';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1WizziCdnResourceController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getWizziCdnResourceList));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckResourceName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getWizziCdnResource));
            this.router.put("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.putWizziCdnResource));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putWizziCdnResourceById));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postWizziCdnResource));
            this.router.delete("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.deleteWizziCdnResource));
        };
        this.getWizziCdnResourceList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.getWizziCdnResourceList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getWizziCdnResourceList.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckResourceName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.validateWizziCdnResource)(request.params.owner, request.params.name).then(
            // loog 'getCheckResourceName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getWizziCdnResource = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.getWizziCdnResource)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getWizziCdnResource.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postWizziCdnResource = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.createWizziCdnResource)(request.params.owner, request.params.name, request.body.contents).then(
            // loog 'postWizziCdnResource.create.result', result
            (result) => {
                (0, resource_1.invalidateCache)(request.params.owner, request.params.name);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postWizziCdnResource.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putWizziCdnResource = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.updateWizziCdnResource)(null, request.params.owner, request.params.name, request.body.contents).then((result) => {
                (0, resource_1.invalidateCache)(request.params.id);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putWizziCdnResource.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putWizziCdnResourceById = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.updateWizziCdnResource)(request.params.id, null, null, request.body.contents).then((result) => {
                (0, resource_1.invalidateCache)(request.params.id);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putWizziCdnResourceById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.deleteWizziCdnResource = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, resource_1.deleteWizziCdnResource)(request.params.owner, request.params.name).then((result) => {
                (0, resource_1.invalidateCache)(request.params.id);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'deleteWizziCdnResource.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1WizziCdnResourceController = ApiV1WizziCdnResourceController;
//# sourceMappingURL=apiv1resource.js.map