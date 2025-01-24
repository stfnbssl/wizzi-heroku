/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\tfolder.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import NodeCache from 'node-cache';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import {GetTFolderProductionModel} from '../mongo/tfolder';
import {ITFolderProductionModel, PackiProductionObject} from '../types';
import {productionApi} from '../index';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.TFolderProduction';

const tFolderProductionCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });
export async function validateTFolderProduction(owner: string, name: string):  Promise<ValidateResult> {
    const TFolderProduction = GetTFolderProductionModel();
    return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            TFolderProduction.find(query, (err: any, result: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            isValid: false, 
                            message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. already exists'
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
        // 'getTFolderProductionList'
        // 'options'
        // options
*/
async function getTFolderProductionList(options?: any):  Promise<CRUDResult> {
    options = options || {};
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
    return new Promise((resolve, reject) => {
            
            const query = TFolderProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolderProductionList', 'TFolderProduction.find', 'error', err);
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
                    oper: 'getTFolderProductionList', 
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
        // 'getTFolderProduction'
        // owner
        // name
*/
async function getTFolderProduction(owner: string, name: string):  Promise<CRUDResult> {
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            TFolderProduction.find(query, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolderProduction', 'TFolderProduction.find', 'error', err);
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
                    message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. not found'
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getTFolderProductionById'
        // id
*/
async function getTFolderProductionById(id: string):  Promise<CRUDResult> {
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
    return new Promise((resolve, reject) => {
            
            TFolderProduction.find({
                _id: id
             }, (err: any, result: ITFolderProductionModel[]) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolderProduction', 'TFolderProduction.find', 'error', err);
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
                    oper: 'getTFolderProduction', 
                    ok: false, 
                    message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. not found'
                 })
            }
            )
        }
        );
}

export async function getTFolderProductionObject(owner: string, name: string, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    return new Promise((resolve, reject) => 
            getTFolderProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf: ITFolderProductionModel = result.item;
                return resolve(_createTFolderProductionObject(tf, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObject.getTFolderProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getTFolderProductionObjectById(id: string, loadPackiConfig?: boolean) {
    return new Promise((resolve, reject) => 
            getTFolderProductionById(id).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf: ITFolderProductionModel = result.item;
                return resolve(_createTFolderProductionObject(tf, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObjectById.getTFolderProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}
async function _createTFolderProductionObject(tf: ITFolderProductionModel, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    
    return new Promise((resolve, reject) => {
            const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
            const obj = {
                ...tf._doc, 
                packiFiles: tf_packiFiles_object, 
                _id: tf._id.toString(), 
                packiProduction: "TFolderProduction", 
                configPackiFile: tf_packiFiles_object[packiConstants.packiConfigPath], 
                packiConfigJsonObj: null
             };
            
            if (loadPackiConfig) {
                if (!obj.configPackiFile) {
                    return reject({
                            message: 'Missing file ' + packiConstants.packiConfigPath + ' in TFolderProduction'
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
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObject._createTFolderProductionObject.error', err);
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
        // 'createTFolderProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function createTFolderProduction(
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            TFolderProduction.find(query, // loog myname, 'getTFolderProduction', 'TFolderProduction.find', 'result', result
            (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getTFolderProduction', 'TFolderProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                            oper: 'create', 
                            ok: false, 
                            message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. already exists'
                         });
                }
                const newTFolderProduction = new TFolderProduction({
                    owner: owner, 
                    name: name, 
                    description: description, 
                    packiFiles: packiFiles, 
                    created_at: new Date(), 
                    updated_at: new Date()
                 });
                newTFolderProduction.save(function(err: any, doc: any) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createTFolderProduction', 'newTFolderProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                            oper: 'createTFolderProduction', 
                            ok: true, 
                            item: doc._doc, 
                            message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. created'
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
        // 'updateTFolderProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function updateTFolderProduction(
    id?: string, 
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
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
            
            TFolderProduction.findOneAndUpdate(query, update, {}, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateTFolderProduction', 'TFolderProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updateTFolderProduction', 'TFolderProduction.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                            oper: 'updateTFolderProduction', 
                            ok: false, 
                            message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. document not found: ' + id
                         });
                }
                
                return resolve({
                        oper: 'updateTFolderProduction', 
                        ok: true, 
                        message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include. updated'
                     });
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'deleteTFolderProduction'
        // owner
        // name
*/
async function deleteTFolderProduction(id?: string, owner?: string, name?: string):  Promise<CRUDResult> {
    
    
    const TFolderProduction = GetTFolderProductionModel();
    
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
            
            TFolderProduction.deleteOne(query, (err: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteTFolderProduction', 'TFolderProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deleteTFolderProduction', 
                    ok: true, 
                    message: 'A tFolder contains ITTF Fragments that Wizzi productions can mix/include.'
                 })
            }
            )
        }
        );
}

export async function mergeTFolderProductionFiles(
    owner: string, 
    name: string, 
    tobeMergedPackiFiles: packiTypes.PackiFiles, 
    options?: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getTFolderProductionObject(owner, name, false).then((itemObject: PackiProductionObject) => {
                const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
                updateTFolderProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(result => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.tFolderProduction.mergeTFolderProductionFiles.updateTFolderProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.tFolderProduction.mergeTFolderProductionFiles.getTFolderProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getTFolderProduction_withCache(owner: string, name: string) {
    var cacheKey = owner + '|' + name;
    return new Promise((resolve, reject) => {
            let tfValue = {
                packiFiles: {
                    
                 }
             };
            getTFolderProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf: ITFolderProductionModel = result.item;
                const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                tfValue = {
                    packiFiles: tf_packiFiles_object
                 };
                return resolve(tfValue);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getTFolderProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name?: string) {
    var cacheKey = owner + '|' + name;
    tFolderProductionCache.del(cacheKey);
}