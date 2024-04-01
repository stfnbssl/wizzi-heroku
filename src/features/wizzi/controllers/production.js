"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const path_1 = tslib_1.__importDefault(require("path"));
const wizziProds = tslib_1.__importStar(require("../productions"));
const config_1 = require("../../config");
const context_1 = require("../api/context");
const myname = 'features/wizzi/controller/productions';
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
class ProductionController {
    constructor() {
        this.path = '/api/v1/wizzi/production';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ProductionController.initialize');
            this.router.post("/artifact", makeHandlerAwareOfAsyncErrors(this.artifact));
            this.router.post("/mtree", makeHandlerAwareOfAsyncErrors(this.mTree));
            this.router.post("/mtreescript", makeHandlerAwareOfAsyncErrors(this.mTreeBuildUpScript));
            this.router.post("/mtreescan", makeHandlerAwareOfAsyncErrors(this.mTreeScan));
            this.router.post("/wrapittf", makeHandlerAwareOfAsyncErrors(this.wrapIttfText));
        };
        this.artifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.generateArtifactFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then(generatedArtifact => (0, sendResponse_1.sendSuccess)(response, generatedArtifact)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifactFs', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifactFs'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.generateArtifact(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((generatedArtifact) => (0, sendResponse_1.sendSuccess)(response, generatedArtifact)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.generateArtifactDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((generatedArtifact) => (0, sendResponse_1.sendSuccess)(response, generatedArtifact)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact'
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.resolveContexts', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err,
                    method: 'features/wizzi/controller/productions.handler.artifact.resolveContexts'
                }, 501);
            });
        });
        this.mTree = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then(mTree => (0, sendResponse_1.sendSuccess)(response, {
                        mTree: mTree.mTreeIttf
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeFs', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeFs'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTree(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTree) => (0, sendResponse_1.sendSuccess)(response, {
                        mTree: mTree.mTreeIttf
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTree', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTree'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTree) => (0, sendResponse_1.sendSuccess)(response, {
                        mTree: mTree.mTreeIttf
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeDb', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeDb'
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", '} features/wizzi/controller/productions.handler.mTree.resolveContexts', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err,
                    method: '} features/wizzi/controller/productions.handler.mTree.resolveContexts'
                }, 501);
            });
        });
        this.mTreeBuildUpScript = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeBuildUpScriptFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then(mTreeBuildUpScript => (0, sendResponse_1.sendSuccess)(response, mTreeBuildUpScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptFs', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptFs'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTreeBuildUpScript(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTreeBuildUpScript) => (0, sendResponse_1.sendSuccess)(response, mTreeBuildUpScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScript', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScript'
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeBuildUpScriptDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTreeBuildUpScript) => (0, sendResponse_1.sendSuccess)(response, mTreeBuildUpScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptDb', err);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err,
                            method: 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptDb'
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.resolveContexts', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err,
                    method: 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.resolveContexts'
                }, 501);
            });
        });
        this.mTreeScan = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
            if (artifactRequest.ittfDocument.source == 'fs') {
                wizziProds.scanIttfDocumentFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), rootFolder).then(mTreeScan => (0, sendResponse_1.sendSuccess)(response, {
                    mTreeScan: mTreeScan
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanFs', err);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err,
                        method: 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanFs'
                    }, 501);
                });
            }
            else if (artifactRequest.ittfDocument.source == 'packi') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocument(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, rootFolder).then((mTreeScan) => (0, sendResponse_1.sendSuccess)(response, {
                    mTreeScan: mTreeScan
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScan', err);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err,
                        method: 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScan'
                    }, 501);
                });
            }
            else if (artifactRequest.ittfDocument.source == 'db') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocumentDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, rootFolder).then((mTreeScan) => (0, sendResponse_1.sendSuccess)(response, {
                    mTreeScan: mTreeScan
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanDb', err);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err,
                        method: 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanDb'
                    }, 501);
                });
            }
            else {
                (0, sendResponse_1.sendFailure)(response, {
                    err: {
                        message: 'Invalid artifactRequest.ittfDocument.source ' + artifactRequest.ittfDocument.source
                    }
                }, 501);
            }
        });
        this.wrapIttfText = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return wizziProds.wrapIttfText(request.body.schema, request.body.ittfText).then((wrappedIttfText) => (0, sendResponse_1.sendSuccess)(response, {
                wrappedIttfText: wrappedIttfText
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.wrapIttfText', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err,
                    method: 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.wrapIttfText'
                }, 501);
            });
        });
    }
}
exports.ProductionController = ProductionController;
//# sourceMappingURL=production.js.map