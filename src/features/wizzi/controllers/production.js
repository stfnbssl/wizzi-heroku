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
            this.router.post("/mtreescript", makeHandlerAwareOfAsyncErrors(this.mTreeBuildupScript));
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
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.generateArtifact(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((generatedArtifact) => (0, sendResponse_1.sendSuccess)(response, generatedArtifact)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.generateArtifactDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((generatedArtifact) => (0, sendResponse_1.sendSuccess)(response, generatedArtifact)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
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
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTree(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTree) => (0, sendResponse_1.sendSuccess)(response, {
                        mTree: mTree.mTreeIttf
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTree) => (0, sendResponse_1.sendSuccess)(response, {
                        mTree: mTree.mTreeIttf
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTreeBuildupScript = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeBuildupScriptFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then(mTreeBuildupScript => (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTreeBuildupScript(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTreeBuildupScript) => (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeBuildupScriptDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTreeBuildupScript) => (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript)).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
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
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
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
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
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
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ProductionController = ProductionController;
//# sourceMappingURL=production.js.map