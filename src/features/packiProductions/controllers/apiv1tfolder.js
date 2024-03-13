"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1TFolderController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const packi_1 = require("../../packi");
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
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1TFolderController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getTFolders));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckTFolderName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getTFolder));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putTFolder));
            this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putTFolderPackiDiffs));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postTFolder));
        };
        this.getTFolders = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.getTFolderList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getTFolders.error', err);
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
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, tfolder_1.getTFolder)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getTFolder.error', err);
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
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postTFolder.error', err);
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
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putTFolder.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putTFolderPackiDiffs = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putTFolderPackiDiffs.request.params', request.params, __filename);
            console.log('putTFolderPackiDiffs.request.body.options', Object.keys(request.body.options), __filename);
            console.log('putTFolderPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
            const options = request.body.options || {};
            (0, tfolder_1.getTFolderObjectById)(request.params.id).then((prevTFolder) => {
                console.log('putTFolderPackiDiffs.prevPackiFiles', Object.keys(prevTFolder.packiFiles), __filename);
                const pm = new packi_1.PackiBuilder(prevTFolder.packiFiles);
                pm.applyPatch_ChangesOnly(request.body.packiDiffs);
                return exec_updateTFolder(request, response, pm.packiFiles);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putTFolderPackiDiffs.getTFolderObjectById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1TFolderController = ApiV1TFolderController;
function exec_updateTFolder(request, response, packiFiles) {
    (0, tfolder_1.updateTFolder)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(packiFiles)).then(
    // loog 'putTFolder.update.result', result
    (result) => {
        (0, tfolder_1.invalidateCache)(request.params.id);
        (0, sendResponse_1.sendSuccess)(response, result);
    }).catch((err) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updateTFolder.updateTFolder.error', err);
        (0, sendResponse_1.sendFailure)(response, {
            err: err
        }, 501);
    });
}
//# sourceMappingURL=apiv1tfolder.js.map