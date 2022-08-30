"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveContexts = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\wizzi\api\context.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const wizzi_1 = require("wizzi");
const config_1 = require("../../config");
const wizziProds = tslib_1.__importStar(require("../productions"));
const myname = '';
function resolveContexts(contextItems) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const promises = [];
        contextItems.map(contextItem => promises.push(new Promise((resolve, reject) => resolveContext(contextItem).then((context) => {
            console.log(myname + 'resolveContext.resolved', contextItem.name, Object.keys(context), __filename);
            resolve({
                name: contextItem.name,
                value: context
            });
        }).catch((err) => {
            console.log('.resolveContexts.resolveContext.error', err, __filename);
            return reject(err);
        }))));
        console.log(myname + '.resolveContexts.promises', promises.length, __filename);
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
            console.log('.resolveContexts.Promise.all.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.resolveContexts = resolveContexts;
function resolveContext(contextItem) {
    if (contextItem.source == 'json-fsIttf') {
        return new Promise(
        // TODO check contextItem.path.endsWith('.json.ittf')
        (resolve, reject) => wizziProds.generateArtifactFs(path_1.default.join(config_1.config.ittfPath, contextItem.path)).then((value) => {
            console.log(myname + '.resolveContext', contextItem.source, 'path', contextItem.path, Object.keys(value), __filename);
            resolve(value);
        }).catch((err) => {
            console.log('.resolveContext.wizziProds.generateArtifactFs.error', err, __filename);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'json-packiIttf') {
        return new Promise((resolve, reject) => wizziProds.generateArtifact(contextItem.mainIttf, contextItem.packiFiles).then((value) => {
            console.log(myname + '.resolveContext', contextItem.source, 'mainIttf', contextItem.mainIttf, Object.keys(value), __filename);
            resolve(value);
        }).catch((err) => {
            console.log('.resolveContext.wizziProds.generateArtifact.error', err, __filename);
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
        return new Promise((resolve, reject) => wizziProds.loadModelFs(path_1.default.join(config_1.config.ittfPath, contextItem.path), {}).then((value) => {
            console.log(myname + '.resolveContext', contextItem.source, 'path', contextItem.path, Object.keys(value), __filename);
            resolve(value);
        }).catch((err) => {
            console.log('.resolveContext.wizziProds.loadModelFs.error', err, __filename);
            return reject(err);
        }));
    }
    else if (contextItem.source == 'model-packiIttf') {
        return new Promise((resolve, reject) => wizziProds.loadModel(contextItem.mainIttf, contextItem.packiFiles).then((value) => {
            console.log(myname + '.resolveContext', 'mainIttf', contextItem.mainIttf, Object.keys(value), __filename);
            resolve(value);
        }).catch((err) => {
            console.log('.resolveContext.wizziProds.loadModel.error', err, __filename);
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