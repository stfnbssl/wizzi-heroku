/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\package.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import NodeCache from 'node-cache';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import {GetPackageProductionModel} from '../mongo/package';
import {IPackageProductionModel, PackiProductionObject} from '../types';
import {productionApi} from '../index';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.PackageProduction';

const packageProductionCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });
export async function validatePackageProduction(owner: string, name: string):  Promise<ValidateResult> {
    const PackageProduction = GetPackageProductionModel();
    return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            PackageProduction.find(query, (err: any, result: any[]) => {
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
                 })
            }
            )
        }
        );
}
import {metaApi} from '../index';

export /**
    // console.log
        // myname
        // 'getPackageProductionList'
        // 'options'
        // options
*/
async function getPackageProductionList(options?: any):  Promise<CRUDResult> {
    options = options || {};
    
    
    const PackageProduction = GetPackageProductionModel();
    
    return new Promise((resolve, reject) => {
            
            const query = PackageProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPackageProductionList', 'PackageProduction.find', 'error', err);
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
                    oper: 'getPackageProductionList', 
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
        // 'getPackageProduction'
        // owner
        // name
*/
async function getPackageProduction(owner: string, name: string):  Promise<CRUDResult> {
    
    
    const PackageProduction = GetPackageProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            PackageProduction.find(query, (err: any, result: any) => {
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
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getPackageProductionById'
        // id
*/
async function getPackageProductionById(id: string):  Promise<CRUDResult> {
    
    
    const PackageProduction = GetPackageProductionModel();
    
    return new Promise((resolve, reject) => {
            
            PackageProduction.find({
                _id: id
             }, (err: any, result: IPackageProductionModel[]) => {
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
                 })
            }
            )
        }
        );
}

export async function getPackageProductionObject(owner: string, name: string, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    return new Promise((resolve, reject) => 
            getPackageProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const pp: IPackageProductionModel = result.item;
                return resolve(_createPackageProductionObject(pp, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.packageProduction.getPackageProductionObject.getPackageProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getPackageProductionObjectById(id: string, loadPackiConfig?: boolean) {
    return new Promise((resolve, reject) => 
            getPackageProductionById(id).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const pp: IPackageProductionModel = result.item;
                return resolve(_createPackageProductionObject(pp, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.packageProduction.getPackageProductionObjectById.getPackageProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}
async function _createPackageProductionObject(pp: IPackageProductionModel, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    
    return new Promise((resolve, reject) => {
            const pp_packiFiles_object: packiTypes.PackiFiles = JSON.parse(pp.packiFiles);
            const obj = {
                ...pp._doc, 
                packiFiles: pp_packiFiles_object, 
                _id: pp._id.toString(), 
                packiProduction: "PackageProduction", 
                configPackiFile: pp_packiFiles_object[packiConstants.packiConfigPath], 
                packiConfigJsonObj: null
             };
            
            if (loadPackiConfig) {
                if (!obj.configPackiFile) {
                    return reject({
                            message: 'Missing file ' + packiConstants.packiConfigPath + ' in PackageProduction'
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
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.packageProduction.getPackageProductionObject._createPackageProductionObject.error', err);
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
        // 'createPackageProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function createPackageProduction(
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const PackageProduction = GetPackageProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            PackageProduction.find(query, // loog myname, 'getPackageProduction', 'PackageProduction.find', 'result', result
            (err: any, result: any) => {
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
                newPackageProduction.save(function(err: any, doc: any) {
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
                })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'updatePackageProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function updatePackageProduction(
    id?: string, 
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const PackageProduction = GetPackageProductionModel();
    
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
            
            PackageProduction.findOneAndUpdate(query, update, {}, (err: any, result: any) => {
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
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'deletePackageProduction'
        // owner
        // name
*/
async function deletePackageProduction(id?: string, owner?: string, name?: string):  Promise<CRUDResult> {
    
    
    const PackageProduction = GetPackageProductionModel();
    
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
            
            PackageProduction.deleteOne(query, (err: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deletePackageProduction', 'PackageProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deletePackageProduction', 
                    ok: true, 
                    message: 'package production'
                 })
            }
            )
        }
        );
}

export async function mergePackageProductionFiles(
    owner: string, 
    name: string, 
    tobeMergedPackiFiles: packiTypes.PackiFiles, 
    options?: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getPackageProductionObject(owner, name, false).then((itemObject: PackiProductionObject) => {
                const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
                updatePackageProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(result => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.packageProduction.mergePackageProductionFiles.updatePackageProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.packageProduction.mergePackageProductionFiles.getPackageProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getPackageProduction_withCache(owner: string, name: string) {
    var cacheKey = owner + '|' + name;
    return new Promise((resolve, reject) => {
            let ppValue = {
                packiFiles: {
                    
                 }
             };
            getPackageProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const tf: IPackageProductionModel = result.item;
                const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                ppValue = {
                    packiFiles: tf_packiFiles_object
                 };
                return resolve(ppValue);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackageProduction_withCache.getPackageProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name?: string) {
    var cacheKey = owner + '|' + name;
    packageProductionCache.del(cacheKey);
}

export async function getWizziMetaFolder(owner: string, name: string, progressiveContext: any):  Promise<packiTypes.PackiFiles> {
    return getPackageProductionObject(owner, name, true).then((packageProductionObject: any) => {
            return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
        }
        )
    ;
}

export async function getWizziMetaFolderById(packageId: string, progressiveContext: any):  Promise<packiTypes.PackiFiles> {
    return getPackageProductionObjectById(packageId, true).then((packageProductionObject: any) => {
            return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
        }
        )
    ;
}
async function getWizziMetaFolderByPackageProductionObject(packageProductionObject: any, progressiveContext: any):  Promise<packiTypes.PackiFiles> {
    return new Promise((resolve, reject) => 
            productionApi.getCliCtxFromPackiConfig(packageProductionObject.owner, packageProductionObject.packiConfigJsonObj, packageProductionObject.packiFiles, progressiveContext).then((metaCtx: any) => 
                metaApi.generateMetaProduction(packageProductionObject.owner, packageProductionObject.packiConfigJsonObj.meta.name, metaCtx).then((wizziPackiFiles: packiTypes.PackiFiles) => {
                    return resolve(wizziPackiFiles);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'api.production.getWizziMetaFolderByPackageProductionObject.getCliCtxFromPackiConfig.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactGeneration_withPrepare(
    owner: string, 
    productionName: string, 
    filePath: string, 
    requestQueryContextParam: string, 
    rootContext: any) {
    return new Promise((resolve, reject) => 
            productionApi.prepareProduction('package', owner, productionName, requestQueryContextParam, rootContext).then((productionObj: any) => 
                wizziProds.generateArtifact(filePath, productionObj.packiFiles, productionObj.context).then((result: any) => {
                    const response = {
                        content: result.artifactContent, 
                        contentLength: result.artifactContent.length, 
                        contentType: result.contentType
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", '' + myname + 'getArtifactGeneration_withPrepare.generateArtifact.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", '' + myname + 'getArtifactGeneration_withPrepare.prepareProduction.error', err);
                return reject(err);
            }
            )
        
        );
}