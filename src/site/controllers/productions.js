"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionsController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\productions.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../utils/sendResponse");
const jsesc_1 = tslib_1.__importDefault(require("jsesc"));
const production_1 = require("../../features/production");
class ProductionsController {
    constructor() {
        this.path = '/productions';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ProductionsController.initialize');
            this.router.get('/artifacts', this.artifacts);
            this.router.get('/packages', this.packages);
            this.router.get('/plugins', this.plugins);
            this.router.get('/metas', this.metas);
            this.router.get('/tfolders', this.tfolders);
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
                console.log('artifact productions.error', err, __filename);
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
                console.log('package productions.error', err, __filename);
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
                console.log('plugin productions.error', err, __filename);
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
                console.log('meta productions.error', err, __filename);
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
                console.log('tFolders.error', err, __filename);
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