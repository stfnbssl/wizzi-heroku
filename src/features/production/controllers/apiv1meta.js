"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1MetaProductionController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\apiv1meta.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const meta_1 = require("../api/meta");
const wizzi_1 = require("../../wizzi");
const production_1 = require("../../production");
const myname = 'features/production/controllers/apiv1metaproduction';
class ApiV1MetaProductionController {
    constructor() {
        this.path = '/api/v1/production/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1MetaProductionController.initialize');
            this.router.get('/:owner', this.getMetaProductionList);
            this.router.get('/props/:id', this.getMetaProperties);
            this.router.get('/checkname/:owner/:name', this.getCheckMetaName);
            this.router.get('/:owner/:name', this.getMetaProduction);
            this.router.put('/:id', this.putMetaProduction);
            this.router.post('/:owner/:name', this.postMetaProduction);
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
            return production_1.productionApi.prepareProductionById('meta', request.params.id, '', {}).then((metaProductionSet) => wizzi_1.wizziProds.generateArtifact('properties/index.json.ittf', metaProductionSet.packiFiles, metaProductionSet.context).then((value) => {
                console.log(myname, 'getMetaProperties.generateArtifact.result', value, __filename);
                (0, sendResponse_1.sendSuccess)(response, {
                    meta: JSON.parse(value.artifactContent)
                });
            }).catch((err) => {
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
        this.getCheckMetaName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheckMetaName.request.params', request.params, __filename);
            (0, meta_1.validateMetaProduction)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckMetaName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
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
        this.postMetaProduction = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('postMetaProduction.request.params', request.params, __filename);
            console.log('postMetaProduction.request.body', request.body, __filename);
            (0, meta_1.createMetaProduction)(request.params.owner, request.params.name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
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
    }
}
exports.ApiV1MetaProductionController = ApiV1MetaProductionController;
//# sourceMappingURL=apiv1meta.js.map