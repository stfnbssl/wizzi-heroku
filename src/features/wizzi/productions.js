"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSiteJsonModel = exports.getCodeAST = exports.getCodeASTFs = exports.getCheatsheet = exports.getCheatsheetList = exports.wizzify = exports.wizzifyFs = exports.packiFilesToFolderFs = exports.folderFsToPackiFiles = exports.folderBrowseToPackiFiles = exports.scanIttfDocumentDb = exports.scanIttfFolder = exports.scanIttfDocumentFs = exports.scanIttfDocument = exports.inferAndLoadContextFs = exports.inferAndLoadContextJson = exports.executeJobFs = exports.executeJobs = exports.executeJob = exports.metaGenerate = exports.loadAndTransformModelFs = exports.transformModel = exports.loadAndTransformModel = exports.generateWizziModelTypes = exports.generateFolderArtifactsFs = exports.generateFolderArtifacts = exports.generateArtifactDb = exports.generateArtifactFs = exports.generateArtifact = exports.wrapIttfText = exports.mTreeDb = exports.mTreeFs = exports.mTree = exports.mTreeBuildUpScriptDb = exports.mTreeBuildUpScriptFs = exports.mTreeBuildUpScript = exports.loadModelFs = exports.loadModel = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\wizzi\productions.ts.ittf
    utc time: Tue, 02 Apr 2024 09:03:02 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const json_stringify_safe_1 = tslib_1.__importDefault(require("json-stringify-safe"));
const utils_1 = require("@wizzi/utils");
const env_1 = require("../config/env");
const config_1 = require("../config");
const wizziMaps = tslib_1.__importStar(require("./maps"));
const factory_1 = require("./factory");
const myname = 'features/wizzi/productions';
function loadModel(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // TODO catch error
        (resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.loadModel',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            let jsonwf = {};
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            jsonwf.wf.loadModel(ittfDocumentUri, {
                mTreeBuildUpContext: context
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        }));
    });
}
exports.loadModel = loadModel;
function loadModelFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const _options = options || {};
        return new Promise(
        // TODO catch error
        (resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemaName = wizziMaps.schemaFromFilePath(filePath);
            if (!schemaName) {
                return reject('File is not a known ittf document: ' + filePath);
            }
            const plugins = _options.pluginsBaseFolder && _options.plugins ? {
                pluginsBaseFolder: _options.pluginsBaseFolder,
                items: _options.plugins
            } : null;
            const wf = yield (0, factory_1.createFilesystemFactory)(plugins, null, {});
            wf.loadModel(schemaName, filePath, {
                mTreeBuildUpContext: context
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        }));
    });
}
exports.loadModelFs = loadModelFs;
function loadModelInternal(wf, filePath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemaName = wizziMaps.schemaFromFilePath(filePath);
            if (!schemaName) {
                return reject('File is not a known ittf document: ' + filePath);
            }
            wf.loadModel(schemaName, filePath, {
                mTreeBuildUpContext: context
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        }));
    });
}
function mTreeBuildUpScript(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // TODO catch error
        (resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.mTreeBuildUpScript',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            jsonwf.wf.loadMTreeBuildUpScript(ittfDocumentUri, context, (err, buildUpScript) => {
                if (err) {
                    return reject(err);
                }
                resolve(buildUpScript);
            });
        }));
    });
}
exports.mTreeBuildUpScript = mTreeBuildUpScript;
function mTreeBuildUpScriptFs(filePath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.mTreeBuildUpScriptFs not yet implemented');
    });
}
exports.mTreeBuildUpScriptFs = mTreeBuildUpScriptFs;
function mTreeBuildUpScriptDb(owner, name, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.mTreeBuildUpScriptDB not yet implemented');
    });
}
exports.mTreeBuildUpScriptDb = mTreeBuildUpScriptDb;
function mTree(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // TODO catch error
        (resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.mTree',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            jsonwf.wf.loadMTree(ittfDocumentUri, context, (err, mTree) => {
                if (err) {
                    return reject(err);
                }
                resolve({
                    mTree: mTree,
                    mTreeIttf: mTree.toIttf()
                });
            });
        }));
    });
}
exports.mTree = mTree;
function mTreeFs(ittfDocumentUri, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        context = context || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wf = yield (0, factory_1.createFilesystemFactory)();
            wf.loadMTree(ittfDocumentUri, context, (err, mTree) => {
                if (err) {
                    return reject(err);
                }
                resolve({
                    mTree: mTree,
                    mTreeIttf: mTree.toIttf()
                });
            });
        }));
    });
}
exports.mTreeFs = mTreeFs;
function mTreeDb(owner, name, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.mTreeDb not yet implemented');
    });
}
exports.mTreeDb = mTreeDb;
function wrapIttfText(schema, ittftext, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        context = context || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mainIttf = 'index.' + schema + '.ittf';
            const packiFiles = {
                [mainIttf]: {
                    type: 'CODE',
                    contents: ittftext
                }
            };
            mTree(mainIttf, packiFiles, context).then((result) => {
                const requiredRoot = wizziMaps.ittfRootFromSchema(schema);
                if (requiredRoot == 'any' || result.mTree.nodes[0].n == requiredRoot) {
                    resolve(ittftext);
                }
                else {
                    const wrapperNode = wizziMaps.wrapperForSchema(schema);
                    wrapperNode.children.push(result.mTree.nodes[0]);
                    resolve(result.mTree.toIttf(wrapperNode));
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizzi.productions.wrapIttfText.mTree.error', err);
                return reject(err);
            });
        }));
    });
}
exports.wrapIttfText = wrapIttfText;
function generateArtifact(filePath, files, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const _options = options || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.generateArtifact',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const generator = _options.generator ? _options.generator : wizziMaps.generatorFor(filePath);
            if (generator) {
                let jsonwf = {};
                let generationContext = {};
                const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
                const siteDocumentUri = Object.keys(files).find(k => k.endsWith('site.json.ittf'));
                try {
                    jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
                    ;
                    generationContext = Object.assign(context || {}, Object.assign({ site: siteDocumentUri ? yield loadModelInternal(jsonwf.wf, (0, factory_1.ensurePackiFilePrefix)(siteDocumentUri), {}) : null }, (yield inferAndLoadContextJson(jsonwf.wf, files, ittfDocumentUri, 'twin'))));
                    console.log("[31m%s[0m", "da dan", ittfDocumentUri);
                    jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
                        modelRequestContext: generationContext || {},
                        artifactRequestContext: _options.artifactContext || {}
                    }, generator, (err, result) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return reject(err);
                        }
                        resolve({
                            artifactContent: result,
                            sourcePath: filePath,
                            artifactGenerator: generator
                        });
                    });
                }
                catch (ex) {
                    return reject(ex);
                }
            }
            else {
                reject('No artifact generator available for document ' + filePath);
            }
        }));
    });
}
exports.generateArtifact = generateArtifact;
function generateArtifactFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const _options = options || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generator = _options.generator ? _options.generator : wizziMaps.generatorFor(filePath);
            // TODO catch error
            if (generator) {
                const plugins = _options.pluginsBaseFolder && _options.plugins ? {
                    pluginsBaseFolder: _options.pluginsBaseFolder,
                    items: _options.plugins
                } : null;
                const wf = yield (0, factory_1.createFilesystemFactory)(plugins, null, {});
                try {
                    wf.loadModelAndGenerateArtifact(filePath, {
                        modelRequestContext: context || {},
                        artifactRequestContext: context || {}
                    }, generator, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            artifactContent: result,
                            sourcePath: filePath,
                            artifactGenerator: generator
                        });
                    });
                }
                catch (ex) {
                    return reject(ex);
                }
            }
            else {
                reject('No artifact generator available for document ' + filePath);
            }
        }));
    });
}
exports.generateArtifactFs = generateArtifactFs;
function generateArtifactDb(owner, name, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.generateArtifactDb not yet implemented');
    });
}
exports.generateArtifactDb = generateArtifactDb;
function generateFolderArtifacts(sourceFolderUri, destFolderUri, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.generateFolderArtifacts',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            let jsonwf = {};
            try {
                jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
                ;
                jsonwf.wf.generateFolderArtifacts(env_1.packiFilePrefix + sourceFolderUri, {
                    modelRequestContext: context,
                    artifactRequestContext: context
                }, {
                    destFolder: env_1.packiFilePrefix + destFolderUri
                }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    jsonwf.wf.fileService.getFiles(env_1.packiFilePrefix + destFolderUri, {
                        deep: true,
                        documentContent: true
                    }, (err, files) => {
                        if (err) {
                            return reject(err);
                        }
                        const packiFiles = {};
                        var i, i_items = files, i_len = files.length, file;
                        for (i = 0; i < i_len; i++) {
                            file = files[i];
                            packiFiles[file.relPath] = {
                                type: 'CODE',
                                contents: file.content
                            };
                        }
                        resolve(packiFiles);
                    });
                });
            }
            catch (ex) {
                return reject(ex);
            }
        }));
    });
}
exports.generateFolderArtifacts = generateFolderArtifacts;
function generateFolderArtifactsFs(sourceFolderUri, destFolderUri, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const wf = yield (0, factory_1.createFilesystemFactory)();
                wf.generateFolderArtifacts(sourceFolderUri, {
                    modelRequestContext: context,
                    artifactRequestContext: context
                }, {
                    destFolder: destFolderUri
                }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve("Generated folder artifacts");
                });
            }
            catch (ex) {
                return reject(ex);
            }
        }));
    });
}
exports.generateFolderArtifactsFs = generateFolderArtifactsFs;
function generateWizziModelTypes(request) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const storeKind = request.storeKind || 'filesystem';
            const mTreeBuildUpContext = Object.assign({}, request.mTreeBuildUpContext);
            const globalContext = Object.assign({}, request.globalContext);
            var plugins = [];
            if (request.plugins) {
                var i, i_items = request.plugins, i_len = request.plugins.length, item;
                for (i = 0; i < i_len; i++) {
                    item = request.plugins[i];
                    if (plugins.indexOf(item) < 0) {
                        plugins.push(item);
                    }
                }
            }
            else {
                plugins.push('wizzi-core');
            }
            console.log('wizziProds.generateWizziModelTypes.plugins', plugins);
            for (var k in mTreeBuildUpContext) {
                console.log('- mTreeBuildUpContext property', k, mTreeBuildUpContext[k]);
            }
            for (var k in globalContext) {
                console.log('- globalContext property', k, globalContext[k]);
            }
            try {
                const wf = yield (0, factory_1.createFilesystemFactoryWithParameters)(request.pluginsBaseFolder, plugins, globalContext);
                console.log('STARTING WIZZI MODEL TYPES GENERATION FOR SCHEMA ' + request.wfschemaName);
                wf.generateModelDoms(request.wfschemaIttfDocumentUri, request.wfschemaOutputPackageFolder, request.wfschemaName, mTreeBuildUpContext, (err, result) => {
                    if (err) {
                        return reject({
                            message: "wizziProds.generateWizziModelTypes.generateModelDoms.error",
                            err: {}
                        });
                    }
                    console.log("[32m%s[0m", 'WIZZI MODEL TYPES GENERATED FOR SCHEMA ' + request.wfschemaName);
                    return resolve(request.wfschemaName);
                });
            }
            catch (ex) {
                console.log("[31m%s[0m", "wizziProds.generateWizziModelTypes.error", ex);
                return reject({
                    message: "wizziProds.generateWizziModelTypes.error",
                    err: ex
                });
            }
        }));
    });
}
exports.generateWizziModelTypes = generateWizziModelTypes;
function loadAndTransformModel(filePath, files, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.transformModel',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const transformer = options && options.transformer ? options.transformer : wizziMaps.transformerFor(filePath);
            if (transformer) {
                let jsonwf = {};
                let transformationContext = {};
                const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
                const siteDocumentUri = Object.keys(files).find(k => k.endsWith('site.json.ittf'));
                try {
                    jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
                    ;
                    transformationContext = Object.assign({ site: siteDocumentUri ? yield loadModelInternal(jsonwf.wf, (0, factory_1.ensurePackiFilePrefix)(siteDocumentUri), {}) : null }, (yield inferAndLoadContextJson(jsonwf.wf, files, ittfDocumentUri, 'twin')));
                    jsonwf.wf.loadAndTransformModel(ittfDocumentUri, {
                        modelRequestContext: transformationContext
                    }, transformer, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            transformResult: result,
                            sourcePath: filePath,
                            modelTransformer: transformer
                        });
                    });
                }
                catch (ex) {
                    return reject(ex);
                }
            }
            else {
                reject('No model transformer available for document ' + filePath);
            }
        }));
    });
}
exports.loadAndTransformModel = loadAndTransformModel;
function transformModel(object, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const _options = options || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformer = _options.transformer;
            // TODO catch error
            if (transformer) {
                const plugins = _options.pluginsBaseFolder && _options.plugins ? {
                    pluginsBaseFolder: _options.pluginsBaseFolder,
                    items: _options.plugins
                } : null;
                const wf = yield (0, factory_1.createFilesystemFactory)(plugins, null, {});
                const transformationContext = {
                    modelRequestContext: context || {}
                };
                wf.transformModel(object, transformer, {
                    modelRequestContext: transformationContext
                }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        transformResult: result,
                        sourcePath: object,
                        modelTransformer: transformer
                    });
                });
            }
            else {
                reject('No model transformer in options');
            }
        }));
    });
}
exports.transformModel = transformModel;
function loadAndTransformModelFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const _options = options || {};
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformer = _options.transformer ? _options.transformer : wizziMaps.transformerFor(filePath);
            // TODO catch error
            if (transformer) {
                const plugins = _options.pluginsBaseFolder && _options.plugins ? {
                    pluginsBaseFolder: _options.pluginsBaseFolder,
                    items: _options.plugins
                } : null;
                const wf = yield (0, factory_1.createFilesystemFactory)(plugins, null, {});
                const transformationContext = {
                    modelRequestContext: context || {}
                };
                wf.loadAndTransformModel(filePath, {
                    modelRequestContext: transformationContext
                }, transformer, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        transformResult: result,
                        sourcePath: filePath,
                        modelTransformer: transformer
                    });
                });
            }
            else {
                reject('No model transformer available for document ' + filePath);
            }
        }));
    });
}
exports.loadAndTransformModelFs = loadAndTransformModelFs;
function metaGenerate(metaCtx, factoryPlugins, metaPlugins, globalContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname, 'metaGenerate.metaCtx', Object.keys(metaCtx), __filename);
            let jsonwf = {};
            try {
                jsonwf = yield (0, factory_1.createJsonFsAndFactory)({}, factoryPlugins, metaPlugins);
                ;
                jsonwf.wf.metaGenerate({
                    metaCtx: metaCtx,
                    paths: {
                        metaProductionTempFolder: '___template',
                        metaProductionWizziFolder: '.wizzi'
                    },
                    globalContext: {}
                }, (err, wizziPackiFiles) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(wizziPackiFiles);
                });
            }
            catch (ex) {
                return reject(ex);
            }
        }));
    });
}
exports.metaGenerate = metaGenerate;
function executeJob(wfjobFilePath, packiFiles, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!utils_1.verify.isObject(packiFiles)) {
                return reject({
                    action: 'wizzi.productions.executeJob',
                    message: 'packiFiles parameter must be an object of type PackiFiles',
                    packiFiles
                });
            }
            wfjobFilePath = (0, factory_1.ensurePackiFilePrefix)(wfjobFilePath);
            const jsonwf = yield (0, factory_1.createJsonFsAndFactory)(packiFiles);
            jsonwf.wf.executeJob({
                name: '',
                path: wfjobFilePath,
                productionOptions: {},
                globalContext: context || {}
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(jsonwf.jsonFs);
            });
        }));
    });
}
exports.executeJob = executeJob;
function executeJobs(packiFiles, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // TODO catch error
        (resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wfjobFilePaths = Object.keys(packiFiles).filter(k => k.endsWith('.wfjob.ittf'));
            const jsonwf = yield (0, factory_1.createJsonFsAndFactory)(packiFiles);
            const execJob = (index) => {
                if (index == wfjobFilePaths.length) {
                    return resolve(jsonwf.jsonFs);
                }
                const wfjobFilePath = (0, factory_1.ensurePackiFilePrefix)(wfjobFilePaths[index]);
                jsonwf.wf.executeJob({
                    name: '',
                    path: wfjobFilePath,
                    productionOptions: {},
                    globalContext: context || {}
                }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    execJob(index + 1);
                });
            };
            execJob(0);
        }));
    });
}
exports.executeJobs = executeJobs;
function executeJobFs(request) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const globalContext = Object.assign({}, request.globalContext);
                var plugins = [];
                if (request.plugins) {
                    var i, i_items = request.plugins, i_len = request.plugins.length, item;
                    for (i = 0; i < i_len; i++) {
                        item = request.plugins[i];
                        if (plugins.indexOf(item) < 0) {
                            plugins.push(item);
                        }
                    }
                }
                else {
                    plugins.push('wizzi-core');
                }
                const wf = yield (0, factory_1.createFilesystemFactoryWithParameters)(request.pluginsBaseFolder, plugins, globalContext);
                console.log('STARTING WIZZI JOB', request.wfjobIttfDocumentUri);
                wf.executeJob({
                    name: request.wfjobName || path_1.default.basename(request.wfjobIttfDocumentUri),
                    path: request.wfjobIttfDocumentUri,
                    productionOptions: {},
                    globalContext: globalContext
                }, (err, result) => {
                    if (err) {
                        return reject({
                            message: "wizziProds.executeJobFs.wf.executeJob.error",
                            err: {}
                        });
                    }
                    console.log("[32m%s[0m", 'WIZZI JOB Executed', request.wfjobIttfDocumentUri);
                    return resolve(result);
                });
            }
            catch (ex) {
                console.log("[31m%s[0m", "wizziProds.executeJobFs.error", ex);
                return reject({
                    message: "wizziProds.executeJobFs.error",
                    err: ex
                });
            }
        }));
    });
}
exports.executeJobFs = executeJobFs;
function inferAndLoadContextJson(wf, files, filePath, exportName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.inferAndLoadContextJson',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const pf = wizziMaps.parseFilePath(filePath);
            if (pf.isIttfDocument && pf.schema !== 'json') {
                var twinJsonBaseName = pf.seedname + '.json.ittf';
                const twinDocumentUri = Object.keys(files).find(k => k.endsWith('/' + twinJsonBaseName));
                if (twinDocumentUri) {
                    loadModelInternal(wf, (0, factory_1.ensurePackiFilePrefix)(twinDocumentUri), {}).then(model => resolve({
                        [exportName]: model
                    })).catch(err => reject(err));
                }
                else {
                    resolve({});
                }
            }
            else {
                resolve({});
            }
        });
    });
}
exports.inferAndLoadContextJson = inferAndLoadContextJson;
function inferAndLoadContextFs(filePath, exportName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const pf = wizziMaps.parseFilePath(filePath);
            if (pf.isIttfDocument && pf.schema !== 'json') {
                var twinJsonPath = path_1.default.join(path_1.default.dirname(filePath), pf.seedname + '.json.ittf');
                if (fs_1.default.existsSync(twinJsonPath)) {
                    loadModelFs(twinJsonPath, {}).then(model => resolve({
                        [exportName]: model
                    })).catch(err => reject(err));
                }
                else {
                    resolve({});
                }
            }
            else {
                resolve({});
            }
        });
    });
}
exports.inferAndLoadContextFs = inferAndLoadContextFs;
function scanIttfDocument(mainIttf, packiFiles, rootFolder) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.scanIttfDocument not yet implemented');
    });
}
exports.scanIttfDocument = scanIttfDocument;
function scanIttfDocumentFs(filePath, rootFolder) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => utils_1.ittfScanner.scanIttfDocument(filePath, {
            rootFolder
        }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        }));
    });
}
exports.scanIttfDocumentFs = scanIttfDocumentFs;
function scanIttfFolder(filePath, rootFolder) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => utils_1.ittfScanner.browseFolder(filePath, {
            rootFolder
        }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        }));
    });
}
exports.scanIttfFolder = scanIttfFolder;
function scanIttfDocumentDb(owner, name, rootFolder) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.scanIttfDocumentDb not yet implemented');
    });
}
exports.scanIttfDocumentDb = scanIttfDocumentDb;
function folderBrowseToPackiFiles(folderBrowse) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const packiFiles = {};
            folderBrowse.fsitems.map((fsitem) => {
                if (fsitem.isFolder == false) {
                    packiFiles[fsitem.uri] = {
                        type: "CODE",
                        contents: fsitem.content
                    };
                }
            });
            resolve(packiFiles);
        });
    });
}
exports.folderBrowseToPackiFiles = folderBrowseToPackiFiles;
function folderFsToPackiFiles(folderPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const fsfile = utils_1.fSystem.vfile();
            const packiFiles = {};
            try {
                fsfile.getFiles(folderPath, {
                    deep: true,
                    documentContent: true
                }, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", "wizzi.productions.folderFsToPackiFiles", err);
                        return reject({
                            message: "wizzi.productions.folderFsToPackiFiles",
                            err
                        });
                    }
                    result.map(fsitem => packiFiles[fsitem.relPath] = {
                        type: "CODE",
                        contents: fsitem.content || ""
                    });
                    return resolve(packiFiles);
                });
            }
            catch (ex) {
                return reject({
                    message: "wizzi.productions.folderFsToPackiFiles",
                    err: ex
                });
            }
        });
    });
}
exports.folderFsToPackiFiles = folderFsToPackiFiles;
function packiFilesToFolderFs(folderPath, files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const fsfile = utils_1.fSystem.vfile();
                fsfile.deleteFolder(folderPath, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", "wizzi.productions.packiFilesTofolderFs.fsfile.deleteFolder", err);
                        return reject({
                            message: "wizzi.productions.packiFilesTofolderFs.fsfile.deleteFolder",
                            err
                        });
                    }
                    for (var k in files) {
                        var contents = files[k].contents;
                        fsfile.write(path_1.default.join(folderPath, k), contents);
                    }
                    return resolve({
                        message: "Folder replaced"
                    });
                });
            }
            catch (ex) {
                console.log("[31m%s[0m", "Exception. wizzi.productions.packiFilesTofolderFs");
                return reject({
                    message: "Exception. wizzi.productions.packiFilesTofolderFs",
                    err: ex
                });
            }
        });
    });
}
exports.packiFilesToFolderFs = packiFilesToFolderFs;
function wizzifyFs(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var extension = path_1.default.extname(filePath);
            var schema = wizziMaps.schemaFromExtension(extension);
            const wf = yield (0, factory_1.createFilesystemFactory)();
            wf.getWizziIttf(filePath, schema, (err, ittfDocument) => {
                if (err) {
                    reject(err);
                }
                return resolve(ittfDocument);
            });
        }));
    });
}
exports.wizzifyFs = wizzifyFs;
function wizzify(files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var result = {};
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            for (const k of Object.keys(files)) {
                var extension = path_1.default.extname(k);
                try {
                    const ittfResult = yield handleWizzify(jsonwf.wf, extension, files[k].contents);
                    result[k + '.ittf'] = {
                        type: 'CODE',
                        contents: ittfResult
                    };
                }
                catch (ex) {
                    result[k + '.ittf'] = {
                        type: 'CODE',
                        contents: (0, json_stringify_safe_1.default)(ex, null, 2)
                    };
                }
            }
            return resolve(result);
        }));
    });
}
exports.wizzify = wizzify;
function handleWizzify(wf, extension, codeSnippet) {
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var schema = wizziMaps.schemaFromExtension(extension);
        if (schema) {
            wf.getWizziIttfFromText(codeSnippet, schema, (err, ittfDocument) => {
                if (err) {
                    reject(err);
                }
                return resolve(ittfDocument);
            });
        }
        else {
            const ittfResult = [extension.substring(1)];
            ittfResult.push('\t$' + '*');
            ittfResult.push(codeSnippet);
            ittfResult.push('\t*' + '$');
            resolve(ittfResult.join('\n'));
        }
    }));
}
function getCheatsheetList() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var files = {};
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            return resolve(jsonwf.wf.getCheatsheetList());
        }));
    });
}
exports.getCheatsheetList = getCheatsheetList;
function getCheatsheet(schemaName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var files = {};
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            jsonwf.wf.getCheatsheet(schemaName, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }));
    });
}
exports.getCheatsheet = getCheatsheet;
function getCodeASTFs(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var extension = path_1.default.extname(filePath);
            var schema = wizziMaps.schemaFromExtension(extension);
            const wf = yield (0, factory_1.createFilesystemFactory)();
            wf.getCodeAST(filePath, schema, (err, ittfDocument) => {
                if (err) {
                    reject(err);
                }
                return resolve(ittfDocument);
            });
        }));
    });
}
exports.getCodeASTFs = getCodeASTFs;
function getCodeAST(files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var result = {};
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createJsonFsAndFactory)(files);
            ;
            for (const k of Object.keys(files)) {
                var extension = path_1.default.extname(k);
                try {
                    const astResult = yield handleGetCodeAST(jsonwf.wf, extension, files[k].contents);
                    result[k + '.ast'] = {
                        type: 'CODE',
                        contents: (0, json_stringify_safe_1.default)(astResult, null, 2)
                    };
                }
                catch (ex) {
                    result[k + '.ast'] = {
                        type: 'CODE',
                        contents: (0, json_stringify_safe_1.default)(ex, null, 2)
                    };
                }
            }
            return resolve(result);
        }));
    });
}
exports.getCodeAST = getCodeAST;
function handleGetCodeAST(wf, extension, codeSnippet) {
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var schema = wizziMaps.schemaFromExtension(extension);
        if (schema) {
            wf.getCodeASTFromText(codeSnippet, schema, function (err, astResult) {
                if (err) {
                    reject(err);
                }
                resolve(astResult);
            });
        }
        else {
            const ittfResult = {
                message: "The file has an invalid schema."
            };
            resolve(ittfResult);
        }
    }));
}
// TODO cache results!
function loadSiteJsonModel(relPath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        context = Object.assign({}, {
            isWizziStudio: true
        }, context || {});
        return new Promise((resolve, reject) => loadModelFs(path_1.default.join(config_1.config.ittfPath, 'models', relPath), context).then(model => resolve(model)).catch(err => reject(err)));
    });
}
exports.loadSiteJsonModel = loadSiteJsonModel;
function jsonFsToPackiFiles(jsonFs, folder) {
    return new Promise((resolve, reject) => {
        const packiFiles = {};
        jsonFs.toFiles({
            removeRoot: env_1.packiFilePrefixExtract
        }, (err, files) => {
            if (err) {
                return reject(err);
            }
            files.forEach((file) => {
                if (file.relPath.startsWith(folder + '/')) {
                    packiFiles[file.relPath] = {
                        type: 'CODE',
                        contents: file.content,
                        generated: true
                    };
                }
            });
            resolve(packiFiles);
        });
    });
}
//# sourceMappingURL=productions.js.map