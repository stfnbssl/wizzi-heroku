"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextFromWizziJson = exports.getFragmentsFromWizziJson = exports.prepareGenerationFromWizziJson = exports.getArtifactMTreeBuildupScript_withPrepare = exports.getArtifactMTreeBuildupScript = exports.getArtifactMTree_withPrepare = exports.getArtifactMTree = exports.getArtifactGeneration_withPrepare = exports.getArtifactGeneration = exports.getArtifactTransformation_withPrepare = exports.getArtifactTransformation = exports.getArtifactContextItem = exports.getArtifactContext = exports.getDefaultContext_withCache = exports.invalidateCache = exports.getArtifactProduction_withCache = exports.getArtifactProductionObjectById_stop = exports.getArtifactProductionObject_stop = exports.deleteArtifactProduction = exports.updateArtifactProduction = exports.createArtifactProduction = exports.getArtifactProductionObjectById = exports.getArtifactProductionObject = exports.getArtifactProductionById = exports.getArtifactProduction = exports.getListArtifactProduction = exports.validateArtifactProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\api\artifact.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const artifact_1 = require("../mongo/artifact");
const index_1 = require("../index");
const wizzi_1 = require("../../wizzi");
const myname = 'features.production.api.artifact';
const artifactCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validateArtifactProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            ArtifactProduction.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'artifact production already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validateArtifactProduction = validateArtifactProduction;
function getListArtifactProduction(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        console.log(myname, 'getListArtifactProduction', 'options', options);
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            const query = ArtifactProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log(myname, 'getListArtifactProduction', 'ArtifactProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                const resultItem = [];
                var i, i_items = result, i_len = result.length, item;
                for (i = 0; i < i_len; i++) {
                    item = result[i];
                    const item_obj = {
                        _id: item._id,
                        id: item.id,
                        owner: item.owner,
                        name: item.name,
                        description: item.description,
                        mainIttf: item.mainIttf,
                        wizziSchema: item.wizziSchema,
                        packiFiles: item.packiFiles
                    };
                    resultItem.push(item_obj);
                }
                resolve({
                    oper: 'getList',
                    ok: true,
                    item: resultItem
                });
            });
        });
    });
}
exports.getListArtifactProduction = getListArtifactProduction;
function getArtifactProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getArtifactProduction', owner, name);
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            ArtifactProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        oper: 'get',
                        ok: true,
                        item: result[0]
                    });
                }
                resolve({
                    oper: 'get',
                    ok: false,
                    message: 'artifact production not found'
                });
            });
        });
    });
}
exports.getArtifactProduction = getArtifactProduction;
function getArtifactProductionById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getArtifactProductionById', id);
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            ArtifactProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log(myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        oper: 'get',
                        ok: true,
                        item: result[0]
                    });
                }
                resolve({
                    oper: 'get',
                    ok: false,
                    message: 'artifact production not found'
                });
            });
        });
    });
}
exports.getArtifactProductionById = getArtifactProductionById;
function getArtifactProductionObject(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction(owner, name).then(
        // loog 'myname', 'getArtifactProductionObject.ap', ap
        // loog 'myname', 'getArtifactProductionObject.ap_packiFiles_object', ap_packiFiles_object
        // loog 'myname', 'getArtifactProductionObject', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const ap = result.item;
            const ap_packiFiles_object = JSON.parse(ap.packiFiles);
            const obj = Object.assign(Object.assign({}, ap._doc), { packiFiles: ap_packiFiles_object, _id: ap._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getArtifactProductionObject.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactProductionObject = getArtifactProductionObject;
function getArtifactProductionObjectById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProductionById(id).then(
        // loog 'myname', 'getArtifactProductionObjectById.ap', ap
        // loog 'myname', 'getArtifactProductionObjectById.ap_packiFiles_object', ap_packiFiles_object
        // loog 'myname', 'getArtifactProductionObjectById', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const ap = result.item;
            const ap_packiFiles_object = JSON.parse(ap.packiFiles);
            const obj = Object.assign(Object.assign({}, ap._doc), { packiFiles: ap_packiFiles_object, _id: ap._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getArtifactProductionObjectById.getArtifactProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactProductionObjectById = getArtifactProductionObjectById;
function createArtifactProduction(owner, name, description, mainIttf, wizziSchema, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'createArtifactProduction', owner, name, description, mainIttf, wizziSchema, packiFiles);
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            ArtifactProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                console.log(myname, 'getArtifactProduction', 'ArtifactProduction.find', 'result', result, __filename);
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'artifact production already exists'
                    });
                }
                const newArtifactProduction = new ArtifactProduction({
                    owner: owner,
                    name: name,
                    description: description,
                    mainIttf: mainIttf,
                    wizziSchema: wizziSchema,
                    packiFiles: packiFiles,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newArtifactProduction.save(function (err, doc) {
                    if (err) {
                        console.log(myname, 'createArtifactProduction', 'newArtifactProduction.save', 'error', err, __filename);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'create',
                        ok: true,
                        item: doc._doc,
                        message: 'artifact production created'
                    });
                });
            });
        });
    });
}
exports.createArtifactProduction = createArtifactProduction;
function updateArtifactProduction(id, owner, name, description, mainIttf, wizziSchema, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'updateArtifactProduction');
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            const query = {
                _id: id
            };
            const update = {};
            if (typeof owner !== 'undefined') {
                update['owner'] = owner;
            }
            if (typeof name !== 'undefined') {
                update['name'] = name;
            }
            if (typeof description !== 'undefined') {
                update['description'] = description;
            }
            if (typeof mainIttf !== 'undefined') {
                update['mainIttf'] = mainIttf;
            }
            if (typeof wizziSchema !== 'undefined') {
                update['wizziSchema'] = wizziSchema;
            }
            if (typeof packiFiles !== 'undefined') {
                update['packiFiles'] = packiFiles;
            }
            update['updated_at'] = new Date();
            ArtifactProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log(myname, 'updateArtifactProduction', 'ArtifactProduction.findOneAndUpdate', 'error', err, __filename);
                    return reject(err);
                }
                return resolve({
                    oper: 'update',
                    ok: true,
                    message: 'artifact production updated'
                });
            });
        });
    });
}
exports.updateArtifactProduction = updateArtifactProduction;
function deleteArtifactProduction(id, owner, name, description, mainIttf, wizziSchema, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'deleteArtifactProduction', owner, name);
        const ArtifactProduction = (0, artifact_1.GetArtifactProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            ArtifactProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log(myname, 'deleteArtifactProduction', 'ArtifactProduction.deleteOne', 'error', err, __filename);
                    return reject(err);
                }
                resolve({
                    oper: 'delete',
                    ok: true,
                    message: 'artifact production'
                });
            });
        });
    });
}
exports.deleteArtifactProduction = deleteArtifactProduction;
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
function getArtifactProductionObject_stop(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const ap = result.item;
            const ap_packiFiles_object = JSON.parse(ap.packiFiles);
            const obj = Object.assign(Object.assign({}, ap._doc), { packiFiles: ap_packiFiles_object, _id: ap._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getArtifactProductionObject.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactProductionObject_stop = getArtifactProductionObject_stop;
function getArtifactProductionObjectById_stop(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const ap = result.item;
            const ap_packiFiles_object = JSON.parse(ap.packiFiles);
            const obj = Object.assign(Object.assign({}, ap._doc), { packiFiles: ap_packiFiles_object, _id: ap._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getArtifactProductionObjectById.getArtifactProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactProductionObjectById_stop = getArtifactProductionObjectById_stop;
function getArtifactProduction_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        return new Promise((resolve, reject) => {
            let apValue = {
                mainIttf: "",
                packiFiles: {}
            };
            getArtifactProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const ap = result.item;
                const ap_packiFiles_object = JSON.parse(ap.packiFiles);
                if (ap.wizziSchema && ap.wizziSchema.length > 0) {
                    index_1.tFolderApi.getTFolder(owner, ap.wizziSchema).then((result) => {
                        if (!result.ok) {
                            apValue = {
                                mainIttf: ap.mainIttf,
                                packiFiles: ap_packiFiles_object
                            };
                            return resolve(apValue);
                        }
                        const tf = result.item;
                        const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                        apValue = {
                            mainIttf: ap.mainIttf,
                            packiFiles: mergePackiFiles(ap_packiFiles_object, tf_packiFiles_object)
                        };
                        return resolve(apValue);
                    }).catch((err) => {
                        console.log('getArtifactProduction_withCache.getTFolder.error', err, __filename);
                        return reject(err);
                    });
                }
                else {
                    apValue = {
                        mainIttf: ap.mainIttf,
                        packiFiles: ap_packiFiles_object
                    };
                    return resolve(apValue);
                }
            }).catch((err) => {
                console.log('getArtifactProduction_withCache.getArtifactProduction.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getArtifactProduction_withCache = getArtifactProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    artifactCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
function getDefaultContext_withCache(owner, sysContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        sysContext = sysContext || {};
        return new Promise((resolve, reject) => getArtifactContextItem(owner, 'wzCtx;wzctx', {}).then((resultItemContext) => {
            const defaultContext = Object.assign({}, sysContext, resultItemContext);
            resolve(defaultContext);
        }).catch((err) => {
            console.log('getDefaultContext_withCache.getArtifactContextItem.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getDefaultContext_withCache = getDefaultContext_withCache;
function getArtifactContext(owner, queryContextString, sysContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        sysContext = sysContext || {};
        return new Promise((resolve, reject) => {
            if (queryContextString && queryContextString.length > 0) {
                const contextItems = queryContextString.split('|');
                var j = 0;
                let resultContext = sysContext;
                (function next() {
                    var contextItem = contextItems[j++];
                    if (!contextItem) {
                        return resolve(resultContext);
                    }
                    getArtifactContextItem(owner, contextItem, sysContext).then((resultItemContext) => {
                        resultContext = Object.assign({}, resultContext, resultItemContext);
                        next();
                    }).catch((err) => {
                        console.log('getArtifactContext.getArtifactContextItem.error', err, __filename);
                        return reject(err);
                    });
                })();
            }
            else {
                resolve(sysContext);
            }
        });
    });
}
exports.getArtifactContext = getArtifactContext;
function getArtifactContextItem(owner, queryContextString, sysContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        sysContext = sysContext || {};
        /**
            * sample queryContextString: "wzCtx;wzctx.json"
            * context property 'wzCtx' from json document 'wzctx.json'
        */
        return new Promise((resolve, reject) => {
            if (queryContextString && queryContextString.length > 0) {
                const parts = queryContextString.split(';');
                const contextName = parts[0];
                const contextArtifactName = parts[1];
                const contextTransformation = parts.length > 2 ? parts[2] : null;
                if (contextTransformation) {
                    getArtifactTransformation(owner, contextArtifactName, sysContext, contextTransformation).then((result) => resolve(Object.assign({}, sysContext, {
                        [contextName]: result.transformResult
                    }))).catch((err) => {
                        console.log('getArtifactContextItem.getArtifactTransformation.error', err, __filename);
                        return reject(err);
                    });
                }
                else {
                    getArtifactGeneration(owner, contextArtifactName, sysContext).then((result) => {
                        const contextObject = JSON.parse(result.content);
                        resolve(Object.assign({}, sysContext, {
                            [contextName]: contextObject
                        }));
                    }).catch((err) => {
                        console.log('getArtifactContextItem.getArtifactGeneration.error', err, __filename);
                        return reject(err);
                    });
                }
            }
            else {
                resolve(sysContext);
            }
        });
    });
}
exports.getArtifactContextItem = getArtifactContextItem;
function getArtifactTransformation(owner, name, context, transformerName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction(owner, name).then((ap) => wizzi_1.wizziProds.transformModel(ap.mainIttf, ap.packiFiles, context, {
            transformer: transformerName
        }).then((result) => {
            return resolve(result);
        }).catch((err) => {
            console.log('getArtifactTransformation.transformModel.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactTransformation.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactTransformation = getArtifactTransformation;
function getArtifactTransformation_withPrepare(owner, productionName, queryContext, rootContext, transformerName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('getArtifactMTree_withPrepare', 'owner', owner, 'productionName', productionName, 'queryContext', queryContext, 'rootContext', Object.keys(rootContext), 'transformerName', transformerName, __filename);
        return new Promise((resolve, reject) => index_1.productionApi.prepareProduction('artifact', owner, productionName, queryContext, rootContext).then((productionObj) => {
            console.log('getArtifactTransformation_withPrepare.productionObj', 'mainIttf', productionObj.mainIttf, 'packiFiles', Object.keys(productionObj.packiFiles), 'context', Object.keys(productionObj.context), __filename);
            wizzi_1.wizziProds.transformModel(productionObj.mainIttf, productionObj.packiFiles, productionObj.context, {
                transformer: transformerName
            }).then((result) => {
                return resolve(result);
            }).catch((err) => {
                console.log('getArtifactTransformation_withPrepare.transformModel.error', err, __filename);
                return reject(err);
            });
        }).catch((err) => {
            console.log('getArtifactTransformation_withPrepare.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactTransformation_withPrepare = getArtifactTransformation_withPrepare;
function getArtifactGeneration(owner, name, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction_withCache(owner, name).then((ap) => wizzi_1.wizziProds.generateArtifact(ap.mainIttf, ap.packiFiles, context).then((result) => {
            const response = {
                content: result.artifactContent,
                contentLength: result.artifactContent.length,
                contentType: contentTypeFor(ap.mainIttf)
            };
            return resolve(response);
        }).catch((err) => {
            console.log('getArtifactGeneration.generateArtifact.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactGeneration.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactGeneration = getArtifactGeneration;
function getArtifactGeneration_withPrepare(owner, productionName, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('getArtifactGeneration_withPrepare', 'owner', owner, 'productionName', productionName, 'queryContext', queryContext, 'rootContext', Object.keys(rootContext), __filename);
        return new Promise((resolve, reject) => index_1.productionApi.prepareProduction('artifact', owner, productionName, queryContext, rootContext).then((productionObj) => {
            console.log('getArtifactGeneration_withPrepare.productionObj', 'mainIttf', productionObj.mainIttf, 'packiFiles', Object.keys(productionObj.packiFiles), 'context', Object.keys(productionObj.context), __filename);
            wizzi_1.wizziProds.generateArtifact(productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result) => {
                console.log('getArtifactGeneration_withPrepare', productionName, result.artifactContent.length, __filename);
                console.log('getArtifactGeneration_withPrepare', productionName, result.artifactContent.substring(0, 200) + '...', __filename);
                const response = {
                    content: result.artifactContent,
                    contentLength: result.artifactContent.length,
                    contentType: contentTypeFor(productionObj.mainIttf)
                };
                return resolve(response);
            }).catch((err) => {
                console.log('getArtifactGeneration_withPrepare.generateArtifact.error', err, __filename);
                return reject(err);
            });
        }).catch((err) => {
            console.log('getArtifactGeneration_withPrepare.prepareProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactGeneration_withPrepare = getArtifactGeneration_withPrepare;
const extContentTypeMap = {
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.ittf': 'text/plain',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.scss': 'text/scss',
    '.svg': 'image/svg+xml',
    '.ts': 'text/typescript',
    '.ttf': 'application/x-font-ttf',
    '.txt': 'text/plain',
    '.vtt': 'text/vtt',
    '.woff': 'application/x-font-woff',
    '.yaml': 'text/yanl',
    '.yml': 'text/yanl',
    '.xml': 'text/xml'
};
function ittfSchemaOf(file) {
    const nameParts = path_1.default.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return nameParts[nameParts.length - 2];
    }
    return undefined;
}
function contentTypeFor(file) {
    const ittfSchema = ittfSchemaOf(file);
    if (ittfSchema) {
        return extContentTypeMap['.' + ittfSchema];
    }
    return undefined;
}
function getArtifactMTree(owner, productionName, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction_withCache(owner, productionName).then((ap) => wizzi_1.wizziProds.mTree(ap.mainIttf, ap.packiFiles, rootContext).then((result) => {
            const response = {
                content: result.mTreeIttf,
                contentLength: result.mTreeIttf.length,
                contentType: contentTypeFor('x.ittf.ittf')
            };
            return resolve(response);
        }).catch((err) => {
            console.log('getArtifactMTree.mTree.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactMTree.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactMTree = getArtifactMTree;
function getArtifactMTree_withPrepare(owner, productionName, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('getArtifactMTree_withPrepare', 'owner', owner, 'productionName', productionName, 'queryContext', queryContext, 'rootContext', Object.keys(rootContext), __filename);
        return new Promise((resolve, reject) => index_1.productionApi.prepareProduction('artifact', owner, productionName, queryContext, rootContext).then((productionObj) => wizzi_1.wizziProds.mTree(productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result) => {
            const response = {
                content: result.mTreeIttf,
                contentLength: result.mTreeIttf.length,
                contentType: contentTypeFor('x.ittf.ittf')
            };
            return resolve(response);
        }).catch((err) => {
            console.log('getArtifactMTree.mTree.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactMTree.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactMTree_withPrepare = getArtifactMTree_withPrepare;
function getArtifactMTreeBuildupScript(owner, productionName, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getArtifactProduction_withCache(owner, productionName).then((ap) => wizzi_1.wizziProds.mTreeBuildupScript(ap.mainIttf, ap.packiFiles, rootContext).then((result) => {
            const response = {
                content: result.mTreeBuildupScript,
                contentLength: result.mTreeBuildupScript.length,
                contentType: contentTypeFor('x.ittf.ittf')
            };
            return resolve(response);
        }).catch((err) => {
            console.log('getArtifactMTreeBuildupScript.mTree.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactMTreeBuildupScript.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactMTreeBuildupScript = getArtifactMTreeBuildupScript;
function getArtifactMTreeBuildupScript_withPrepare(owner, productionName, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log('getArtifactMTreeBuildupScript_withPrepare', 'owner', owner, 'productionName', productionName, 'queryContext', queryContext, 'rootContext', Object.keys(rootContext), __filename);
        return new Promise((resolve, reject) => index_1.productionApi.prepareProduction('artifact', owner, productionName, queryContext, rootContext).then((productionObj) => wizzi_1.wizziProds.mTreeBuildupScript(productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result) => {
            const response = {
                content: result.mTreeBuildupScript,
                contentLength: result.mTreeBuildupScript.length,
                contentType: contentTypeFor('x.ittf.ittf')
            };
            return resolve(response);
        }).catch((err) => {
            console.log('getArtifactMTreeBuildupScript.mTree.error', err, __filename);
            return reject(err);
        })).catch((err) => {
            console.log('getArtifactMTreeBuildupScript.getArtifactProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getArtifactMTreeBuildupScript_withPrepare = getArtifactMTreeBuildupScript_withPrepare;
function prepareGenerationFromWizziJson(req_files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let retPackiFiles = req_files;
            const wizziJson = req_files['wizzi.json.ittf'];
            if (wizziJson) {
                wizzi_1.wizziProds.generateArtifact('wizzi.json.ittf', {
                    'wizzi.json.ittf': {
                        type: wizziJson.type,
                        contents: wizziJson.contents
                    }
                }, {}).then((result) => {
                    const wizziJsonObj = JSON.parse(result.artifactContent);
                    getFragmentsFromWizziJson(wizziJsonObj).then((resultPackiFiles) => {
                        retPackiFiles = mergePackiFiles(retPackiFiles, resultPackiFiles);
                        getContextFromWizziJson(wizziJsonObj).then((resultContext) => {
                            return resolve({
                                packiFiles: retPackiFiles,
                                context: resultContext
                            });
                        });
                    }).catch((err) => {
                        console.log('getArtifactGeneration.getFragmentsFromWizziJson.error', err, __filename);
                        return reject(err);
                    });
                }).catch((err) => {
                    console.log('getArtifactGeneration.generateArtifact.error', err, __filename);
                    return reject(err);
                });
            }
            else {
                resolve({
                    packiFiles: req_files,
                    context: {}
                });
            }
        });
    });
}
exports.prepareGenerationFromWizziJson = prepareGenerationFromWizziJson;
function getFragmentsFromWizziJson(wizziJsonObj) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let retPackiFiles = {};
            if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
                return resolve(retPackiFiles);
            }
            var j = 0;
            (function next() {
                var tfolder = wizziJsonObj.fragments[j++];
                if (!tfolder) {
                    return resolve(retPackiFiles);
                }
                const parts = tfolder.path.split('/');
                index_1.tFolderApi.getTFolder(parts[0], parts.slice(1).join('/')).then((result) => {
                    const tf = result.item;
                    const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                    retPackiFiles = mergePackiFiles(retPackiFiles, tf_packiFiles_object);
                    next();
                }).catch((err) => {
                    console.log('getFragmentsFromWizziJson.getTFolder.error', err, __filename);
                    return reject(err);
                });
            })();
        });
    });
}
exports.getFragmentsFromWizziJson = getFragmentsFromWizziJson;
function getContextFromWizziJson(wizziJsonObj) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let retContext = {};
            if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
                return resolve(retContext);
            }
            var j = 0;
            (function next() {
                var contextDef = wizziJsonObj.contexts[j++];
                if (!contextDef) {
                    return resolve(retContext);
                }
                const parts = contextDef.path.split('/');
                getArtifactContextItem(parts[0], contextDef.name + ';' + parts.slice(1).join('/')).then((contextObject) => {
                    retContext = Object.assign({}, retContext, contextObject);
                    next();
                }).catch((err) => {
                    console.log('getContextFromWizziJson.getArtifactContextItem.error', err, __filename);
                    return reject(err);
                });
            })();
        });
    });
}
exports.getContextFromWizziJson = getContextFromWizziJson;
//# sourceMappingURL=artifact.js.map