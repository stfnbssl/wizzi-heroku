"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1TFolderController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1tfolder.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const tfolder_1 = require("../api/tfolder");
const myname = 'features/production/controllers/apiv1tfolder';
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
class ApiV1TFolderController {
    constructor() {
        this.path = '/api/v1/production/tfolder';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1TFolderController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getTFolderList));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getCheckTFolderName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getTFolder));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.putTFolder));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.postTFolder));
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
        this.getCheckTFolderName = 
        // loog 'getCheckTFolderName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.validateTFolder)(request.params.owner, request.params.name).then(
            // loog 'getCheckTFolderName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
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