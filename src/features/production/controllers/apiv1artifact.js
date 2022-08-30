"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1ArtifactProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1artifact.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const artifact_1 = require("../api/artifact");
const myname = 'features/production/controllers/apiv1artifactproduction';
class ApiV1ArtifactProductionController {
    constructor() {
        this.path = '/api/v1/production/artifact';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1ArtifactProductionController.initialize');
            this.router.get('/:owner', this.getArtifactProductionList);
            this.router.get('/checkname/:owner/:name', this.getCheckArtifactName);
            this.router.get('/:owner/:name', this.getArtifactProduction);
            this.router.put('/:id', this.putArtifactProduction);
            this.router.post('/:owner/:name', this.postArtifactProduction);
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
        this.getCheckArtifactName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheckArtifactName.request.params', request.params, __filename);
            (0, artifact_1.validateArtifactProduction)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckArtifactName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
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
            console.log('postArtifactProduction.request.params', request.params, __filename);
            console.log('postArtifactProduction.request.body', request.body, __filename);
            (0, artifact_1.createArtifactProduction)(request.params.owner, request.params.name, request.body.description, request.body.mainIttf, request.body.wizziSchema, JSON.stringify(request.body.packiFiles)).then((result) => {
                console.log('postArtifactProduction.create.result', result, __filename);
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
            console.log('putArtifactProduction.request.params', request.params, __filename);
            console.log('putArtifactProduction.request.body', request.body, __filename);
            (0, artifact_1.updateArtifactProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, request.body.mainIttf, request.body.wizziSchema, JSON.stringify(request.body.packiFiles)).then((result) => {
                console.log('putArtifactProduction.update.result', result, __filename);
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