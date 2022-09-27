"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PackageProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1package.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const package_1 = require("../api/package");
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
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PackageProductionController.initialize');
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getCheckPackageName));
            this.router.get("/meta/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getWizziMetaFolder));
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getPackageProductionList));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getPackageProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.putPackageProduction));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.postPackageProduction));
        };
        this.getPackageProductionList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getListPackageProduction)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPackageProductionList.error', err, __filename);
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
                console.log('getCheckPackageName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getPackageProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPackageProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.createPackageProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('postPackageProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPackageProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.updatePackageProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('putPackageProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getWizziMetaFolder = 
        // loog 'getWizziMetaFolder.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getWizziMetaFolderById)(request.params.id, {}).then((packiFiles) => (0, sendResponse_1.sendSuccess)(response, packiFiles)).catch((err) => {
                console.log('getWizziMetaFolder.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PackageProductionController = ApiV1PackageProductionController;
//# sourceMappingURL=apiv1package.js.map