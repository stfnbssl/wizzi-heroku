"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveContexts = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\wizzi\api\context.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const wizzi_1 = require("wizzi");
const config_1 = require("../../config");
const wizziProds = tslib_1.__importStar(require("../productions"));
const myname = 'features.wizzi.api.context';
function resolveContexts(contextItems) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const promises = [];
        contextItems.map(contextItem => promises.push(new Promise((resolve, reject) => resolveContext(contextItem).then((context) => resolve({
            name: contextItem.name,
            value: context
        })).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContexts.resolveContext.error', err);
            return reject(err);
        }))));
        return new Promise((resolve, reject) => Promise.all(promises).then((items) => {
            var context = {};
            items.map((value) => {
                if (value.name && value.name.length > 0) {
                    context[value.name] = value.value;
                }
                else {
                    context = Object.assign({}, context, value.value);
                }
            });
            resolve(context);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContexts.Promise.all.error', err);
            return reject(err);
        }));
    });
}
exports.resolveContexts = resolveContexts;
function resolveContext(contextItem) {
    if (contextItem.source == 'json-fsIttf') {
        return new Promise(
        // TODO check contextItem.path.endsWith('.json.ittf')
        (resolve, reject) => wizziProds.generateArtifactFs(path_1.default.join(config_1.config.ittfPath, contextItem.path)).then((value) => resolve(value)).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.generateArtifactFs.error', err);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'json-packiIttf') {
        return new Promise((resolve, reject) => wizziProds.generateArtifact(contextItem.mainIttf, contextItem.packiFiles).then((value) => resolve(value)).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.generateArtifact.error', err);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'json-dbIttf') {
        throw new Error('ContextItem source not yet implemented: ' + contextItem.source);
    }
    else if (contextItem.source == 'json-fsFile') {
        return new Promise((resolve, reject) => {
            const json = wizzi_1.file.readJSON(contextItem.path);
            resolve(json);
        });
    }
    else if (contextItem.source == 'json-value') {
        return new Promise(resolve => resolve(contextItem.value));
    }
    else if (contextItem.source == 'model-fsIttf') {
        return new Promise((resolve, reject) => wizziProds.loadModelFs(path_1.default.join(config_1.config.ittfPath, contextItem.path), {}).then((value) => resolve(value)).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.loadModelFs.error', err);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'model-packiIttf') {
        return new Promise((resolve, reject) => wizziProds.loadModel(contextItem.mainIttf, contextItem.packiFiles).then((value) => resolve(value)).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.loadModel.error', err);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'model-dbIttf') {
        throw new Error('ContextItem source not yet implemented: ' + contextItem.source);
    }
    else {
        throw new Error('Invalid contextItem source: ' + contextItem.source);
    }
}
//# sourceMappingURL=context.js.map