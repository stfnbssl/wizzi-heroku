"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PackageProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1package.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const package_1 = require("../api/package");
const myname = 'features/production/controllers/apiv1packageproduction';
class ApiV1PackageProductionController {
    constructor() {
        this.path = '/api/v1/production/package';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PackageProductionController.initialize');
            this.router.get('/:owner', this.getPackageProductionList);
            this.router.get('/checkname/:owner/:name', this.getCheckPackageName);
            this.router.get('/:owner/:name', this.getPackageProduction);
            this.router.put('/:id', this.putPackageProduction);
            this.router.post('/:owner/:name', this.postPackageProduction);
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
        this.getCheckPackageName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheckPackageName.request.params', request.params, __filename);
            (0, package_1.validatePackageProduction)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckPackageName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
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
    }
}
exports.ApiV1PackageProductionController = ApiV1PackageProductionController;
//# sourceMappingURL=apiv1package.js.map