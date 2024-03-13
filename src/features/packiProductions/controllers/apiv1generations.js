"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1GenerationsController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizzi_1 = require("../../wizzi");
const packiProductions_1 = require("../../packiProductions");
const myname = 'features/production/controllers/apiv1generations';
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
class ApiV1GenerationsController {
    constructor() {
        this.path = '/api/v1/production/generations';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1GenerationsController.initialize');
            this.router.post("/mtree/:id", makeHandlerAwareOfAsyncErrors(this.mTree));
            this.router.post("/mtreescript/:id", makeHandlerAwareOfAsyncErrors(this.mTreeBuildupScript));
            this.router.post("/artifact/:id", makeHandlerAwareOfAsyncErrors(this.generateArtifact));
            this.router.post("/transform/:id/:transformer", makeHandlerAwareOfAsyncErrors(this.transformModel));
            this.router.post("/job", makeHandlerAwareOfAsyncErrors(this.executeJob));
            this.router.post("/wizzify", makeHandlerAwareOfAsyncErrors(this.wizzify));
            this.router.post("/codeast", makeHandlerAwareOfAsyncErrors(this.codeAST));
        };
        this.mTree = 
        // loog myname, 'mTree.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            packiProductions_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.mTree(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'mTree.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, {
                mTreeIttf: result.mTreeIttf
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.productions.mTree.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.productions.mTree.prepareProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTreeBuildupScript = 
        // loog myname, 'mTreeBuildupScript.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            packiProductions_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.mTreeBuildupScript(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'mTreeBuildupScript.result', result
            result => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.productions.mTreeBuildupScript.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.productions.mTreeBuildupScript.prepareProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.generateArtifact = 
        // loog myname, 'generateArtifact.id, productionKind,  productionName, files', id, productionKind, productionName, Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            packiProductions_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.generateArtifact(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog myname, 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                generatedArtifact: value
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.generateArtifact.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.generateArtifact.prepareProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.transformModel = 
        // loog myname, 'mTree.received files', Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const id = request.params.id;
            const transformer = request.params.transformer;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            packiProductions_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.loadAndTransformModel(id, packageProductionSet.packiFiles, packageProductionSet.context, {
                transformer: transformer
            }).then(
            // loog 'generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                transformedModel: value.transformResult
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.transformModel.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.transformModel.prepareProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.executeJob = 
        // loog myname, 'mTree.received files', Object.keys(req_files)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const owner = request.session.user.username;
            const req_files = request.body.packiFiles;
            const productionKind = request.body.productionKind;
            const productionName = request.body.productionName;
            packiProductions_1.productionApi.prepareProduction(productionKind, owner, productionName, '', {}).then((packageProductionSet) => wizzi_1.wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then(
            // loog 'features.production.controllers.production.executeJob.generatedArtifacts', Object.keys(files)
            (fsJson) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const files = yield wizzi_1.WizziFactory.extractGeneratedFiles(fsJson);
                (0, sendResponse_1.sendSuccess)(response, {
                    generatedArtifacts: files
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.executeJob.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.executeJob.prepareProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.wizzify = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = request.body.packiFiles;
            // loog 'features.production.controllers.production.wizzify.received files', Object.keys(files)
            if (files) {
            }
            wizzi_1.wizziProds.wizzify(files).then(
            // loog 'features.production.controllers.production.wizzify.result', result
            (result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return (0, sendResponse_1.sendSuccess)(response, {
                    wizzifiedPackiFiles: result
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.wizzify.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.codeAST = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = request.body.packiFiles;
            // loog 'features.production.controllers.production.codeAST.received files', Object.keys(files)
            if (files) {
            }
            wizzi_1.wizziProds.getCodeAST(files).then(
            // loog 'features.production.controllers.production.codeAST.result', result
            (result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return (0, sendResponse_1.sendSuccess)(response, {
                    codeASTPackiFiles: result
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.production.controllers.production.codeAST.execute.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1GenerationsController = ApiV1GenerationsController;
//# sourceMappingURL=apiv1generations.js.map