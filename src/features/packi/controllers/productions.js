"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionsController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const wizzi_1 = require("../../wizzi");
const packiProductions_1 = require("../../packiProductions");
const myname = 'features/packi/controllers/productions';
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
class ProductionsController {
    constructor() {
        this.path = '/api/v1/productions';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
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
            packiProductions_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.mTree(id, result.packiFiles, result.context).then((value) => (0, sendResponse_1.sendSuccess)(response, {
                mTreeIttf: value
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.mTreeBuildupScript = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const req_files = request.body;
            packiProductions_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.mTreeBuildupScript(id, result.packiFiles, result.context).then(value => (0, sendResponse_1.sendSuccess)(response, {
                mTreeBuildupScript: value
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.generateArtifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const req_files = request.body;
            packiProductions_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.generateArtifact(id, result.packiFiles, result.context).then(value => (0, sendResponse_1.sendSuccess)(response, {
                generatedArtifact: value
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.transformModel = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const transformer = request.params.transformer;
            const req_files = request.body;
            packiProductions_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.loadAndTransformModel(id, result.packiFiles, result.context, {
                transformer: transformer
            }).then(value => (0, sendResponse_1.sendSuccess)(response, {
                transformedModel: value.transformResult
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.executeJob = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const req_files = request.body;
            packiProductions_1.artifactApi.prepareGenerationFromWizziJson(req_files).then((result) => wizzi_1.wizziProds.executeJobs(result.packiFiles, result.context).then((fsJson) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const files = yield wizzi_1.WizziFactory.extractGeneratedFiles(fsJson);
                (0, sendResponse_1.sendSuccess)(response, {
                    generatedArtifacts: files
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            }));
        });
        this.wizzify = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const files = request.body;
            wizzi_1.wizziProds.wizzify(files).then((ittfResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return (0, sendResponse_1.sendSuccess)(response, {
                    packiResult: ittfResult
                });
            })).catch(err => (0, sendResponse_1.sendFailure)(response, err, 501));
        });
    }
}
exports.ProductionsController = ProductionsController;
//# sourceMappingURL=productions.js.map