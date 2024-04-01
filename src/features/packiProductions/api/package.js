"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtifactGeneration_withPrepare = exports.getWizziMetaFolderById = exports.getWizziMetaFolder = exports.invalidateCache = exports.getPackageProduction_withCache = exports.getPackageProductionObjectById_stop = exports.getPackageProductionObject_stop = exports.deletePackageProduction = exports.updatePackageProduction = exports.createPackageProduction = exports.getPackageProductionObjectById = exports.getPackageProductionObject = exports.getPackageProductionById = exports.getPackageProduction = exports.getPackageProductionList = exports.validatePackageProduction = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\api\package.ts.ittf
    utc time: Mon, 01 Apr 2024 14:45:47 GMT
*/
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const env_1 = require("../../config/env");
const wizzi_1 = require("../../wizzi");
const package_1 = require("../mongo/package");
const index_1 = require("../index");
const myname = 'features.production.api.PackageProduction';
const packageProductionCache = new node_cache_1.default({
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
const index_2 = require("../index");
function getPackageProductionList(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
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
                    console.log("[31m%s[0m", myname, 'getPackageProductionList', 'PackageProduction.find', 'error', err);
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
                    oper: 'getPackageProductionList',
                    ok: true,
                    item: resultItem
                });
            });
        });
    });
}
exports.getPackageProductionList = getPackageProductionList;
function getPackageProduction(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PackageProduction.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPackageProduction', 'PackageProduction.find', 'error', err);
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
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            PackageProduction.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPackageProduction', 'PackageProduction.find', 'error', err);
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
                    oper: 'getPackageProduction',
                    ok: false,
                    message: 'package production not found'
                });
            });
        });
    });
}
exports.getPackageProductionById = getPackageProductionById;
function getPackageProductionObject(owner, name, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProduction(owner, name).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const pp = result.item;
            return resolve(_createPackageProductionObject(pp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.packageProduction.getPackageProductionObject.getPackageProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObject = getPackageProductionObject;
function getPackageProductionObjectById(id, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => getPackageProductionById(id).then((result) => {
            if (!result.ok) {
                return reject(result);
            }
            const pp = result.item;
            return resolve(_createPackageProductionObject(pp, loadPackiConfig));
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features.production.api.packageProduction.getPackageProductionObjectById.getPackageProductionById.error', err);
            return reject(err);
        }));
    });
}
exports.getPackageProductionObjectById = getPackageProductionObjectById;
function _createPackageProductionObject(pp, loadPackiConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const pp_packiFiles_object = JSON.parse(pp.packiFiles);
            const obj = Object.assign(Object.assign({}, pp._doc), { packiFiles: pp_packiFiles_object, _id: pp._id.toString(), packiProduction: "PackageProduction", packiConfig: pp_packiFiles_object[env_1.packiConfigPath], packiConfigObj: null });
            if (loadPackiConfig) {
                if (!obj.packiConfig) {
                    return reject({
                        message: 'Missing file ' + env_1.packiConfigPath + ' in PackageProduction'
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
                    console.log("[31m%s[0m", 'features.production.api.packageProduction.getPackageProductionObject._createPackageProductionObject.error', err);
                    return reject(err);
                });
            }
            else {
                return resolve(obj);
            }
        });
    });
}
function createPackageProduction(owner, name, description, packiFiles) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            PackageProduction.find(query, 
            // loog myname, 'getPackageProduction', 'PackageProduction.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPackageProduction', 'PackageProduction.find', 'error', err);
                    return reject(err);
                }
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
                        console.log("[31m%s[0m", myname, 'createPackageProduction', 'newPackageProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'createPackageProduction',
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
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
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
            PackageProduction.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updatePackageProduction', 'PackageProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updatePackageProduction', 'PackageProduction.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                        oper: 'updatePackageProduction',
                        ok: false,
                        message: 'package production document not found: ' + id
                    });
                }
                return resolve({
                    oper: 'updatePackageProduction',
                    ok: true,
                    message: 'package production updated'
                });
            });
        });
    });
}
exports.updatePackageProduction = updatePackageProduction;
function deletePackageProduction(id, owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const PackageProduction = (0, package_1.GetPackageProductionModel)();
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
            PackageProduction.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deletePackageProduction', 'PackageProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deletePackageProduction',
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
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPackageProductionObject.getPackageProduction.error', err);
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
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPackageProductionObjectById.getPackageProductionById.error', err);
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
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackageProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            });
        });
    });
}
exports.getPackageProduction_withCache = getPackageProduction_withCache;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    packageProductionCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
function getWizziMetaFolder(owner, name, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return getPackageProductionObject(owner, name, true).then(
        // loog myname, 'getWizziMetaFolder.packageProductionObject', Object.keys(packageProductionObject)
        (packageProductionObject) => {
            return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
        });
    });
}
exports.getWizziMetaFolder = getWizziMetaFolder;
function getWizziMetaFolderById(packageId, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return getPackageProductionObjectById(packageId, true).then(
        // loog myname, 'getWizziMetaFolderById.packageProductionObject', Object.keys(packageProductionObject)
        (packageProductionObject) => {
            return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
        });
    });
}
exports.getWizziMetaFolderById = getWizziMetaFolderById;
function getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => index_1.productionApi.getCliCtxFromPackiConfig(packageProductionObject.owner, packageProductionObject.packiConfigObj, packageProductionObject.packiFiles, progressiveContext).then((metaCtx) => index_2.metaApi.generateMetaProduction(packageProductionObject.owner, packageProductionObject.packiConfigObj.meta.name, metaCtx).then(
        // loog myname, 'getWizziMetaFolderByPackageProductionObject.generateMetaProduction', Object.keys(wizziPackiFiles)
        (wizziPackiFiles) => {
            return resolve(wizziPackiFiles);
        })).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'api.production.getWizziMetaFolderByPackageProductionObject.getCliCtxFromPackiConfig.error', err);
            return reject(err);
        }));
    });
}
function getArtifactGeneration_withPrepare(owner, productionName, filePath, queryContext, rootContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => index_1.productionApi.prepareProduction('package', owner, productionName, queryContext, rootContext).then(
        // loog myname, 'getArtifactGeneration_withPrepare.productionObj', 'packiFiles', Object.keys(productionObj.packiFiles), 'context', Object.keys(productionObj.context),
        (productionObj) => wizzi_1.wizziProds.generateArtifact(filePath, productionObj.packiFiles, productionObj.context).then(
        // loog 'getArtifactGeneration_withPrepare', productionName, result.artifactContent.length
        // loog 'getArtifactGeneration_withPrepare', productionName, result.artifactContent.substring(0, 120) + '...'
        (result) => {
            const response = {
                content: result.artifactContent,
                contentLength: result.artifactContent.length,
                contentType: wizzi_1.wizziMaps.contentTypeFor(filePath)
            };
            return resolve(response);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", '' + myname + 'getArtifactGeneration_withPrepare.generateArtifact.error', err);
            return reject(err);
        })).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", '' + myname + 'getArtifactGeneration_withPrepare.prepareProduction.error', err);
            return reject(err);
        }));
    });
}
exports.getArtifactGeneration_withPrepare = getArtifactGeneration_withPrepare;
//# sourceMappingURL=package.js.map