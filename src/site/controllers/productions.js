"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionsController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\productions.ts.ittf
*/
const express_1 = require("express");
const index_1 = require("../../middlewares/index");
const sendResponse_1 = require("../../utils/sendResponse");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils");
const jsesc_1 = tslib_1.__importDefault(require("jsesc"));
const production_1 = require("../../features/production");
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
class ProductionsController {
    constructor() {
        this.path = '/productions';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ProductionsController.initialize');
            this.router.get("/artifacts", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.artifacts));
            this.router.get("/packages", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.packages));
            this.router.get("/plugins", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.plugins));
            this.router.get("/metas", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.metas));
            this.router.get("/tfolders", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.tfolders));
        };
        this.artifacts = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.artifactApi.getListArtifactProduction().then(result => response.render('wizzi/productions/artifacts.html.ittf', {
                title: 'Artifact productions · Wizzi',
                artifacts: result.item,
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                    data: {
                        type: 'success',
                        formName: 'ListArtifactProduction',
                        formData: {
                            artifacts: result.item
                        }
                    },
                    queryParams: {}
                }, {
                    quotes: 'double',
                    isScriptContext: true
                })}`
            })).catch((err) => {
                console.log("[31m%s[0m", 'artifact productions.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
        this.packages = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.packageApi.getListPackageProduction().then(result => response.render('wizzi/productions/packages.html.ittf', {
                title: 'Package productions · Wizzi',
                packages: result.item,
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                    data: {
                        type: 'success',
                        formName: 'ListPackageProduction',
                        formData: {
                            packages: result.item
                        }
                    },
                    queryParams: {}
                }, {
                    quotes: 'double',
                    isScriptContext: true
                })}`
            })).catch((err) => {
                console.log("[31m%s[0m", 'package productions.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
        this.plugins = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.pluginApi.getListPluginProduction().then(result => response.render('wizzi/productions/plugins.html.ittf', {
                title: 'Plugin productions · Wizzi',
                plugins: result.item,
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                    data: {
                        type: 'success',
                        formName: 'ListPluginProduction',
                        formData: {
                            plugins: result.item
                        }
                    },
                    queryParams: {}
                }, {
                    quotes: 'double',
                    isScriptContext: true
                })}`
            })).catch((err) => {
                console.log("[31m%s[0m", 'plugin productions.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
        this.metas = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.metaApi.getListMetaProduction().then(result => response.render('wizzi/productions/metas.html.ittf', {
                title: 'Meta productions · Wizzi',
                metas: result.item,
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                    data: {
                        type: 'success',
                        formName: 'ListMetaProduction',
                        formData: {
                            metas: result.item
                        }
                    },
                    queryParams: {}
                }, {
                    quotes: 'double',
                    isScriptContext: true
                })}`
            })).catch((err) => {
                console.log("[31m%s[0m", 'meta productions.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
        this.tfolders = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return production_1.tFolderApi.getListTFolder().then(result => response.render('wizzi/productions/tfolders.html.ittf', {
                title: 'tFolder · Wizzi',
                tfolders: result.item,
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                    data: {
                        type: 'success',
                        formName: 'ListTFolder',
                        formData: {
                            tfolders: result.item
                        }
                    },
                    queryParams: {}
                }, {
                    quotes: 'double',
                    isScriptContext: true
                })}`
            })).catch((err) => {
                console.log("[31m%s[0m", 'tFolders.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
    }
}
exports.ProductionsController = ProductionsController;
//# sourceMappingURL=productions.js.map