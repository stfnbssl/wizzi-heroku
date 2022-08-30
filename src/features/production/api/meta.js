"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatePackiFiles = exports.invalidateCache = exports.getMetaProduction_withCache = exports.getMetaProductionObjectById_stop = exports.getMetaProductionObject_stop = exports.deleteMetaProduction = exports.updateMetaProduction = exports.createMetaProduction = exports.getMetaProductionObjectById = exports.getMetaProductionObject = exports.getMetaProductionById = exports.getMetaProduction = exports.getListMetaProduction = exports.validateMetaProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\api\meta.ts.ittf
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const meta_1 = require("../mongo/meta");
const wizzi_1 = require("../../wizzi");
const index_1 = require("../index");
const myname = 'features.production.api.meta';
const metaCache = new node_cache_1.default({
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
        console.log(myname, 'getListMetaProduction', 'options', options);
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
                    console.log(myname, 'getListMetaProduction', 'MetaProduction.find', 'error', err, __filename);
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
        console.log(myname, 'getMetaProduction', owner, name);
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            MetaProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getMetaProduction', 'MetaProduction.find', 'error', err, __filename);
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
        console.log(myname, 'getMetaProductionById', id);
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            MetaProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log(myname, 'getMetaProduction', 'MetaProduction.find', 'error', err, __filename);
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
function getMetaProductionObject(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProduction(owner, name).then(
        // loog 'myname', 'getMetaProductionObject.mp', mp
        // loog 'myname', 'getMetaProductionObject.mp_packiFiles_object', mp_packiFiles_object
        // loog 'myname', 'getMetaProductionObject', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const mp = result.item;
            const mp_packiFiles_object = JSON.parse(mp.packiFiles);
            const obj = Object.assign(Object.assign({}, mp._doc), { packiFiles: mp_packiFiles_object, _id: mp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getMetaProductionObject.getMetaProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObject = getMetaProductionObject;
function getMetaProductionObjectById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getMetaProductionById(id).then(
        // loog 'myname', 'getMetaProductionObjectById.mp', mp
        // loog 'myname', 'getMetaProductionObjectById.mp_packiFiles_object', mp_packiFiles_object
        // loog 'myname', 'getMetaProductionObjectById', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const mp = result.item;
            const mp_packiFiles_object = JSON.parse(mp.packiFiles);
            const obj = Object.assign(Object.assign({}, mp._doc), { packiFiles: mp_packiFiles_object, _id: mp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getMetaProductionObjectById.getMetaProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObjectById = getMetaProductionObjectById;
function createMetaProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'createMetaProduction', owner, name, description, packiFiles);
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            MetaProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getMetaProduction', 'MetaProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                console.log(myname, 'getMetaProduction', 'MetaProduction.find', 'result', result, __filename);
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
                        console.log(myname, 'createMetaProduction', 'newMetaProduction.save', 'error', err, __filename);
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
        console.log(myname, 'updateMetaProduction', owner, name, description, packiFiles);
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
                    console.log(myname, 'updateMetaProduction', 'MetaProduction.findOneAndUpdate', 'error', err, __filename);
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
        console.log(myname, 'deleteMetaProduction', owner, name);
        const MetaProduction = (0, meta_1.GetMetaProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            MetaProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log(myname, 'deleteMetaProduction', 'MetaProduction.deleteOne', 'error', err, __filename);
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
            console.log('getMetaProductionObject.getMetaProduction.error', err, __filename);
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
            console.log('getMetaProductionObjectById.getMetaProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getMetaProductionObjectById_stop = getMetaProductionObjectById_stop;
function getMetaProduction_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        console.log('getMetaProduction_withCache.cacheKey', cacheKey, __filename);
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
                console.log('getMetaProduction_withCache.getArtifactProduction.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getMetaProduction_withCache = getMetaProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    metaCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
function getTemplatePackiFiles(metaId, cliCtx, queryString, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getTemplatePackiFiles', 'metaId', metaId, 'cliCtx', Object.keys(cliCtx), 'queryString', queryString, 'rootContext', Object.keys(rootContext), __filename);
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
            index_1.productionApi.prepareProductionById('meta', metaId, queryString, rootContext).then((metaProductionSet) => {
                console.log('getTemplatePackiFiles.metaProductionSet', 'packiFiles', Object.keys(metaProductionSet.packiFiles), 'context', Object.keys(metaProductionSet.context), __filename);
                const context = Object.assign({}, metaProductionSet.context, {
                    cliCtx: cliCtx
                });
                wizzi_1.wizziProds.generateFolderArtifacts('template', 'output', metaProductionSet.packiFiles, context).then((packiFiles) => {
                    console.log('getTemplatePackiFiles.generatedFolderArtifacts', 'packiFiles', Object.keys(packiFiles), __filename);
                    resolve(packiFiles);
                }).catch((err) => {
                    console.log('getTemplatePackiFiles.generateFolderArtifacts.error', err, __filename);
                    return reject(err);
                });
            }).catch((err) => {
                console.log('getTemplatePackiFiles.prepareProduction.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getTemplatePackiFiles = getTemplatePackiFiles;
//# sourceMappingURL=meta.js.map