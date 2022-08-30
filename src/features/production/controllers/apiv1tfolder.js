"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1TFolderController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1tfolder.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const tfolder_1 = require("../api/tfolder");
const myname = 'features/production/controllers/apiv1tfolder';
class ApiV1TFolderController {
    constructor() {
        this.path = '/api/v1/production/tfolder';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1TFolderController.initialize');
            this.router.get('/:owner', this.getTFolderList);
            this.router.get('/checkname/:owner/:name', this.getCheckTFolderName);
            this.router.get('/:owner/:name', this.getTFolder);
            this.router.put('/:id', this.putTFolder);
            this.router.post('/:owner/:name', this.postTFolder);
        };
        this.getTFolderList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.getListTFolder)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getTFolderList.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckTFolderName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheckTFolderName.request.params', request.params, __filename);
            (0, tfolder_1.validateTFolder)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckTFolderName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('getCheckTFolderName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.getTFolder)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getTFolder.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.createTFolder)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => {
                (0, tfolder_1.invalidateCache)(request.params.owner, request.params.name);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('postTFolder.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.updateTFolder)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => {
                (0, tfolder_1.invalidateCache)(request.params.owner, request.params.name);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('putTFolder.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1TFolderController = ApiV1TFolderController;
//# sourceMappingURL=apiv1tfolder.js.map