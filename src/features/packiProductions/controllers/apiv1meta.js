"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1MetaProductionController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizzi_1 = require("../../wizzi");
const packi_1 = require("../../packi");
const meta_1 = require("../api/meta");
const meta_2 = require("../api/meta");
const packiProductions_1 = require("../../packiProductions");
const myname = 'features/production/controllers/apiv1metaproduction';
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
class ApiV1MetaProductionController {
    constructor() {
        this.path = '/api/v1/production/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1MetaProductionController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getMetaProductions));
            this.router.get("/props/:id", makeHandlerAwareOfAsyncErrors(this.getMetaProperties));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckMetaName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getMetaProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putMetaProduction));
            this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putMetaProductionPackiDiffs));
            this.router.post("'/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postMetaProduction));
            this.router.post("'/generate/:owner/:name", makeHandlerAwareOfAsyncErrors(this.generateMetaProductionByName));
        };
        this.getMetaProductions = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getMetaProductionList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => {
                if (result.ok) {
                    (0, sendResponse_1.sendSuccess)(response, result);
                }
                else {
                    console.log("[31m%s[0m", 'getMetaProductions.error', result);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: result
                    }, 501);
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getMetaProductions.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getMetaProperties = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return packiProductions_1.productionApi.prepareProductionById('meta', request.params.id, '', {}).then((metaProductionSet) => wizzi_1.wizziProds.generateArtifact('properties/index.json.ittf', metaProductionSet.packiFiles, metaProductionSet.context).then(
            // loog myname, 'getMetaProperties.generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                meta: JSON.parse(value.artifactContent)
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.packi.controllers.production.generateArtifact.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getMetaProperties.prepareProductionById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckMetaName = 
        // loog 'getCheckMetaName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.validateMetaProduction)(request.params.owner, request.params.name).then(
            // loog 'getCheckMetaName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getMetaProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getMetaProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getMetaProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postMetaProduction = 
        // loog 'postMetaProduction.request.params', request.params
        // loog 'postMetaProduction.request.body', request.body
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.createMetaProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postMetaProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putMetaProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.updateMetaProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putMetaProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putMetaProductionPackiDiffs = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putMetaProductionPackiDiffs.request.params', request.params, __filename);
            console.log('putMetaProductionPackiDiffs.request.body.options', Object.keys(request.body.options), __filename);
            console.log('putMetaProductionPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
            const options = request.body.options || {};
            (0, meta_1.getMetaProductionObjectById)(request.params.id).then((prevMeta) => {
                console.log('putMetaProductionPackiDiffs.prevPackiFiles', Object.keys(prevMeta.packiFiles), __filename);
                const pm = new packi_1.PackiBuilder(prevMeta.packiFiles);
                pm.applyPatch_ChangesOnly(request.body.packiDiffs);
                return exec_updateMetaProduction(request, response, pm.packiFiles);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putMetaProductionPackiDiffs.getMetaProductionObjectById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.generateMetaProductionByName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_2.generateMetaProduction)(request.params.owner, request.params.name, request.body.metaCtx).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'generateMetaProductionByName.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1MetaProductionController = ApiV1MetaProductionController;
function exec_updateMetaProduction(request, response, packiFiles) {
    (0, meta_1.updateMetaProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(packiFiles)).then(
    // loog 'putMetaProduction.update.result', result
    (result) => {
        (0, meta_1.invalidateCache)(request.params.id);
        (0, sendResponse_1.sendSuccess)(response, result);
    }).catch((err) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updateMetaProduction.updateMetaProduction.error', err);
        (0, sendResponse_1.sendFailure)(response, {
            err: err
        }, 501);
    });
}
//# sourceMappingURL=apiv1meta.js.map