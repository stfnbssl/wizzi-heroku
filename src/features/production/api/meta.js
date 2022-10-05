"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetaProductionById = exports.generateMetaProduction = exports.getTemplatePackiFiles = exports.invalidateCache = exports.getMetaProduction_withCache = exports.getMetaProductionObjectById_stop = exports.getMetaProductionObject_stop = exports.deleteMetaProduction = exports.updateMetaProduction = exports.createMetaProduction = exports.getMetaProductionObjectById = exports.getMetaProductionObject = exports.getMetaProductionById = exports.getMetaProduction = exports.getListMetaProduction = exports.validateMetaProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\api\meta.ts.ittf
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const env_1 = require("../../config/env");
const wizzi_1 = require("../../wizzi");
const meta_1 = require("../mongo/meta");
const index_1 = require("../index");
const myname = 'features.production.api.MetaProduction';
const metaProductionCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validateMetaProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            MetaProduction.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'meta production already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validateMetaProduction = validateMetaProduction;
function getListMetaProduction(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            const query = MetaProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getListMetaProduction', 'MetaProduction.find', 'error', err);
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
exports.getListMetaProduction = getListMetaProduction;
function getMetaProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            MetaProduction.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getMetaProduction', 'MetaProduction.find', 'error', err);
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
                    message: 'meta production not found'
                });
            });
        });
    });
}
exports.getMetaProduction = getMetaProduction;
function getMetaProductionById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            MetaProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getMetaProduction', 'MetaProduction.find', 'error', err);
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
                    message: 'meta production not found'
                });
            });
        });
    });
}
exports.getMetaProductionById = getMetaProductionById;
function getMetaProductionObject(owner, name, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const mp = result.item;
            return resolve(_createMetaProductionObject(mp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.metaProduction.getMetaProductionObject.getMetaProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObject = getMetaProductionObject;
function getMetaProductionObjectById(id, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const mp = result.item;
            return resolve(_createMetaProductionObject(mp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.metaProduction.getMetaProductionObjectById.getMetaProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObjectById = getMetaProductionObjectById;
function _createMetaProductionObject(mp, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'myname', '_createMetaProductionObject.mp', Object.keys(mp)
        // loog 'myname', '_createMetaProductionObject.mp_packiFiles_object', Object.keys(mp_packiFiles_object)
        (resolve, reject) => {
            const mp_packiFiles_object = JSON.parse(mp.packiFiles);
            const obj = Object.assign(Object.assign({}, mp._doc), { packiFiles: mp_packiFiles_object, _id: mp._id.toString(), packiProduction: "MetaProduction", packiConfig: mp_packiFiles_object[env_1.packiConfigPath], packiConfigObj: null });
            if (loadPackiConfig) {
                if (!obj.packiConfig) {
                    return reject({
                        message: 'Missing file ' + env_1.packiConfigPath + ' in MetaProduction'
                    });
                }
                wizzi_1.wizziProds.generateArtifact(env_1.packiConfigPath, {
                    [env_1.packiConfigPath]: {
                        type: obj.packiConfig.type,
                        contents: obj.packiConfig.contents
                    }
                }, {}).then(
                // loog myname, '_createMetaProductionObject', 'obj.packiConfigObj', JSON.stringify(obj.packiConfigObj)
                (generationResult) => {
                    obj.packiConfigObj = JSON.parse(generationResult.artifactContent);
                    return resolve(obj);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.production.api.metaProduction.getMetaProductionObject._createMetaProductionObject.error', err);
                    return reject(err);
                });
            }
            // loog 'myname', '_createMetaProductionObject.resolve', Object.keys(obj)
            else {
                return resolve(obj);
            }
        });
    });
}
function createMetaProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            MetaProduction.find(query, 
            // loog myname, 'getMetaProduction', 'MetaProduction.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getMetaProduction', 'MetaProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'meta production already exists'
                    });
                }
                const newMetaProduction = new MetaProduction({
                    owner: owner,
                    name: name,
                    description: description,
                    packiFiles: packiFiles,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newMetaProduction.save(function (err, doc) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createMetaProduction', 'newMetaProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'create',
                        ok: true,
                        item: doc._doc,
                        message: 'meta production created'
                    });
                });
            });
        });
    });
}
exports.createMetaProduction = createMetaProduction;
function updateMetaProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
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
            if (typeof packiFiles !== 'undefined') {
                update['packiFiles'] = packiFiles;
            }
            update['updated_at'] = new Date();
            MetaProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateMetaProduction', 'MetaProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                return resolve({
                    oper: 'update',
                    ok: true,
                    message: 'meta production updated'
                });
            });
        });
    });
}
exports.updateMetaProduction = updateMetaProduction;
function deleteMetaProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            MetaProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteMetaProduction', 'MetaProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'delete',
                    ok: true,
                    message: 'meta production'
                });
            });
        });
    });
}
exports.deleteMetaProduction = deleteMetaProduction;
function getMetaProductionObject_stop(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            const obj = Object.assign(Object.assign({}, tf._doc), { packiFiles: tf_packiFiles_object, _id: tf._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getMetaProductionObject.getMetaProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObject_stop = getMetaProductionObject_stop;
function getMetaProductionObjectById_stop(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            const obj = Object.assign(Object.assign({}, tf._doc), { packiFiles: tf_packiFiles_object, _id: tf._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getMetaProductionObjectById.getMetaProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObjectById_stop = getMetaProductionObjectById_stop;
function getMetaProduction_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        return new Promise((resolve, reject) => {
            let mpValue = {
                packiFiles: {}
            };
            getMetaProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf = result.item;
                const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                mpValue = {
                    packiFiles: tf_packiFiles_object
                };
                return resolve(mpValue);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getMetaProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            });
        });
    });
}
exports.getMetaProduction_withCache = getMetaProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    metaProductionCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
function getTemplatePackiFiles(metaId, cliCtx, queryString, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        function getPackiFiles(mainIttf) {
            const ret = {};
            ret[mainIttf] = {
                type: 'CODE',
                contents: ''
            };
            return ret;
        }
        return new Promise((resolve, reject) => {
            if (!metaId || metaId.length < 1) {
                return resolve(getPackiFiles('index.js.ittf'));
            }
            index_1.productionApi.prepareProductionById('meta', metaId, queryString, rootContext).then(
            // loog 'getTemplatePackiFiles.metaProductionSet', 'packiFiles', Object.keys(metaProductionSet.packiFiles), 'context', Object.keys(metaProductionSet.context),
            (metaProductionSet) => {
                const context = Object.assign({}, metaProductionSet.context, {
                    cliCtx: cliCtx
                });
                wizzi_1.wizziProds.generateFolderArtifacts('template', 'output', metaProductionSet.packiFiles, context).then(
                // loog 'getTemplatePackiFiles.generatedFolderArtifacts', 'packiFiles', Object.keys(packiFiles),
                (packiFiles) => resolve(packiFiles)).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'getTemplatePackiFiles.generateFolderArtifacts.error', err);
                    return reject(err);
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getTemplatePackiFiles.prepareProduction.error', err);
                return reject(err);
            });
        });
    });
}
exports.getTemplatePackiFiles = getTemplatePackiFiles;
function generateMetaProduction(owner, name, cliCtx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return getMetaProduction(owner, name).then(
        // loog myname, 'generateMetaProduction.gotMetaProductionItem', 'CRUDResult.item.id,keys', metaProduction.item.id, Object.keys(metaProduction.item)
        (metaProduction) => {
            return generateMetaProductionById(metaProduction.item.id, cliCtx);
        });
    });
}
exports.generateMetaProduction = generateMetaProduction;
function generateMetaProductionById(metaId, cliCtx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => index_1.productionApi.prepareProductionById('meta', metaId, "", {}).then(
        // loog 'generateMetaProductionById.metaProductionSet', 'packiFiles', Object.keys(metaProductionSet.packiFiles), 'context', Object.keys(metaProductionSet.context),
        (metaProductionSet) => {
            const metaContext = Object.assign({}, metaProductionSet.context, {
                cliCtx: cliCtx
            });
            wizzi_1.wizziProds.metaGenerate(metaProductionSet.packiFiles, metaContext).then(
            // loog 'generateMetaProductionById.metaGenerate.result', 'packiFiles', Object.keys(packiFiles),
            (packiFiles) => resolve(packiFiles)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'generateMetaProductionById.metaGenerate.error', err);
                return reject(err);
            });
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'generateMetaProductionById.prepareProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.generateMetaProductionById = generateMetaProductionById;
//# sourceMappingURL=meta.js.map