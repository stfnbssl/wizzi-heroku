"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PluginProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1plugin.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const plugin_1 = require("../api/plugin");
const myname = 'features/production/controllers/apiv1pluginproduction';
class ApiV1PluginProductionController {
    constructor() {
        this.path = '/api/v1/production/plugin';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PluginProductionController.initialize');
            this.router.get('/:owner', this.getPluginProductionList);
            this.router.get('/checkname/:owner/:name', this.getCheckPluginName);
            this.router.get('/:owner/:name', this.getPluginProduction);
            this.router.put('/:id', this.putPluginProduction);
            this.router.post('/:post', this.postPluginProduction);
        };
        this.getPluginProductionList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.getListPluginProduction)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPluginProductionList.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckPluginName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheckPluginName.request.params', request.params, __filename);
            (0, plugin_1.validatePluginProduction)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckPluginName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('getCheckPluginName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.getPluginProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPluginProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.createPluginProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('postPluginProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPluginProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, plugin_1.updatePluginProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('putPluginProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PluginProductionController = ApiV1PluginProductionController;
//# sourceMappingURL=apiv1plugin.js.map