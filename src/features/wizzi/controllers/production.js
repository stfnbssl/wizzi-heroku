"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\wizzi\controllers\production.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const path_1 = tslib_1.__importDefault(require("path"));
const wizziProds = tslib_1.__importStar(require("../productions"));
const config_1 = require("../../config");
const context_1 = require("../api/context");
const myname = 'features/wizzi/controller/productions';
class ProductionController {
    constructor() {
        this.path = '/api/v1/wizzi/production';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ProductionController.initialize');
            this.router.post('/artifact', this.artifact);
            this.router.post('/mtree', this.mTree);
            this.router.post('/mtreescript', this.mTreeBuildupScript);
            this.router.post('/mtreescan', this.mTreeScan);
            this.router.post('/wrapittf', this.wrapIttfText);
        };
        this.artifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            console.log(myname + '.handler.artifact.received request (keys)', Object.keys(artifactRequest), __filename);
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                console.log(myname, 'handler.artifact.resolvedContext', Object.keys(context), __filename);
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.generateArtifactFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then((generatedArtifact) => {
                        console.log(myname, 'generateArtifactFs.result', generatedArtifact, __filename);
                        (0, sendResponse_1.sendSuccess)(response, generatedArtifact);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifactFs.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.generateArtifact(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((generatedArtifact) => {
                        console.log(myname, 'generateArtifact.result', generatedArtifact, __filename);
                        (0, sendResponse_1.sendSuccess)(response, generatedArtifact);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.generateArtifactDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((generatedArtifact) => {
                        console.log(myname, 'generateArtifactDb.result', generatedArtifact, __filename);
                        (0, sendResponse_1.sendSuccess)(response, generatedArtifact);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                console.log('features/wizzi/controller/productions.handler.artifact.resolveContexts.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTree = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            console.log(myname + '.handler.mTree.received request (keys)', Object.keys(artifactRequest), __filename);
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                console.log(myname, 'handler.mTree.resolvedContext', Object.keys(context), __filename);
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then((mTree) => {
                        console.log(myname, '.handle.mTreeFs.result', mTree.mTreeIttf, __filename);
                        (0, sendResponse_1.sendSuccess)(response, {
                            mTree: mTree.mTreeIttf
                        });
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeFs.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTree(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTree) => {
                        console.log(myname, '.handle.mTree.result', mTree.mTreeIttf, __filename);
                        (0, sendResponse_1.sendSuccess)(response, {
                            mTree: mTree.mTreeIttf
                        });
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTree.wizziProds.mTree.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTree) => {
                        console.log(myname, '.handle.mTreeDb.result', mTree.mTreeIttf, __filename);
                        (0, sendResponse_1.sendSuccess)(response, {
                            mTree: mTree.mTreeIttf
                        });
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeDb.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                console.log('} features/wizzi/controller/productions.handler.mTree.resolveContexts.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTreeBuildupScript = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            console.log(myname + '.handler.mTreeBuildupScript.received request (keys)', Object.keys(artifactRequest), __filename);
            (0, context_1.resolveContexts)(artifactRequest.contextItems).then((context) => {
                console.log(myname, 'handler.mTreeBuildupScript.resolvedContext', Object.keys(context), __filename);
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeBuildupScriptFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), context).then((mTreeBuildupScript) => {
                        console.log(myname, '.handle.mTreeBuildupScriptFs.result', mTreeBuildupScript, __filename);
                        (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTreeBuildupScript.wizziProds.mTreeBuildupScriptFs.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTreeBuildupScript(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then((mTreeBuildupScript) => {
                        console.log(myname, '.handle.mTreeBuildupScript.result', mTreeBuildupScript, __filename);
                        (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTreeBuildupScript.wizziProds.mTreeBuildupScript.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeBuildupScriptDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then((mTreeBuildupScript) => {
                        console.log(myname, '.handle.mTreeBuildupScriptDb.result', mTreeBuildupScript, __filename);
                        (0, sendResponse_1.sendSuccess)(response, mTreeBuildupScript);
                    }).catch((err) => {
                        console.log('features/wizzi/controller/productions.handler.mTreeBuildupScript.wizziProds.mTreeBuildupScriptDb.error', err, __filename);
                        (0, sendResponse_1.sendFailure)(response, {
                            err: err
                        }, 501);
                    });
                }
            }).catch((err) => {
                console.log('features/wizzi/controller/productions.handler.mTreeBuildupScript.resolveContexts.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.mTreeScan = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const artifactRequest = request.body;
            console.log(myname + '.handler.mTreeScan.received request (keys)', Object.keys(artifactRequest), __filename);
            var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
            if (artifactRequest.ittfDocument.source == 'fs') {
                wizziProds.scanIttfDocumentFs(path_1.default.join(config_1.config.ittfPath, artifactRequest.ittfDocument.path), rootFolder).then((mTreeScan) => {
                    console.log(myname, '.handle.mTreeScanFs.result', Object.keys(mTreeScan), __filename);
                    (0, sendResponse_1.sendSuccess)(response, {
                        mTreeScan: mTreeScan
                    });
                }).catch((err) => {
                    console.log('features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanFs.error', err, __filename);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }
            else if (artifactRequest.ittfDocument.source == 'packi') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocument(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, rootFolder).then((mTreeScan) => {
                    console.log(myname, '.handle.mTreeScan.result', Object.keys(mTreeScan), __filename);
                    (0, sendResponse_1.sendSuccess)(response, {
                        mTreeScan: mTreeScan
                    });
                }).catch((err) => {
                    console.log('features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScan.error', err, __filename);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }
            else if (artifactRequest.ittfDocument.source == 'db') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocumentDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, rootFolder).then((mTreeScan) => {
                    console.log(myname, '.handle.mTreeScanDb.result', Object.keys(mTreeScan), __filename);
                    (0, sendResponse_1.sendSuccess)(response, {
                        mTreeScan: mTreeScan
                    });
                }).catch((err) => {
                    console.log('features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanDb.error', err, __filename);
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
            return wizziProds.wrapIttfText(request.body.schema, request.body.ittfText).then((wrappedIttfText) => {
                console.log(myname, '.handle.wrapIttfText.result', wrappedIttfText, __filename);
                (0, sendResponse_1.sendSuccess)(response, {
                    wrappedIttfText: wrappedIttfText
                });
            }).catch((err) => {
                console.log('features/wizzi/controller/productions.handler.mTreeScan.wizziProds.wrapIttfText.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ProductionController = ProductionController;
//# sourceMappingURL=production.js.map