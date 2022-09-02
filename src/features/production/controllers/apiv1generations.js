"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1GenerationsController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1generations.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const wizzi_1 = require("../../wizzi");
const production_1 = require("../../production");
const myname = 'features/production/controllers/generations';
class ApiV1GenerationsController {
    constructor() {
        this.path = '/api/v1/production/generations';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1GenerationsController.initialize');
            this.router.post(`/mtree/:id`, this.mTree);
            this.router.post(`/mtreescript/:id`, this.mTreeBuildupScript);
            this.router.post(`/artifact/:id`, this.generateArtifact);
            this.router.post(`/transform/:id/:transformer`, this.transformModel);
            this.router.post(`/job`, this.executeJob);
            this.router.post(`/wizzify`, this.wizzify);
        };
        this.mTree = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            console.log(myname, 'mTree.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files), __filename);
            production_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.mTree(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'mTree.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, {
                mTreeIttf: result.mTreeIttf
            })).catch((err) => {
                console.log('features.packi.controllers.productions.mTree.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.productions.mTree.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTreeBuildupScript = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            console.log(myname, 'mTreeBuildupScript.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files), __filename);
            production_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.mTreeBuildupScript(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'mTreeBuildupScript.result', result
            result => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('features.packi.controllers.productions.mTreeBuildupScript.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.productions.mTreeBuildupScript.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.generateArtifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            console.log(myname, 'generateArtifact.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files), __filename);
            production_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.generateArtifact(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                generatedArtifact: value
            })).catch((err) => {
                console.log('features.packi.controllers.production.generateArtifact.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.production.generateArtifact.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.transformModel = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const transformer = request.params.transformer;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            console.log(myname, 'mTree.received files', Object.keys(req_files), __filename);
            production_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.transformModel(id, packageProductionSet.packiFiles, packageProductionSet.context, {
                transformer: transformer
            }).then(
            // loog 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                transformedModel: value.transformResult
            })).catch((err) => {
                console.log('features.packi.controllers.production.transformModel.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.production.transformModel.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.executeJob = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            console.log(myname, 'mTree.received files', Object.keys(req_files), __filename);
            production_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog 'features.packi.controllers.production.executeJob.generatedArtifacts', Object.keys(files)
            (fsJson) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const files = yield wizzi_1.WizziFactory.extractGeneratedFiles(fsJson);
                (0, sendResponse_1.sendSuccess)(response, {
                    generatedArtifacts: files
                });
            })).catch((err) => {
                console.log('features.packi.controllers.production.executeJob.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('features.packi.controllers.production.executeJob.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.wizzify = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = request.body.packiFiles;
            if (files) {
                console.log('features.packi.controllers.production.wizzify.received files', Object.keys(files), __filename);
            }
            wizzi_1.wizziProds.wizzify(files).then((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log('features.packi.controllers.production.wizzify.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, {
                    wizzifiedPackiFiles: result
                });
            })).catch((err) => {
                console.log('features.packi.controllers.production.wizzify.execute.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1GenerationsController = ApiV1GenerationsController;
//# sourceMappingURL=apiv1generations.js.map