"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSiteJsonModel = exports.wizzify = exports.scanIttfDocumentDb = exports.scanIttfFolder = exports.scanIttfDocumentFs = exports.scanIttfDocument = exports.inferAndLoadContextFs = exports.inferAndLoadContextJson = exports.executeJobs = exports.executeJob = exports.transformModelFs = exports.transformModel = exports.generateFolderArtifacts = exports.generateArtifactDb = exports.generateArtifactFs = exports.generateArtifact = exports.wrapIttfText = exports.mTreeDb = exports.mTreeFs = exports.mTree = exports.mTreeBuildupScriptDb = exports.mTreeBuildupScriptFs = exports.mTreeBuildupScript = exports.loadModelFs = exports.loadModel = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\wizzi\productions.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const wizzi_tools_1 = tslib_1.__importDefault(require("wizzi-tools"));
const wizzi_utils_1 = require("wizzi-utils");
const env_1 = require("../config/env");
const config_1 = require("../config");
const wizziMaps = tslib_1.__importStar(require("./maps"));
const factory_1 = require("./factory");
const myname = 'features/wizzi/productions';
function loadModel(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.loadModel',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            let jsonwf = {};
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
            ;
            jsonwf.wf.loadModel(ittfDocumentUri, {
                mTreeBuildupContext: context
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
function loadModelFs(filePath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schemaName = wizziMaps.schemaFromFilePath(filePath);
            if (!schemaName) {
                return reject('File is not a known ittf document: ' + filePath);
            }
            const wf = yield (0, factory_1.createFilesystemFactory)();
            wf.loadModel(schemaName, filePath, {
                mTreeBuildupContext: context
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
                mTreeBuildupContext: context
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        }));
    });
}
function mTreeBuildupScript(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.mTreeBuildupScript',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
            ;
            jsonwf.wf.loadMTreeDebugInfo(ittfDocumentUri, context, (err, buildUpScript) => {
                if (err) {
                    return reject(err);
                }
                resolve(buildUpScript);
            });
        }));
    });
}
exports.mTreeBuildupScript = mTreeBuildupScript;
function mTreeBuildupScriptFs(filePath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.mTreeBuildupScriptFs not yet implemented');
    });
}
exports.mTreeBuildupScriptFs = mTreeBuildupScriptFs;
function mTreeBuildupScriptDb(owner, name, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error(myname + '.mTreeBuildupScriptDB not yet implemented');
    });
}
exports.mTreeBuildupScriptDb = mTreeBuildupScriptDb;
function mTree(filePath, files, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.mTree',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
            let jsonwf = {};
            jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
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
            console.log(myname, 'wrapIttfText', 'mainIttf', mainIttf, __filename);
            mTree(mainIttf, packiFiles, context).then((result) => {
                const requiredRoot = wizziMaps.ittfRootFromSchema(schema);
                console.log(myname, 'wrapIttfText', 'root node', result.mTree.nodes[0].n, 'requiredRoot', requiredRoot, __filename);
                if (requiredRoot == 'any' || result.mTree.nodes[0].n == requiredRoot) {
                    resolve(ittftext);
                }
                else {
                    const wrapperNode = wizziMaps.wrapperForSchema(schema);
                    wrapperNode.children.push(result.mTree.nodes[0]);
                    resolve(result.mTree.toIttf(wrapperNode));
                }
            }).catch((err) => {
                console.log('features.wizzi.productions.wrapIttfText.mTree.error', err, __filename);
                return reject(err);
            });
        }));
    });
}
exports.wrapIttfText = wrapIttfText;
function generateArtifact(filePath, files, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.generateArtifact',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            const generator = options && options.generator ? options.generator : wizziMaps.generatorFor(filePath);
            if (generator) {
                let jsonwf = {};
                let generationContext = {};
                const ittfDocumentUri = (0, factory_1.ensurePackiFilePrefix)(filePath);
                const siteDocumentUri = Object.keys(files).find(k => k.endsWith('site.json.ittf'));
                try {
                    jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
                    ;
                    generationContext = Object.assign(context || {}, Object.assign({ site: siteDocumentUri ? yield loadModelInternal(jsonwf.wf, (0, factory_1.ensurePackiFilePrefix)(siteDocumentUri), {}) : null }, (yield inferAndLoadContextJson(jsonwf.wf, files, ittfDocumentUri, 'twin'))));
                    jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
                        modelRequestContext: generationContext || {},
                        artifactRequestContext: generationContext || {}
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
exports.generateArtifact = generateArtifact;
function generateArtifactFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generator = options && options.generator ? options.generator : wizziMaps.generatorFor(filePath);
            if (generator) {
                const wf = yield (0, factory_1.createFilesystemFactory)();
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
            if (!wizzi_utils_1.verify.isObject(files)) {
                return reject({
                    action: 'wizzi.productions.generateFolderArtifacts',
                    message: 'files parameter must be an object of type PackiFiles',
                    files
                });
            }
            let jsonwf = {};
            try {
                jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
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
function transformModel(filePath, files, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(files)) {
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
                    jsonwf = yield (0, factory_1.createFsJsonAndFactory)(files);
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
exports.transformModel = transformModel;
function transformModelFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformer = options && options.transformer ? options.transformer : wizziMaps.transformerFor(filePath);
            if (transformer) {
                const wf = yield (0, factory_1.createFilesystemFactory)();
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
exports.transformModelFs = transformModelFs;
function executeJob(wfjobFilePath, packiFiles, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!wizzi_utils_1.verify.isObject(packiFiles)) {
                return reject({
                    action: 'wizzi.productions.executeJob',
                    message: 'packiFiles parameter must be an object of type PackiFiles',
                    packiFiles
                });
            }
            wfjobFilePath = (0, factory_1.ensurePackiFilePrefix)(wfjobFilePath);
            const jsonwf = yield (0, factory_1.createFsJsonAndFactory)(packiFiles);
            jsonwf.wf.executeJob({
                name: '',
                path: wfjobFilePath,
                productionOptions: {},
                globalContext: context || {}
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(jsonwf.fsJson);
            });
        }));
    });
}
exports.executeJob = executeJob;
function executeJobs(packiFiles, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wfjobFilePaths = Object.keys(packiFiles).filter(k => k.endsWith('.wfjob.ittf'));
            const jsonwf = yield (0, factory_1.createFsJsonAndFactory)(packiFiles);
            const execJob = (index) => {
                if (index == wfjobFilePaths.length) {
                    return resolve(jsonwf.fsJson);
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
function inferAndLoadContextJson(wf, files, filePath, exportName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!wizzi_utils_1.verify.isObject(files)) {
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
        return new Promise((resolve, reject) => wizzi_utils_1.ittfScanner.scanIttfDocument(filePath, {
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
        return new Promise((resolve, reject) => wizzi_utils_1.ittfScanner.browseFolder(filePath, {
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
function wizzify(files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var result = {};
            for (const k of Object.keys(files)) {
                var extension = path_1.default.extname(k);
                const ittfResult = yield handleWizzify(extension, files[k].contents);
                result[k + '.ittf'] = {
                    type: 'CODE',
                    contents: ittfResult
                };
            }
            return resolve(result);
        }));
    });
}
exports.wizzify = wizzify;
function handleWizzify(extension, codeSnippet) {
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var schema = wizziMaps.schemaFromExtension(extension);
        if (schema) {
            wizzi_tools_1.default.wizzify(schema, codeSnippet, {}, function (err, ittfResult) {
                if (err) {
                    reject(err);
                }
                resolve(ittfResult);
            });
        }
        else {
            reject(new Error('Extension "' + extension + '" has no wizzifier'));
        }
    }));
}
// TODO cache results!
function loadSiteJsonModel(relPath, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        context = Object.assign({}, {
            isWizziStudio: true
        }, context || {});
        return new Promise((resolve, reject) => loadModelFs(path_1.default.join(config_1.config.ittfPath, 'models', relPath), context).then(
        // log 'loadJsonIttfModel', model
        model => resolve(model)).catch(err => reject(err)));
    });
}
exports.loadSiteJsonModel = loadSiteJsonModel;
//# sourceMappingURL=productions.js.map