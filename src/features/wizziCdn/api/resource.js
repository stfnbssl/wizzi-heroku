"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWizziCdnResource = exports.updateWizziCdnResource = exports.createWizziCdnResource = exports.getWizziCdnResourceById = exports.getWizziCdnResource = exports.getWizziCdnResourceList = exports.invalidateCache = exports.validateWizziCdnResource = void 0;
const tslib_1 = require("tslib");
const node_cache_1 = tslib_1.__importDefault(require("node-cache"));
const resource_1 = require("../mongo/resource");
const myname = 'features.wizziCdn.api.resource';
const wizziCdnResourceCache = new node_cache_1.default({
    stdTTL: 120,
    checkperiod: 60
});
function validateWizziCdnResource(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            WizziCdnResource.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'validateWizziCdnResource', 'WizziCdnResource.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'wizziCdn resource already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validateWizziCdnResource = validateWizziCdnResource;
function invalidateCache(owner, name) {
    var cacheKey = owner + '|' + name;
    wizziCdnResourceCache.del(cacheKey);
}
exports.invalidateCache = invalidateCache;
function getWizziCdnResourceList(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
        return new Promise((resolve, reject) => {
            const query = WizziCdnResource.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getWizziCdnResourceList', 'WizziCdnResource.find', 'error', err);
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
                        contents: item.contents
                    };
                    resultItem.push(item_obj);
                }
                resolve({
                    oper: 'getWizziCdnResourceList',
                    ok: true,
                    item: resultItem
                });
            });
        });
    });
}
exports.getWizziCdnResourceList = getWizziCdnResourceList;
function getWizziCdnResource(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            WizziCdnResource.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getWizziCdnResource', 'WizziCdnResource.find', 'error', err);
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
                    message: 'wizziCdn resource not found'
                });
            });
        });
    });
}
exports.getWizziCdnResource = getWizziCdnResource;
function getWizziCdnResourceById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
        return new Promise((resolve, reject) => {
            WizziCdnResource.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getWizziCdnResource', 'WizziCdnResource.find', 'error', err);
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
                    oper: 'getWizziCdnResource',
                    ok: false,
                    message: 'wizziCdn resource not found'
                });
            });
        });
    });
}
exports.getWizziCdnResourceById = getWizziCdnResourceById;
function createWizziCdnResource(owner, name, contents) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            WizziCdnResource.find(query, 
            // loog myname, 'getWizziCdnResource', 'WizziCdnResource.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getWizziCdnResource', 'WizziCdnResource.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'wizziCdn resource already exists'
                    });
                }
                const newWizziCdnResource = new WizziCdnResource({
                    owner: owner,
                    name: name,
                    contents: contents,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newWizziCdnResource.save(function (err, doc) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createWizziCdnResource', 'newWizziCdnResource.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'createWizziCdnResource',
                        ok: true,
                        item: doc._doc,
                        message: 'wizziCdn resource created'
                    });
                });
            });
        });
    });
}
exports.createWizziCdnResource = createWizziCdnResource;
function updateWizziCdnResource(id, owner, name, contents) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
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
            if (typeof contents !== 'undefined') {
                update['contents'] = contents;
            }
            update['updated_at'] = new Date();
            WizziCdnResource.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateWizziCdnResource', 'WizziCdnResource.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updateWizziCdnResource', 'WizziCdnResource.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                        oper: 'updateWizziCdnResource',
                        ok: false,
                        message: 'wizziCdn resource document not found: ' + id
                    });
                }
                return resolve({
                    oper: 'updateWizziCdnResource',
                    ok: true,
                    message: 'wizziCdn resource updated'
                });
            });
        });
    });
}
exports.updateWizziCdnResource = updateWizziCdnResource;
function deleteWizziCdnResource(id, owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const WizziCdnResource = (0, resource_1.GetWizziCdnResourceModel)();
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
            WizziCdnResource.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteWizziCdnResource', 'WizziCdnResource.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deleteWizziCdnResource',
                    ok: true,
                    message: 'wizziCdn resource'
                });
            });
        });
    });
}
exports.deleteWizziCdnResource = deleteWizziCdnResource;
//# sourceMappingURL=resource.js.map