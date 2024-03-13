"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1ArtifactProductionController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizzi_1 = require("../../wizzi");
const packi_1 = require("../../packi");
const utils_2 = require("../utils");
const artifact_1 = require("../api/artifact");
const myname = 'features/production/controllers/apiv1artifact';
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
class ApiV1ArtifactProductionController {
    constructor() {
        this.path = '/api/v1/production/artifact';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1ArtifactProductionController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getArtifactProductions));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckArtifactName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getArtifactProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putArtifactProduction));
            this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putArtifactProductionPackiDiffs));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postArtifactProduction));
        };
        this.getArtifactProductions = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.getArtifactProductionList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getArtifactProductions.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckArtifactName = 
        // loog 'getCheckArtifactName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.validateArtifactProduction)(request.params.owner, request.params.name).then(
            // loog 'getCheckArtifactName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getArtifactProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.getArtifactProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getArtifactProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postArtifactProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.createArtifactProduction)(request.params.owner, request.params.name, request.body.description, request.body.mainIttf, request.body.wizziSchema, JSON.stringify(request.body.packiFiles)).then(
            // loog 'postArtifactProduction.create.result', result
            (result) => {
                (0, artifact_1.invalidateCache)(request.params.owner, request.params.name);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postArtifactProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putArtifactProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putArtifactProduction.request.params', request.params, __filename);
            console.log('putArtifactProduction.request.body', Object.keys(request.body), __filename);
            if (request.body.packiFiles) {
                console.log('putArtifactProduction.request.body.packiFiles', Object.keys(request.body.packiFiles), __filename);
            }
            const options = request.body.options || {};
            if (options.wizzify) {
                wizzi_1.wizziProds.wizzify(request.body.packiFiles).then((resultPackiFiles) => {
                    console.log('putArtifactProduction.wizzify.resultPackiFiles', Object.keys(resultPackiFiles), __filename);
                    return exec_updateArtifactProduction(request, response, resultPackiFiles);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'putArtifactProduction.wizzify.error', err);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }
            else if (options.merge) {
                (0, artifact_1.getArtifactProductionObjectById)(request.params.id).then((prevArtifact) => {
                    const resultPackiFiles = (0, utils_2.mergePackiFiles)(prevArtifact.packiFiles, request.body.packiFiles);
                    console.log('putArtifactProduction.merge.resultPackiFiles', Object.keys(resultPackiFiles), __filename);
                    return exec_updateArtifactProduction(request, response, resultPackiFiles);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'putArtifactProduction.merge.getArtifactProductionById.error', err);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }
            else {
                exec_updateArtifactProduction(request, response, request.body.packiFiles);
            }
        });
        this.putArtifactProductionPackiDiffs = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putArtifactProductionPackiDiffs.request.params', request.params, __filename);
            console.log('putArtifactProductionPackiDiffs.request.body.options', Object.keys(request.body.options), __filename);
            console.log('putArtifactProductionPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
            const options = request.body.options || {};
            (0, artifact_1.getArtifactProductionObjectById)(request.params.id).then((prevArtifact) => {
                console.log('putArtifactProductionPackiDiffs.prevPackiFiles', Object.keys(prevArtifact.packiFiles), __filename);
                const pm = new packi_1.PackiBuilder(prevArtifact.packiFiles);
                pm.applyPatch_ChangesOnly(request.body.packiDiffs);
                return exec_updateArtifactProduction(request, response, pm.packiFiles);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putArtifactProductionPackiDiffs.getArtifactProductionObjectById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1ArtifactProductionController = ApiV1ArtifactProductionController;
function exec_updateArtifactProduction(request, response, packiFiles) {
    (0, artifact_1.updateArtifactProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, request.body.mainIttf, request.body.wizziSchema, JSON.stringify(packiFiles)).then(
    // loog 'putArtifactProduction.update.result', result
    (result) => {
        (0, artifact_1.invalidateCache)(request.params.id);
        (0, sendResponse_1.sendSuccess)(response, result);
    }).catch((err) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updateArtifactProduction.updateArtifactProduction.error', err);
        (0, sendResponse_1.sendFailure)(response, {
            err: err
        }, 501);
    });
}
//# sourceMappingURL=apiv1artifact.js.map