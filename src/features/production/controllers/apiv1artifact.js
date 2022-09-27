"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1ArtifactProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1artifact.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const artifact_1 = require("../api/artifact");
const myname = 'features/production/controllers/apiv1artifactproduction';
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
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1ArtifactProductionController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getArtifactProductionList));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getCheckArtifactName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getArtifactProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.putArtifactProduction));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.postArtifactProduction));
        };
        this.getArtifactProductionList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.getListArtifactProduction)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getArtifactProductionList.error', err, __filename);
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
                console.log('getCheckArtifactName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getArtifactProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.getArtifactProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getArtifactProduction.error', err, __filename);
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
                console.log('postArtifactProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putArtifactProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, artifact_1.updateArtifactProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, request.body.mainIttf, request.body.wizziSchema, JSON.stringify(request.body.packiFiles)).then(
            // loog 'putArtifactProduction.update.result', result
            (result) => {
                (0, artifact_1.invalidateCache)(request.params.owner, request.params.name);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('putArtifactProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1ArtifactProductionController = ApiV1ArtifactProductionController;
//# sourceMappingURL=apiv1artifact.js.map