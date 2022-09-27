"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1MetaProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1meta.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const meta_1 = require("../api/meta");
const wizzi_1 = require("../../wizzi");
const production_1 = require("../../production");
const myname = 'features/production/controllers/apiv1metaproduction';
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
class ApiV1MetaProductionController {
    constructor() {
        this.path = '/api/v1/production/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1MetaProductionController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getMetaProductionList));
            this.router.get("/props/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getMetaProperties));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getCheckMetaName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getMetaProduction));
            this.router.put("/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.putMetaProduction));
            this.router.post("'/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.postMetaProduction));
            this.router.post("'/generate/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.generateMetaProductionByName));
        };
        this.getMetaProductionList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getListMetaProduction)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => {
                if (result.ok) {
                    const items = [];
                    var i, i_items = result.item, i_len = result.item.length, meta;
                    for (i = 0; i < i_len; i++) {
                        meta = result.item[i];
                        items.push({
                            id: meta.id,
                            owner: meta.owner,
                            name: meta.name,
                            description: meta.description
                        });
                    }
                    (0, sendResponse_1.sendSuccess)(response, items);
                }
                else {
                    console.log('getMetaProductionList.error', result, __filename);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: result
                    }, 501);
                }
            }).catch((err) => {
                console.log('getMetaProductionList.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getMetaProperties = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.productionApi.prepareProductionById('meta', request.params.id, '', {}).then((metaProductionSet) => wizzi_1.wizziProds.generateArtifact('properties/index.json.ittf', metaProductionSet.packiFiles, metaProductionSet.context).then(
            // loog myname, 'getMetaProperties.generateArtifact.result', value
            value => (0, sendResponse_1.sendSuccess)(response, {
                meta: JSON.parse(value.artifactContent)
            })).catch((err) => {
                console.log('features.packi.controllers.production.generateArtifact.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('getMetaProperties.prepareProductionById.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckMetaName = 
        // loog 'getCheckMetaName.request.params', request.params
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.validateMetaProduction)(request.params.owner, request.params.name).then(
            // loog 'getCheckMetaName.result', result
            (result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getCheckMetaName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getMetaProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getMetaProduction)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getMetaProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postMetaProduction = 
        // loog 'postMetaProduction.request.params', request.params
        // loog 'postMetaProduction.request.body', request.body
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.createMetaProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('postMetaProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putMetaProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.updateMetaProduction)(request.params.id, request.body.owner, request.body.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('putMetaProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.generateMetaProductionByName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.generateMetaProduction)(request.params.owner, request.params.name, request.body.cliCtx).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('generateMetaProductionByName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1MetaProductionController = ApiV1MetaProductionController;
//# sourceMappingURL=apiv1meta.js.map