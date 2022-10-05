"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.getTFolder_withCache = exports.getTFolderObjectById_stop = exports.getTFolderObject_stop = exports.deleteTFolder = exports.updateTFolder = exports.createTFolder = exports.getTFolderObjectById = exports.getTFolderObject = exports.getTFolderById = exports.getTFolder = exports.getListTFolder = exports.validateTFolder = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\api\tfolder.ts.ittf
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const env_1 = require("../../config/env");
const wizzi_1 = require("../../wizzi");
const tfolder_1 = require("../mongo/tfolder");
const myname = 'features.production.api.TFolder';
const tFolderCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validateTFolder(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            TFolder.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'tFolder already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validateTFolder = validateTFolder;
function getListTFolder(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            const query = TFolder.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getListTFolder', 'TFolder.find', 'error', err);
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
exports.getListTFolder = getListTFolder;
function getTFolder(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            TFolder.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolder', 'TFolder.find', 'error', err);
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
                    message: 'tFolder not found'
                });
            });
        });
    });
}
exports.getTFolder = getTFolder;
function getTFolderById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            TFolder.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolder', 'TFolder.find', 'error', err);
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
                    message: 'tFolder not found'
                });
            });
        });
    });
}
exports.getTFolderById = getTFolderById;
function getTFolderObject(owner, name, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getTFolder(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            return resolve(_createTFolderObject(tf, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.tFolder.getTFolderObject.getTFolder.error', err);
            return reject(err);
        }));
    });
}
exports.getTFolderObject = getTFolderObject;
function getTFolderObjectById(id, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getTFolderById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            return resolve(_createTFolderObject(tf, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.tFolder.getTFolderObjectById.getTFolderById.error', err);
            return reject(err);
        }));
    });
}
exports.getTFolderObjectById = getTFolderObjectById;
function _createTFolderObject(tf, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'myname', '_createTFolderObject.tf', Object.keys(tf)
        // loog 'myname', '_createTFolderObject.tf_packiFiles_object', Object.keys(tf_packiFiles_object)
        (resolve, reject) => {
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            const obj = Object.assign(Object.assign({}, tf._doc), { packiFiles: tf_packiFiles_object, _id: tf._id.toString(), packiProduction: "TFolder", packiConfig: tf_packiFiles_object[env_1.packiConfigPath], packiConfigObj: null });
            if (loadPackiConfig) {
                if (!obj.packiConfig) {
                    return reject({
                        message: 'Missing file ' + env_1.packiConfigPath + ' in TFolder'
                    });
                }
                wizzi_1.wizziProds.generateArtifact(env_1.packiConfigPath, {
                    [env_1.packiConfigPath]: {
                        type: obj.packiConfig.type,
                        contents: obj.packiConfig.contents
                    }
                }, {}).then(
                // loog myname, '_createTFolderObject', 'obj.packiConfigObj', JSON.stringify(obj.packiConfigObj)
                (generationResult) => {
                    obj.packiConfigObj = JSON.parse(generationResult.artifactContent);
                    return resolve(obj);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.production.api.tFolder.getTFolderObject._createTFolderObject.error', err);
                    return reject(err);
                });
            }
            // loog 'myname', '_createTFolderObject.resolve', Object.keys(obj)
            else {
                return resolve(obj);
            }
        });
    });
}
function createTFolder(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            TFolder.find(query, 
            // loog myname, 'getTFolder', 'TFolder.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolder', 'TFolder.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'tFolder already exists'
                    });
                }
                const newTFolder = new TFolder({
                    owner: owner,
                    name: name,
                    description: description,
                    packiFiles: packiFiles,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newTFolder.save(function (err, doc) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createTFolder', 'newTFolder.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'create',
                        ok: true,
                        item: doc._doc,
                        message: 'tFolder created'
                    });
                });
            });
        });
    });
}
exports.createTFolder = createTFolder;
function updateTFolder(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
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
            TFolder.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateTFolder', 'TFolder.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                return resolve({
                    oper: 'update',
                    ok: true,
                    message: 'tFolder updated'
                });
            });
        });
    });
}
exports.updateTFolder = updateTFolder;
function deleteTFolder(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const TFolder = (0, tfolder_1.GetTFolderModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            TFolder.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteTFolder', 'TFolder.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'delete',
                    ok: true,
                    message: 'tFolder'
                });
            });
        });
    });
}
exports.deleteTFolder = deleteTFolder;
function getTFolderObject_stop(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getTFolder(owner, name).then((result) => {
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
            console.log("[31m%s[0m", 'getTFolderObject.getTFolder.error', err);
            return reject(err);
        }));
    });
}
exports.getTFolderObject_stop = getTFolderObject_stop;
function getTFolderObjectById_stop(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getTFolderById(id).then((result) => {
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
            console.log("[31m%s[0m", 'getTFolderObjectById.getTFolderById.error', err);
            return reject(err);
        }));
    });
}
exports.getTFolderObjectById_stop = getTFolderObjectById_stop;
function getTFolder_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        return new Promise((resolve, reject) => {
            let tfValue = {
                packiFiles: {}
            };
            getTFolder(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf = result.item;
                const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                tfValue = {
                    packiFiles: tf_packiFiles_object
                };
                return resolve(tfValue);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getTFolder_withCache.getArtifactProduction.error', err);
                return reject(err);
            });
        });
    });
}
exports.getTFolder_withCache = getTFolder_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    tFolderCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
//# sourceMappingURL=tfolder.js.map