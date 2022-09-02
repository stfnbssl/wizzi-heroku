"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionsController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\packi\controllers\productions.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const wizzi_1 = require("../../wizzi");
const production_1 = require("../../production");
const myname = 'features/packi/controllers/productions';
class ProductionsController {
    constructor() {
        this.path = '/api/v1/productions';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ProductionsController.initialize');
            this.router.post(`/mtree/:id`, this.mTree);
            this.router.post(`/mtreescript/:id`, this.mTreeBuildupScript);
            this.router.post(`/artifact/:id`, this.generateArtifact);
            this.router.post(`/transform/:id/:transformer`, this.transformModel);
            this.router.post(`/job`, this.executeJob);
            this.router.post(`/wizzify`, this.wizzify);
        };
        this.mTree = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const req_files = request.body;
            console.log(myname, 'mTree.received files', Object.keys(req_files), __filename);
            production_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.mTree(id, result.packiFiles, result.context).then(
            // loog myname, 'mTree.result', value
            (value) => (0, sendResponse_1.sendSuccess)(response, {
                mTreeIttf: value
            })).catch((err) => {
                console.log('features.packi.controllers.productions.mTree.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.mTreeBuildupScript = 
        // loog myname, 'mTreeBuildupScript.received files', Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const req_files = request.body;
            production_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.mTreeBuildupScript(id, result.packiFiles, result.context).then(
            // loog myname, 'mTreeBuildupScript.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                mTreeBuildupScript: value
            })).catch((err) => {
                console.log('features.packi.controllers.productions.mTreeBuildupScript.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.generateArtifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const req_files = request.body;
            console.log(myname, 'generateArtifact.received files', Object.keys(req_files), __filename);
            production_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.generateArtifact(id, result.packiFiles, result.context).then(
            // loog myname, 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                generatedArtifact: value
            })).catch((err) => {
                console.log('features.packi.controllers.production.generateArtifact.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.production.prepareGenerationPackiFiles.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.transformModel = 
        // loog myname, 'transformModel.received files', Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const transformer = request.params.transformer;
            const req_files = request.body;
            production_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.transformModel(id, result.packiFiles, result.context, {
                transformer: transformer
            }).then(
            // loog 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                transformedModel: value.transformResult
            })).catch((err) => {
                console.log('features.packi.controllers.production.transformModel.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.executeJob = 
        // loog 'ProductionsController.executeJob.received files', Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const req_files = request.body;
            production_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.executeJobs(result.packiFiles, result.context).then(
            // loog 'features.packi.controllers.production.executeJob.generatedArtifacts', Object.keys(files)
            (fsJson) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const files = yield wizzi_1.WizziFactory.extractGeneratedFiles(fsJson);
                (0, sendResponse_1.sendSuccess)(response, {
                    generatedArtifacts: files
                });
            })).catch((err) => {
                console.log('features.packi.controllers.production.executeJob.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.wizzify = 
        // loog 'wizzify.received files', Object.keys(files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const files = request.body;
            wizzi_1.wizziProds.wizzify(files).then(
            // loog 'features.packi.controllers.production.wizzify.ittfResult', ittfResult
            (ittfResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return (0, sendResponse_1.sendSuccess)(response, {
                    packiResult: ittfResult
                });
            })).catch((err) => {
                console.log('features.packi.controllers.production.wizzify.err', err, __filename);
                (0, sendResponse_1.sendFailure)(response, err, 501);
            });
        });
    }
}
exports.ProductionsController = ProductionsController;
//# sourceMappingURL=productions.js.map