"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.getPackageProduction_withCache = exports.getPackageProductionObjectById_stop = exports.getPackageProductionObject_stop = exports.deletePackageProduction = exports.updatePackageProduction = exports.createPackageProduction = exports.getPackageProductionObjectById = exports.getPackageProductionObject = exports.getPackageProductionById = exports.getPackageProduction = exports.getListPackageProduction = exports.validatePackageProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\api\package.ts.ittf
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const package_1 = require("../mongo/package");
const myname = 'features.production.api.package';
const packageCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validatePackageProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            PackageProduction.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'package production already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validatePackageProduction = validatePackageProduction;
function getListPackageProduction(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        console.log(myname, 'getListPackageProduction', 'options', options);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            const query = PackageProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log(myname, 'getListPackageProduction', 'PackageProduction.find', 'error', err, __filename);
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
exports.getListPackageProduction = getListPackageProduction;
function getPackageProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getPackageProduction', owner, name);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PackageProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getPackageProduction', 'PackageProduction.find', 'error', err, __filename);
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
                    message: 'package production not found'
                });
            });
        });
    });
}
exports.getPackageProduction = getPackageProduction;
function getPackageProductionById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'getPackageProductionById', id);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            PackageProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log(myname, 'getPackageProduction', 'PackageProduction.find', 'error', err, __filename);
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
                    message: 'package production not found'
                });
            });
        });
    });
}
exports.getPackageProductionById = getPackageProductionById;
function getPackageProductionObject(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProduction(owner, name).then(
        // loog 'myname', 'getPackageProductionObject.pp', pp
        // loog 'myname', 'getPackageProductionObject.pp_packiFiles_object', pp_packiFiles_object
        // loog 'myname', 'getPackageProductionObject', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const pp = result.item;
            const pp_packiFiles_object = JSON.parse(pp.packiFiles);
            const obj = Object.assign(Object.assign({}, pp._doc), { packiFiles: pp_packiFiles_object, _id: pp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPackageProductionObject.getPackageProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObject = getPackageProductionObject;
function getPackageProductionObjectById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProductionById(id).then(
        // loog 'myname', 'getPackageProductionObjectById.pp', pp
        // loog 'myname', 'getPackageProductionObjectById.pp_packiFiles_object', pp_packiFiles_object
        // loog 'myname', 'getPackageProductionObjectById', obj
        (result) => {
            if (!result.ok) {
                return reject(result);
            }
            const pp = result.item;
            const pp_packiFiles_object = JSON.parse(pp.packiFiles);
            const obj = Object.assign(Object.assign({}, pp._doc), { packiFiles: pp_packiFiles_object, _id: pp._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPackageProductionObjectById.getPackageProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObjectById = getPackageProductionObjectById;
function createPackageProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'createPackageProduction', owner, name, description, packiFiles);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PackageProduction.find(query, (err, result) => {
                if (err) {
                    console.log(myname, 'getPackageProduction', 'PackageProduction.find', 'error', err, __filename);
                    return reject(err);
                }
                console.log(myname, 'getPackageProduction', 'PackageProduction.find', 'result', result, __filename);
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'package production already exists'
                    });
                }
                const newPackageProduction = new PackageProduction({
                    owner: owner,
                    name: name,
                    description: description,
                    packiFiles: packiFiles,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newPackageProduction.save(function (err, doc) {
                    if (err) {
                        console.log(myname, 'createPackageProduction', 'newPackageProduction.save', 'error', err, __filename);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'create',
                        ok: true,
                        item: doc._doc,
                        message: 'package production created'
                    });
                });
            });
        });
    });
}
exports.createPackageProduction = createPackageProduction;
function updatePackageProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'updatePackageProduction', owner, name, description, packiFiles);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
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
            PackageProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log(myname, 'updatePackageProduction', 'PackageProduction.findOneAndUpdate', 'error', err, __filename);
                    return reject(err);
                }
                return resolve({
                    oper: 'update',
                    ok: true,
                    message: 'package production updated'
                });
            });
        });
    });
}
exports.updatePackageProduction = updatePackageProduction;
function deletePackageProduction(id, owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(myname, 'deletePackageProduction', owner, name);
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            PackageProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log(myname, 'deletePackageProduction', 'PackageProduction.deleteOne', 'error', err, __filename);
                    return reject(err);
                }
                resolve({
                    oper: 'delete',
                    ok: true,
                    message: 'package production'
                });
            });
        });
    });
}
exports.deletePackageProduction = deletePackageProduction;
function getPackageProductionObject_stop(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            const obj = Object.assign(Object.assign({}, tf._doc), { packiFiles: tf_packiFiles_object, _id: tf._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPackageProductionObject.getPackageProduction.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObject_stop = getPackageProductionObject_stop;
function getPackageProductionObjectById_stop(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            const obj = Object.assign(Object.assign({}, tf._doc), { packiFiles: tf_packiFiles_object, _id: tf._id.toString() });
            return resolve(obj);
        }).catch((err) => {
            console.log('getPackageProductionObjectById.getPackageProductionById.error', err, __filename);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObjectById_stop = getPackageProductionObjectById_stop;
function getPackageProduction_withCache(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var cacheKey = owner + '|' + name;
        return new Promise((resolve, reject) => {
            let ppValue = {
                packiFiles: {}
            };
            getPackageProduction(owner, name).then((result) => {
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
                console.log('getPackageProduction_withCache.getArtifactProduction.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getPackageProduction_withCache = getPackageProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    packageCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
//# sourceMappingURL=package.js.map