/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\plugin.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import NodeCache from 'node-cache';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import {GetPluginProductionModel} from '../mongo/plugin';
import {IPluginProductionModel, PackiProductionObject} from '../types';
import {productionApi} from '../index';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.PluginProduction';

const pluginProductionCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });
export async function validatePluginProduction(owner: string, name: string):  Promise<ValidateResult> {
    const PluginProduction = GetPluginProductionModel();
    return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            PluginProduction.find(query, (err: any, result: any[]) => {
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
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getPluginProductionList'
        // 'options'
        // options
*/
async function getPluginProductionList(options?: any):  Promise<CRUDResult> {
    options = options || {};
    
    
    const PluginProduction = GetPluginProductionModel();
    
    return new Promise((resolve, reject) => {
            
            const query = PluginProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPluginProductionList', 'PluginProduction.find', 'error', err);
                    return reject(err);
                }
                const resultItem = [];
                var i, i_items=result, i_len=result.length, item;
                for (i=0; i<i_len; i++) {
                    item = result[i];
                    const item_obj = {
                        _id: item._id, 
                        id: item.id, 
                        owner: item.owner, 
                        name: item.name, 
                        description: item.description, 
                        packiFiles: item.packiFiles
                     };
                    resultItem.push(item_obj)
                }
                resolve({
                    oper: 'getPluginProductionList', 
                    ok: true, 
                    item: resultItem
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getPluginProduction'
        // owner
        // name
*/
async function getPluginProduction(owner: string, name: string):  Promise<CRUDResult> {
    
    
    const PluginProduction = GetPluginProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            PluginProduction.find(query, (err: any, result: any) => {
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
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getPluginProductionById'
        // id
*/
async function getPluginProductionById(id: string):  Promise<CRUDResult> {
    
    
    const PluginProduction = GetPluginProductionModel();
    
    return new Promise((resolve, reject) => {
            
            PluginProduction.find({
                _id: id
             }, (err: any, result: IPluginProductionModel[]) => {
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
                 })
            }
            )
        }
        );
}

export async function getPluginProductionObject(owner: string, name: string, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    return new Promise((resolve, reject) => 
            getPluginProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const lp: IPluginProductionModel = result.item;
                return resolve(_createPluginProductionObject(lp, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.pluginProduction.getPluginProductionObject.getPluginProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getPluginProductionObjectById(id: string, loadPackiConfig?: boolean) {
    return new Promise((resolve, reject) => 
            getPluginProductionById(id).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const lp: IPluginProductionModel = result.item;
                return resolve(_createPluginProductionObject(lp, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.pluginProduction.getPluginProductionObjectById.getPluginProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}
async function _createPluginProductionObject(lp: IPluginProductionModel, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    
    return new Promise((resolve, reject) => {
            const lp_packiFiles_object: packiTypes.PackiFiles = JSON.parse(lp.packiFiles);
            const obj = {
                ...lp._doc, 
                packiFiles: lp_packiFiles_object, 
                _id: lp._id.toString(), 
                packiProduction: "PluginProduction", 
                configPackiFile: lp_packiFiles_object[packiConstants.packiConfigPath], 
                packiConfigJsonObj: null
             };
            
            if (loadPackiConfig) {
                if (!obj.configPackiFile) {
                    return reject({
                            message: 'Missing file ' + packiConstants.packiConfigPath + ' in PluginProduction'
                         });
                }
                wizziProds.generateArtifact(packiConstants.packiConfigPath, {
                    [packiConstants.packiConfigPath]: {
                        type: obj.configPackiFile.type, 
                        contents: obj.configPackiFile.contents
                     }
                 }, {}).then((generationResult: any) => {
                    obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
                    return resolve(obj);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.pluginProduction.getPluginProductionObject._createPluginProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else {
                return resolve(obj);
            }
        }
        );
}

export /**
    // console.log
        // myname
        // 'createPluginProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function createPluginProduction(
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const PluginProduction = GetPluginProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            PluginProduction.find(query, // loog myname, 'getPluginProduction', 'PluginProduction.find', 'result', result
            (err: any, result: any) => {
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
                newPluginProduction.save(function(err: any, doc: any) {
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
                })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'updatePluginProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function updatePluginProduction(
    id?: string, 
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const PluginProduction = GetPluginProductionModel();
    
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
            const update: any = {};
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
            
            PluginProduction.findOneAndUpdate(query, update, {}, (err: any, result: any) => {
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
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'deletePluginProduction'
        // owner
        // name
*/
async function deletePluginProduction(id?: string, owner?: string, name?: string):  Promise<CRUDResult> {
    
    
    const PluginProduction = GetPluginProductionModel();
    
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
            
            PluginProduction.deleteOne(query, (err: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deletePluginProduction', 'PluginProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deletePluginProduction', 
                    ok: true, 
                    message: 'plugin production'
                 })
            }
            )
        }
        );
}

export async function mergePluginProductionFiles(
    owner: string, 
    name: string, 
    tobeMergedPackiFiles: packiTypes.PackiFiles, 
    options?: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getPluginProductionObject(owner, name, false).then((itemObject: PackiProductionObject) => {
                const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
                updatePluginProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(result => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.pluginProduction.mergePluginProductionFiles.updatePluginProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.pluginProduction.mergePluginProductionFiles.getPluginProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getPluginProduction_withCache(owner: string, name: string) {
    var cacheKey = owner + '|' + name;
    return new Promise((resolve, reject) => {
            let ppValue = {
                packiFiles: {
                    
                 }
             };
            getPluginProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf: IPluginProductionModel = result.item;
                const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                ppValue = {
                    packiFiles: tf_packiFiles_object
                 };
                return resolve(ppValue);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPluginProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name?: string) {
    var cacheKey = owner + '|' + name;
    pluginProductionCache.del(cacheKey);
}