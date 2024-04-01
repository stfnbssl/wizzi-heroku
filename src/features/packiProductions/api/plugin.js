"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.getPluginProduction_withCache = exports.getPluginProductionObjectById_stop = exports.getPluginProductionObject_stop = exports.deletePluginProduction = exports.updatePluginProduction = exports.createPluginProduction = exports.getPluginProductionObjectById = exports.getPluginProductionObject = exports.getPluginProductionById = exports.getPluginProduction = exports.getPluginProductionList = exports.validatePluginProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\api\plugin.ts.ittf
    utc time: Mon, 01 Apr 2024 15:09:26 GMT
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const env_1 = require("../../config/env");
const wizzi_1 = require("../../wizzi");
const plugin_1 = require("../mongo/plugin");
const myname = 'features.production.api.PluginProduction';
const pluginProductionCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validatePluginProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            PluginProduction.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'plugin production already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validatePluginProduction = validatePluginProduction;
function getPluginProductionList(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            const query = PluginProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPluginProductionList', 'PluginProduction.find', 'error', err);
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
                    oper: 'getPluginProductionList',
                    ok: true,
                    item: resultItem
                });
            });
        });
    });
}
exports.getPluginProductionList = getPluginProductionList;
function getPluginProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PluginProduction.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPluginProduction', 'PluginProduction.find', 'error', err);
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
                    message: 'plugin production not found'
                });
            });
        });
    });
}
exports.getPluginProduction = getPluginProduction;
function getPluginProductionById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            PluginProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPluginProduction', 'PluginProduction.find', 'error', err);
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
                    oper: 'getPluginProduction',
                    ok: false,
                    message: 'plugin production not found'
                });
            });
        });
    });
}
exports.getPluginProductionById = getPluginProductionById;
function getPluginProductionObject(owner, name, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const lp = result.item;
            return resolve(_createPluginProductionObject(lp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.pluginProduction.getPluginProductionObject.getPluginProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObject = getPluginProductionObject;
function getPluginProductionObjectById(id, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const lp = result.item;
            return resolve(_createPluginProductionObject(lp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.pluginProduction.getPluginProductionObjectById.getPluginProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObjectById = getPluginProductionObjectById;
function _createPluginProductionObject(lp, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const lp_packiFiles_object = JSON.parse(lp.packiFiles);
            const obj = Object.assign(Object.assign({}, lp._doc), { packiFiles: lp_packiFiles_object, _id: lp._id.toString(), packiProduction: "PluginProduction", packiConfig: lp_packiFiles_object[env_1.packiConfigPath], packiConfigObj: null });
            if (loadPackiConfig) {
                if (!obj.packiConfig) {
                    return reject({
                        message: 'Missing file ' + env_1.packiConfigPath + ' in PluginProduction'
                    });
                }
                wizzi_1.wizziProds.generateArtifact(env_1.packiConfigPath, {
                    [env_1.packiConfigPath]: {
                        type: obj.packiConfig.type,
                        contents: obj.packiConfig.contents
                    }
                }, {}).then((generationResult) => {
                    obj.packiConfigObj = JSON.parse(generationResult.artifactContent);
                    return resolve(obj);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.production.api.pluginProduction.getPluginProductionObject._createPluginProductionObject.error', err);
                    return reject(err);
                });
            }
            else {
                return resolve(obj);
            }
        });
    });
}
function createPluginProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PluginProduction.find(query, 
            // loog myname, 'getPluginProduction', 'PluginProduction.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPluginProduction', 'PluginProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'plugin production already exists'
                    });
                }
                const newPluginProduction = new PluginProduction({
                    owner: owner,
                    name: name,
                    description: description,
                    packiFiles: packiFiles,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newPluginProduction.save(function (err, doc) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createPluginProduction', 'newPluginProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'createPluginProduction',
                        ok: true,
                        item: doc._doc,
                        message: 'plugin production created'
                    });
                });
            });
        });
    });
}
exports.createPluginProduction = createPluginProduction;
function updatePluginProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            var query;
            if (id && id.length > 0) {
                query = {
                    _id: id
                };
            }
            else {
                query = {
                    owner: owner,
                    name: name
                };
            }
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
            PluginProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updatePluginProduction', 'PluginProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updatePluginProduction', 'PluginProduction.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                        oper: 'updatePluginProduction',
                        ok: false,
                        message: 'plugin production document not found: ' + id
                    });
                }
                return resolve({
                    oper: 'updatePluginProduction',
                    ok: true,
                    message: 'plugin production updated'
                });
            });
        });
    });
}
exports.updatePluginProduction = updatePluginProduction;
function deletePluginProduction(id, owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            var query;
            if (id && id.length > 0) {
                query = {
                    _id: id
                };
            }
            else {
                query = {
                    owner: owner,
                    name: name
                };
            }
            PluginProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deletePluginProduction', 'PluginProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deletePluginProduction',
                    ok: true,
                    message: 'plugin production'
                });
            });
        });
    });
}
exports.deletePluginProduction = deletePluginProduction;
function getPluginProductionObject_stop(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProduction(owner, name).then((result) => {
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
            console.log("[31m%s[0m", 'getPluginProductionObject.getPluginProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObject_stop = getPluginProductionObject_stop;
function getPluginProductionObjectById_stop(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProductionById(id).then((result) => {
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
            console.log("[31m%s[0m", 'getPluginProductionObjectById.getPluginProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObjectById_stop = getPluginProductionObjectById_stop;
function getPluginProduction_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        return new Promise((resolve, reject) => {
            let ppValue = {
                packiFiles: {}
            };
            getPluginProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf = result.item;
                const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                ppValue = {
                    packiFiles: tf_packiFiles_object
                };
                return resolve(ppValue);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPluginProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            });
        });
    });
}
exports.getPluginProduction_withCache = getPluginProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    pluginProductionCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
//# sourceMappingURL=plugin.js.map