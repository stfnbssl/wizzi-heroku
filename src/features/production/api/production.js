"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTFoldersPackiFilesFromProductionData = exports.prepareProduction = exports.prepareProductionById = exports.getProductionObject = exports.getProductionById = void 0;
const tslib_1 = require("tslib");
const wizzi_1 = require("../../wizzi");
const artifactApi = tslib_1.__importStar(require("./artifact"));
const packageApi = tslib_1.__importStar(require("./package"));
const pluginApi = tslib_1.__importStar(require("./plugin"));
const metaApi = tslib_1.__importStar(require("./meta"));
const tFolderApi = tslib_1.__importStar(require("./tfolder"));
const artifact_1 = require("./artifact");
const myname = 'features.production.api.production';
const packiConfigPath = '.packi/config.json.ittf';
// TODO
function transformProductionObject(packiProduction, productionObject) {
    productionObject.packiProduction = packiProduction;
    productionObject.packiConfig = productionObject.packiFiles[packiConfigPath];
    // TODO set a default packiConfig based on packiProduction
    if (!productionObject.packiConfig) {
    }
    return productionObject;
}
function mergePackiFiles(a, b) {
    var ret = {};
    for (var k in a) {
        ret[k] = a[k];
    }
    for (var k in b) {
        ret[k] = b[k];
    }
    return ret;
}
function getProductionById(packiProduction, id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (packiProduction == 'artifact') {
                artifactApi.getArtifactProductionById(id).then((result) => {
                    if (result.ok) {
                        resolve(result.item);
                    }
                    else {
                        reject(result);
                    }
                }).catch((err) => {
                    console.log('features.production.api.production.getProductionById.getArtifactProductionById.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'package') {
                packageApi.getPackageProductionById(id).then((result) => {
                    if (result.ok) {
                        resolve(result.item);
                    }
                    else {
                        reject(result);
                    }
                }).catch((err) => {
                    console.log('features.production.api.production.getProductionById.getPackageProductionById.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'meta') {
                metaApi.getMetaProductionById(id).then((result) => {
                    if (result.ok) {
                        resolve(result.item);
                    }
                    else {
                        reject(result);
                    }
                }).catch((err) => {
                    console.log('features.production.api.production.getProductionById.getMetaProductionById.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'plugin') {
                pluginApi.getPluginProductionById(id).then((result) => {
                    if (result.ok) {
                        resolve(result.item);
                    }
                    else {
                        reject(result);
                    }
                }).catch((err) => {
                    console.log('features.production.api.production.getProductionById.getPluginProductionById.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'tfolder') {
                tFolderApi.getTFolderById(id).then((result) => {
                    if (result.ok) {
                        resolve(result.item);
                    }
                    else {
                        reject(result);
                    }
                }).catch((err) => {
                    console.log('features.production.api.production.getProductionById.getTFolderProductionById.error', err, __filename);
                    return reject(err);
                });
            }
            else {
                throw new Error("features.production.api.production.getProductionById: packiProduction " + packiProduction + " not implemented");
            }
        });
    });
}
exports.getProductionById = getProductionById;
function getProductionObject(packiProduction, owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (packiProduction == 'artifact') {
                artifactApi.getArtifactProductionObject(owner, name).then((productionObject) => resolve(transformProductionObject(packiProduction, productionObject))).catch((err) => {
                    console.log('features.production.api.production.getProductionObject.getArtifactProductionObject.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'package') {
                packageApi.getPackageProductionObject(owner, name).then((productionObject) => resolve(transformProductionObject(packiProduction, productionObject))).catch((err) => {
                    console.log('features.production.api.production.getProductionObject.getPackageProductionObject.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'meta') {
                metaApi.getMetaProductionObject(owner, name).then((productionObject) => resolve(transformProductionObject(packiProduction, productionObject))).catch((err) => {
                    console.log('features.production.api.production.getProductionObject.getMetaProductionObject.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'plugin') {
                pluginApi.getPluginProductionObject(owner, name).then((productionObject) => resolve(transformProductionObject(packiProduction, productionObject))).catch((err) => {
                    console.log('features.production.api.production.getProductionObject.getPluginProductionObject.error', err, __filename);
                    return reject(err);
                });
            }
            else if (packiProduction == 'tfolder') {
                tFolderApi.getTFolderObject(owner, name).then((productionObject) => resolve(transformProductionObject(packiProduction, productionObject))).catch((err) => {
                    console.log('features.production.api.production.getProductionObject.getTFolderObject.error', err, __filename);
                    return reject(err);
                });
            }
            else {
                throw new Error("features.production.api.production.getProductionObject: packiProduction " + packiProduction + " not implemented");
            }
        });
    });
}
exports.getProductionObject = getProductionObject;
function prepareProductionById(packiProduction, id, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getProductionById(packiProduction, id).then((productionItem) => prepareProduction(packiProduction, productionItem.owner, productionItem.name, queryContext, rootContext).then((result) => resolve(result)).catch((err) => {
            console.log('features.production.api.production.prepareProductionById.prepareProduction.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('features.production.api.production.prepareProductionById.getProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.prepareProductionById = prepareProductionById;
function prepareProduction(packiProduction, owner, productionName, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getDefaultContext_withCache(owner, productionName, rootContext).then((defaultContext) => getProductionObject(packiProduction, owner, productionName).then((productionObject) => {
            console.log('prepareProduction.productionObject', Object.keys(productionObject), __filename);
            if (productionObject.packiConfig) {
                getProductionSetFromProductionObject(owner, productionName, productionObject.packiConfig, productionObject.packiFiles, defaultContext).then((productionSet) => {
                    productionObject.packiFiles = productionSet.packiFiles;
                    productionObject.context = productionSet.context;
                    getProductionSetByQueryContext(owner, productionName, queryContext, productionObject.packiFiles, productionObject.context).then((queryProductionSet) => {
                        productionObject.packiFiles = queryProductionSet.packiFiles;
                        productionObject.context = queryProductionSet.context;
                        resolve(productionObject);
                    }).catch((err) => {
                        console.log('features.production.api.production.prepareProduction.getContextByQueryContext.error', err, __filename);
                        return reject(err);
                    });
                }).catch((err) => {
                    console.log('features.production.api.production.prepareProduction.getContextByProductionObject.error', err, __filename);
                    return reject(err);
                });
            }
            else {
                getProductionSetByQueryContext(owner, productionName, queryContext, productionObject.packiFiles, defaultContext).then((queryProductionSet) => {
                    productionObject.packiFiles = queryProductionSet.packiFiles;
                    productionObject.context = queryProductionSet.context;
                    resolve(productionObject);
                }).catch((err) => {
                    console.log('features.production.api.production.prepareProduction.getContextByQueryContext.error', err, __filename);
                    return reject(err);
                });
            }
        }).catch((err) => {
            console.log('features.production.api.production.prepareProduction.getProductionObject.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('features.production.api.production.prepareProduction.getDefaultContext_withCache.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.prepareProduction = prepareProduction;
function getDefaultContext_withCache(owner, productionName, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        progressiveContext = progressiveContext || {};
        return new Promise((resolve, reject) => getArtifactContextItem(owner, 'wzCtx;wzctx', progressiveContext).then((resultItemContext) => {
            console.log('getDefaultContext_withCache', 'got context item wzCtx;wzctx', 'keys', Object.keys(resultItemContext), __filename);
            resolve(Object.assign({}, progressiveContext, resultItemContext));
        }).catch((err) => {
            console.log('getDefaultContext_withCache.getArtifactContextItem.error', err, __filename);
            return reject(err);
        }));
    });
}
/**
    // param queryContextString contextPropertyName;artifactName[;transformName]
    // sample queryContextString: "wzCtx;wzctx.json"
    // context property 'wzCtx' will contain json document 'wzctx.json'
*/
function getArtifactContextItem(owner, queryContextString, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        progressiveContext = progressiveContext || {};
        return new Promise((resolve, reject) => {
            if (queryContextString && queryContextString.length > 0) {
                const parts = queryContextString.split(';');
                const contextPropertyName = parts[0];
                const artifactName = parts[1];
                const transformationName = parts.length > 2 ? parts[2] : null;
                console.log('getArtifactContextItem: contextPropertyName', contextPropertyName, 'artifactName', artifactName, 'transformationName', transformationName, __filename);
                if (transformationName) {
                    (0, artifact_1.getArtifactTransformation)(owner, artifactName, progressiveContext, transformationName).then((result) => {
                        console.log('getArtifactContextItem: typeof result.transformResult', typeof result.transformResult, __filename);
                        resolve(Object.assign({}, progressiveContext, {
                            [contextPropertyName]: result.transformResult
                        }));
                    }).catch((err) => {
                        console.log('getArtifactContextItem.getArtifactTransformation.error', err, __filename);
                        return reject(err);
                    });
                }
                else {
                    (0, artifact_1.getArtifactGeneration)(owner, artifactName, progressiveContext).then((result) => {
                        console.log('getArtifactContextItem.getArtifactGeneration.result.content.length', result.content.length, __filename);
                        const contextObject = JSON.parse(result.content);
                        resolve(Object.assign({}, progressiveContext, {
                            [contextPropertyName]: contextObject
                        }));
                    }).catch((err) => {
                        console.log('getArtifactContextItem.getArtifactGeneration.error', err, __filename);
                        return reject(err);
                    });
                }
            }
            else {
                resolve(progressiveContext);
            }
        });
    });
}
function getProductionSetFromProductionObject(owner, productionName, packiConfig, progressivePackiFiles, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('executing getProductionSetFromProductionObject', 'owner', owner, 'productionName', productionName, 'packiConfig', packiConfig, 'progressivePackiFiles', Object.keys(progressivePackiFiles), 'progressiveContext', Object.keys(progressiveContext), __filename);
        progressiveContext = Object.assign({}, progressiveContext, {
            ctxByProductionObject: "Hello by ProductionObject"
        });
        return new Promise((resolve, reject) => {
            if (packiConfig) {
                wizzi_1.wizziProds.generateArtifact(packiConfigPath, {
                    [packiConfigPath]: {
                        type: packiConfig.type,
                        contents: packiConfig.contents
                    }
                }, progressiveContext).then((generationResult) => {
                    const packiConfigObj = JSON.parse(generationResult.artifactContent);
                    console.log(myname, 'getProductionSetFromProductionObject', 'packiConfigObj', JSON.stringify(packiConfigObj), __filename);
                    getTFoldersPackiFilesFromProductionData(owner, packiConfigObj).then((tFoldersPackiFiles) => {
                        console.log(myname, 'getProductionSetFromProductionObject', 'tFoldersPackiFiles', Object.keys(tFoldersPackiFiles), __filename);
                        progressivePackiFiles = mergePackiFiles(progressivePackiFiles, tFoldersPackiFiles);
                        addContextPropertiesFromProductionData(owner, packiConfigObj, progressiveContext).then((resultProductionContext) => {
                            console.log(myname, 'getProductionSetFromProductionObject', 'resultProductionContext', Object.keys(resultProductionContext), __filename);
                            return resolve({
                                packiFiles: progressivePackiFiles,
                                context: resultProductionContext
                            });
                        });
                    }).catch((err) => {
                        console.log('getArtifactGeneration.getTFoldersPackiFilesFromProductionData.error', err, __filename);
                        return reject(err);
                    });
                }).catch((err) => {
                    console.log('getArtifactGeneration.generateArtifact.error', err, __filename);
                    return reject(err);
                });
            }
            else {
                console.log(owner, productionName, packiConfig, 'has no production data', __filename);
                resolve({
                    packiFiles: progressivePackiFiles,
                    context: progressiveContext
                });
            }
        });
    });
}
function getTFoldersPackiFilesFromProductionData(owner, packiConfigObj) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var tFoldersPackiFiles = {};
            const hasTFolders = packiConfigObj && packiConfigObj.tfolders && packiConfigObj.tfolders.length > 0;
            console.log(myname, 'getTFoldersPackiFilesFromProductionData', 'hastFolders', hasTFolders, __filename);
            if (!hasTFolders) {
                return resolve(tFoldersPackiFiles);
            }
            var j = 0;
            (function next() {
                var tfolder = packiConfigObj.tfolders[j++];
                if (!tfolder) {
                    console.log('getTFoldersPackiFilesFromProductionData.done.keys', Object.keys(tFoldersPackiFiles), __filename);
                    return resolve(tFoldersPackiFiles);
                }
                tFolderApi.getTFolder(owner, tfolder.name).then((result) => {
                    const tf = result.item;
                    const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                    tFoldersPackiFiles = mergePackiFiles(tFoldersPackiFiles, tf_packiFiles_object);
                    next();
                }).catch((err) => {
                    console.log('getTFoldersPackiFilesFromProductionData.getTFolder.error', err, __filename);
                    return reject(err);
                });
            })();
        });
    });
}
exports.getTFoldersPackiFilesFromProductionData = getTFoldersPackiFilesFromProductionData;
function addContextPropertiesFromProductionData(owner, packiConfigObj, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('addContextPropertiesFromProductionData', 'owner', owner, 'packiConfigObj', packiConfigObj, 'progressiveContext', Object.keys(progressiveContext), __filename);
        return new Promise((resolve, reject) => {
            if (!!(packiConfigObj && packiConfigObj.contexts && packiConfigObj.contexts.length > 0) == false) {
                return resolve(progressiveContext);
            }
            var j = 0;
            (function next() {
                var contextConfig = packiConfigObj.contexts[j++];
                if (!contextConfig) {
                    console.log('addContextPropertiesFromProductionData.done.keys', Object.keys(progressiveContext), __filename);
                    return resolve(progressiveContext);
                }
                getArtifactContextItem(owner, contextConfig.propertyName + ';' + contextConfig.artifactName + (contextConfig.transformationName ? ';' + contextConfig.transformationName : ''), progressiveContext).then((resultContextItem) => {
                    progressiveContext = Object.assign({}, progressiveContext, resultContextItem);
                    next();
                }).catch((err) => {
                    console.log('addContextPropertiesFromProductionData.getArtifactContextItem.error', err, __filename);
                    return reject(err);
                });
            })();
        });
    });
}
/**
    // param queryContextString: contexts[@tfolders]
    // contexts: context-1[|context-2[|...context-n]
    // context-x: contextPropertyName;artifactName[;transformName]
    // tfolders: tfolder-1[|tfolder-2[|...tfolder-n]
    // tfolders-x: tfolderName
    // sample queryContextString: "wzCtx;wzctx.json|db;item.db.json@html|css|js"
    // context property 'wzCtx' will contain json document 'wzctx.json'
    // context property 'db' will contain json document 'item.db.json'
    // fragments from tFolders html, css and js will be added to production packiFiles
*/
function getProductionSetByQueryContext(owner, productionName, queryContextString, progressivePackiFiles, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('executing getProductionSetByQueryContext', 'owner', owner, 'productionName', productionName, 'queryContextString', queryContextString, 'progressivePackiFiles', Object.keys(progressivePackiFiles), 'progressiveContext', Object.keys(progressiveContext), __filename);
        progressiveContext = Object.assign({}, progressiveContext, {
            ctxByQueryContext: "Hello by QueryContext"
        });
        return new Promise((resolve, reject) => {
            if (queryContextString && queryContextString.length > 0) {
                const queryContextItems = queryContextString.split('|');
                console.log('getProductionSetByQueryContext', queryContextItems, __filename);
                var j = 0;
                (function next() {
                    var queryContextItem = queryContextItems[j++];
                    if (!queryContextItem) {
                        console.log('getProductionSetByQueryContext.done.keys', Object.keys(progressiveContext), __filename);
                        return resolve({
                            packiFiles: progressivePackiFiles,
                            context: progressiveContext
                        });
                    }
                    getArtifactContextItem(owner, queryContextItem, progressiveContext).then((resultItemContext) => {
                        progressiveContext = Object.assign({}, progressiveContext, resultItemContext);
                        next();
                    }).catch((err) => {
                        console.log('getProductionSetByQueryContext.getArtifactContextItem.error', err, __filename);
                        return reject(err);
                    });
                })();
            }
            else {
                console.log('getProductionSetByQueryContext', 'no queryContextString', __filename);
                resolve({
                    packiFiles: progressivePackiFiles,
                    context: progressiveContext
                });
            }
        });
    });
}
//# sourceMappingURL=production.js.map