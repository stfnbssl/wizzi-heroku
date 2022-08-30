"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.getPluginProduction_withCache = exports.getPluginProductionObjectById_stop = exports.getPluginProductionObject_stop = exports.deletePluginProduction = exports.updatePluginProduction = exports.createPluginProduction = exports.getPluginProductionObjectById = exports.getPluginProductionObject = exports.getPluginProductionById = exports.getPluginProduction = exports.getListPluginProduction = exports.validatePluginProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\api\plugin.ts.ittf
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const plugin_1 = require("../mongo/plugin");
const myname = 'features.production.api.plugin';
const pluginCache = new node_cache_1.default({
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
function getListPluginProduction(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        console.log(myname, 'getListPluginProduction', 'options', options);
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
                    console.log(myname, 'getListPluginProduction', 'PluginProduction.find', 'error', err, __filename);
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
exports.getListPluginProduction = getListPluginProduction;
function getPluginProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getPluginProduction', owner, name);
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PluginProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getPluginProduction', 'PluginProduction.find', 'error', err, __filename);
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
        console.log(myname, 'getPluginProductionById', id);
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            PluginProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log(myname, 'getPluginProduction', 'PluginProduction.find', 'error', err, __filename);
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
exports.getPluginProductionById = getPluginProductionById;
function getPluginProductionObject(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProduction(owner, name).then(
        // loog 'myname', 'getPluginProductionObject.lp', lp
        // loog 'myname', 'getPluginProductionObject.lp_packiFiles_object', lp_packiFiles_object
        // loog 'myname', 'getPluginProductionObject', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const lp = result.item;
            const lp_packiFiles_object = JSON.parse(lp.packiFiles);
            const obj = Object.assign(Object.assign({}, lp._doc), { packiFiles: lp_packiFiles_object, _id: lp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPluginProductionObject.getPluginProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObject = getPluginProductionObject;
function getPluginProductionObjectById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPluginProductionById(id).then(
        // loog 'myname', 'getPluginProductionObjectById.lp', lp
        // loog 'myname', 'getPluginProductionObjectById.lp_packiFiles_object', lp_packiFiles_object
        // loog 'myname', 'getPluginProductionObjectById', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const lp = result.item;
            const lp_packiFiles_object = JSON.parse(lp.packiFiles);
            const obj = Object.assign(Object.assign({}, lp._doc), { packiFiles: lp_packiFiles_object, _id: lp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPluginProductionObjectById.getPluginProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPluginProductionObjectById = getPluginProductionObjectById;
function createPluginProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'createPluginProduction', owner, name, description, packiFiles);
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PluginProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getPluginProduction', 'PluginProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                console.log(myname, 'getPluginProduction', 'PluginProduction.find', 'result', result, __filename);
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
                        console.log(myname, 'createPluginProduction', 'newPluginProduction.save', 'error', err, __filename);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'create',
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
        console.log(myname, 'updatePluginProduction', owner, name, description, packiFiles);
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
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
            PluginProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log(myname, 'updatePluginProduction', 'PluginProduction.findOneAndUpdate', 'error', err, __filename);
                    return reject(err);
                }
                return resolve({
                    oper: 'update',
                    ok: true,
                    message: 'plugin production updated'
                });
            });
        });
    });
}
exports.updatePluginProduction = updatePluginProduction;
function deletePluginProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'deletePluginProduction', owner, name);
        const PluginProduction = (0, plugin_1.GetPluginProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            PluginProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log(myname, 'deletePluginProduction', 'PluginProduction.deleteOne', 'error', err, __filename);
                    return reject(err);
                }
                resolve({
                    oper: 'delete',
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
            console.log('getPluginProductionObject.getPluginProduction.error', err, __filename);
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
            console.log('getPluginProductionObjectById.getPluginProductionById.error', err, __filename);
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
                console.log('getPluginProduction_withCache.getArtifactProduction.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getPluginProduction_withCache = getPluginProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    pluginCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
//# sourceMappingURL=plugin.js.map