"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PluginProductionController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const packi_1 = require("../../packi");
const plugin_1 = require("../api/plugin");
const myname = 'features/production/controllers/apiv1plugin';
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
class ApiV1PluginProductionController {
    constructor() {
        this.path = '/api/v1/production/plugin';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PluginProductionController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getPluginProductions));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckPluginName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPluginProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putPluginProduction));
            this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putPluginProductionPackiDiffs));
            this.router.post("/:post", makeHandlerAwareOfAsyncErrors(this.postPluginProduction));
        };
        this.getPluginProductions = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.getPluginProductionList)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPluginProductions.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckPluginName = 
        // loog 'getCheckPluginName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.validatePluginProduction)(request.params.owner, request.params.name).then(
            // loog 'getCheckPluginName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.getPluginProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPluginProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.createPluginProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'postPluginProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.updatePluginProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putPluginProduction.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPluginProductionPackiDiffs = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putPluginProductionPackiDiffs.request.params', request.params, __filename);
            console.log('putPluginProductionPackiDiffs.request.body.options', Object.keys(request.body.options), __filename);
            console.log('putPluginProductionPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
            const options = request.body.options || {};
            (0, plugin_1.getPluginProductionObjectById)(request.params.id).then((prevPlugin) => {
                console.log('putPluginProductionPackiDiffs.prevPackiFiles', Object.keys(prevPlugin.packiFiles), __filename);
                const pm = new packi_1.PackiBuilder(prevPlugin.packiFiles);
                pm.applyPatch_ChangesOnly(request.body.packiDiffs);
                return exec_updatePluginProduction(request, response, pm.packiFiles);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putPluginProductionPackiDiffs.getPluginProductionObjectById.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PluginProductionController = ApiV1PluginProductionController;
function exec_updatePluginProduction(request, response, packiFiles) {
    (0, plugin_1.updatePluginProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(packiFiles)).then(
    // loog 'putPluginProduction.update.result', result
    (result) => {
        (0, plugin_1.invalidateCache)(request.params.id);
        (0, sendResponse_1.sendSuccess)(response, result);
    }).catch((err) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updatePluginProduction.updatePluginProduction.error', err);
        (0, sendResponse_1.sendFailure)(response, {
            err: err
        }, 501);
    });
}
//# sourceMappingURL=apiv1plugin.js.map