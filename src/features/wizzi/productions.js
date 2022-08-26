"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanIttfDocumentDb = exports.scanIttfFolder = exports.scanIttfDocumentFs = exports.inferAndLoadContextFs = exports.transformModelFs = exports.generateArtifactDb = exports.generateArtifactFs = exports.mTreeDb = exports.mTreeFs = exports.mTreeBuildupScriptDb = exports.mTreeBuildupScriptFs = exports.loadModelFs = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\features\wizzi\productions.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const wizzi_utils_1 = require("wizzi-utils");
const wizziMaps = tslib_1.__importStar(require("./maps"));
const factory_1 = require("./factory");
const myname = 'features/wizzi/productions';
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
function generateArtifactFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generator = options && options.generator ? options.generator : wizziMaps.generatorFor(filePath);
            // loog 'wizzi.productions.using artifact generator', generator
            // loog myname + '.generateArtifactFs.context', Object.keys(context || {})
            if (generator) {
                const wf = yield (0, factory_1.createFilesystemFactory)();
                try {
                    wf.loadModelAndGenerateArtifact(filePath, {
                        modelRequestContext: context || {},
                        artifactRequestContext: context || {}
                    }, generator, 
                    // loog myname + '.generateArtifactFs.err', err
                    (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        // loog 'Generated artifact', result
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
function transformModelFs(filePath, context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformer = options && options.transformer ? options.transformer : wizziMaps.transformerFor(filePath);
            // loog 'wizzi.productions.using model transformer', transformer
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
                    // loog 'Transformed model', result
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
//# sourceMappingURL=productions.js.map