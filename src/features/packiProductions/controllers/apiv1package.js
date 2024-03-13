"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PackageProductionController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const packi_1 = require("../../packi");
const package_1 = require("../api/package");
const package_2 = require("../api/package");
const myname = 'features/production/controllers/apiv1packageproduction';
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
class ApiV1PackageProductionController {
    constructor() {
        this.path = '/api/v1/production/package';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PackageProductionController.initialize');
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckPackageName));
            this.router.get("/meta/:id", makeHandlerAwareOfAsyncErrors(this.getWizziMetaFolder));
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getPackageProductions));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackageProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putPackageProduction));
            this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putPackageProductionPackiDiffs));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postPackageProduction));
        };
        this.getPackageProductions = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getPackageProductionList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackageProductions.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckPackageName = 
        // loog 'getCheckPackageName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.validatePackageProduction)(request.params.owner, request.params.name).then(
            // loog 'getCheckPackageName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getPackageProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackageProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.createPackageProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postPackageProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.updatePackageProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putPackageProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPackageProductionPackiDiffs = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putPackageProductionPackiDiffs.request.params', request.params, __filename);
            console.log('putPackageProductionPackiDiffs.request.body.options', Object.keys(request.body.options), __filename);
            console.log('putPackageProductionPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
            const options = request.body.options || {};
            (0, package_1.getPackageProductionObjectById)(request.params.id).then((prevPackage) => {
                console.log('putPackageProductionPackiDiffs.prevPackiFiles', Object.keys(prevPackage.packiFiles), __filename);
                const pm = new packi_1.PackiBuilder(prevPackage.packiFiles);
                pm.applyPatch_ChangesOnly(request.body.packiDiffs);
                return exec_updatePackageProduction(request, response, pm.packiFiles);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putPackageProductionPackiDiffs.getPackageProductionObjectById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getWizziMetaFolder = 
        // loog 'getWizziMetaFolder.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_2.getWizziMetaFolderById)(request.params.id, {}).then((packiFiles) => (0, sendResponse_1.sendSuccess)(response, packiFiles)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getWizziMetaFolder.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PackageProductionController = ApiV1PackageProductionController;
function exec_updatePackageProduction(request, response, packiFiles) {
    (0, package_1.updatePackageProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(packiFiles)).then(
    // loog 'putPackageProduction.update.result', result
    (result) => {
        (0, package_1.invalidateCache)(request.params.id);
        (0, sendResponse_1.sendSuccess)(response, result);
    }).catch((err) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updatePackageProduction.updatePackageProduction.error', err);
        (0, sendResponse_1.sendFailure)(response, {
            err: err
        }, 501);
    });
}
//# sourceMappingURL=apiv1package.js.map