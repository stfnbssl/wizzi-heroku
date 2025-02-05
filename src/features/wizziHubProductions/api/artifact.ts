/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\artifact.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import path from 'path';
import NodeCache from 'node-cache';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import {GetArtifactProductionModel} from '../mongo/artifact';
import {IArtifactProductionModel, PackiProductionObject} from '../types';
import {productionApi} from '../index';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.ArtifactProduction';

const artifactProductionCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });
export async function validateArtifactProduction(owner: string, name: string):  Promise<ValidateResult> {
    const ArtifactProduction = GetArtifactProductionModel();
    return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            ArtifactProduction.find(query, (err: any, result: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            isValid: false, 
                            message: 'artifact production already exists'
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
import {tFolderApi} from '../index';
import {ITFolderProductionModel} from '../types';

export /**
    // console.log
        // myname
        // 'getArtifactProductionList'
        // 'options'
        // options
*/
async function getArtifactProductionList(options?: any):  Promise<CRUDResult> {
    options = options || {};
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
    return new Promise((resolve, reject) => {
            
            const query = ArtifactProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getArtifactProductionList', 'ArtifactProduction.find', 'error', err);
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
                        mainIttf: item.mainIttf, 
                        wizziSchema: item.wizziSchema, 
                        packiFiles: item.packiFiles
                     };
                    resultItem.push(item_obj)
                }
                resolve({
                    oper: 'getArtifactProductionList', 
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
        // 'getArtifactProduction'
        // owner
        // name
*/
async function getArtifactProduction(owner: string, name: string):  Promise<CRUDResult> {
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            ArtifactProduction.find(query, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err);
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
                    message: 'artifact production not found'
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getArtifactProductionById'
        // id
*/
async function getArtifactProductionById(id: string):  Promise<CRUDResult> {
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
    return new Promise((resolve, reject) => {
            
            ArtifactProduction.find({
                _id: id
             }, (err: any, result: IArtifactProductionModel[]) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err);
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
                    oper: 'getArtifactProduction', 
                    ok: false, 
                    message: 'artifact production not found'
                 })
            }
            )
        }
        );
}

export async function getArtifactProductionObject(owner: string, name: string, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    return new Promise((resolve, reject) => 
            getArtifactProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const ap: IArtifactProductionModel = result.item;
                return resolve(_createArtifactProductionObject(ap, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.artifactProduction.getArtifactProductionObject.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getArtifactProductionObjectById(id: string, loadPackiConfig?: boolean) {
    return new Promise((resolve, reject) => 
            getArtifactProductionById(id).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const ap: IArtifactProductionModel = result.item;
                return resolve(_createArtifactProductionObject(ap, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.artifactProduction.getArtifactProductionObjectById.getArtifactProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}
async function _createArtifactProductionObject(ap: IArtifactProductionModel, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    
    return new Promise((resolve, reject) => {
            const ap_packiFiles_object: packiTypes.PackiFiles = JSON.parse(ap.packiFiles);
            const obj = {
                ...ap._doc, 
                packiFiles: ap_packiFiles_object, 
                _id: ap._id.toString(), 
                packiProduction: "ArtifactProduction", 
                configPackiFile: ap_packiFiles_object[packiConstants.packiConfigPath], 
                packiConfigJsonObj: null
             };
            
            if (loadPackiConfig) {
                if (!obj.configPackiFile) {
                    return reject({
                            message: 'Missing file ' + packiConstants.packiConfigPath + ' in ArtifactProduction'
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
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.artifactProduction.getArtifactProductionObject._createArtifactProductionObject.error', err);
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
        // 'createArtifactProduction'
        // owner
        // name
        // description
        // mainIttf
        // wizziSchema
        // packiFiles
*/
async function createArtifactProduction(
    owner?: string, 
    name?: string, 
    description?: string, 
    mainIttf?: string, 
    wizziSchema?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            ArtifactProduction.find(query, // loog myname, 'getArtifactProduction', 'ArtifactProduction.find', 'result', result
            (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getArtifactProduction', 'ArtifactProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                            oper: 'create', 
                            ok: false, 
                            message: 'artifact production already exists'
                         });
                }
                const newArtifactProduction = new ArtifactProduction({
                    owner: owner, 
                    name: name, 
                    description: description, 
                    mainIttf: mainIttf, 
                    wizziSchema: wizziSchema, 
                    packiFiles: packiFiles, 
                    created_at: new Date(), 
                    updated_at: new Date()
                 });
                newArtifactProduction.save(function(err: any, doc: any) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createArtifactProduction', 'newArtifactProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                            oper: 'createArtifactProduction', 
                            ok: true, 
                            item: doc._doc, 
                            message: 'artifact production created'
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
        // 'updateArtifactProduction'
        // owner
        // name
        // description
        // mainIttf
        // wizziSchema
        // packiFiles
*/
async function updateArtifactProduction(
    id?: string, 
    owner?: string, 
    name?: string, 
    description?: string, 
    mainIttf?: string, 
    wizziSchema?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
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
            if (typeof mainIttf !== 'undefined') {
                update['mainIttf'] = mainIttf;
            }
            if (typeof wizziSchema !== 'undefined') {
                update['wizziSchema'] = wizziSchema;
            }
            if (typeof packiFiles !== 'undefined') {
                update['packiFiles'] = packiFiles;
            }
            update['updated_at'] = new Date();
            
            ArtifactProduction.findOneAndUpdate(query, update, {}, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateArtifactProduction', 'ArtifactProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updateArtifactProduction', 'ArtifactProduction.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                            oper: 'updateArtifactProduction', 
                            ok: false, 
                            message: 'artifact production document not found: ' + id
                         });
                }
                
                return resolve({
                        oper: 'updateArtifactProduction', 
                        ok: true, 
                        message: 'artifact production updated'
                     });
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'deleteArtifactProduction'
        // owner
        // name
*/
async function deleteArtifactProduction(id?: string, owner?: string, name?: string):  Promise<CRUDResult> {
    
    
    const ArtifactProduction = GetArtifactProductionModel();
    
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
            
            ArtifactProduction.deleteOne(query, (err: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteArtifactProduction', 'ArtifactProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deleteArtifactProduction', 
                    ok: true, 
                    message: 'artifact production'
                 })
            }
            )
        }
        );
}

export async function mergeArtifactProductionFiles(
    owner: string, 
    name: string, 
    tobeMergedPackiFiles: packiTypes.PackiFiles, 
    options?: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getArtifactProductionObject(owner, name, false).then((itemObject: PackiProductionObject) => {
                const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
                updateArtifactProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, itemObject.mainIttf, itemObject.wizziSchema, JSON.stringify(newPackiFiles)).then(result => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.artifactProduction.mergeArtifactProductionFiles.updateArtifactProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.artifactProduction.mergeArtifactProductionFiles.getArtifactProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getArtifactProduction_withCache(owner: string, name: string) {
    var cacheKey = owner + '|' + name;
    return new Promise((resolve, reject) => {
            let apValue = {
                mainIttf: "", 
                packiFiles: {
                    
                 }
             };
            getArtifactProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const ap: IArtifactProductionModel = result.item;
                const ap_packiFiles_object: packiTypes.PackiFiles = JSON.parse(ap.packiFiles);
                if (ap.wizziSchema && ap.wizziSchema.length > 0) {
                    tFolderApi.getTFolderProduction(owner, ap.wizziSchema).then((result) => {
                        if (!result.ok) {
                            apValue = {
                                mainIttf: ap.mainIttf, 
                                packiFiles: ap_packiFiles_object
                             };
                            return resolve(apValue);
                        }
                        const tf: ITFolderProductionModel = result.item;
                        const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                        apValue = {
                            mainIttf: ap.mainIttf, 
                            packiFiles: mergePackiFiles(ap_packiFiles_object, tf_packiFiles_object)
                         };
                        return resolve(apValue);
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'getArtifactProduction_withCache.getTFolderProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else {
                    apValue = {
                        mainIttf: ap.mainIttf, 
                        packiFiles: ap_packiFiles_object
                     };
                    return resolve(apValue);
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getArtifactProduction_withCache.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name?: string) {
    var cacheKey = owner + '|' + name;
    artifactProductionCache.del(cacheKey);
}

export async function getDefaultContext_withCache(owner: string, progressiveContext?: any) {
    progressiveContext = progressiveContext || {};
    return new Promise((resolve, reject) => 
            getArtifactContextItem(owner, 'wzCtx;wzctx', {}).then((resultItemContext: any) => {
                const defaultContext = Object.assign({}, progressiveContext, resultItemContext);
                resolve(defaultContext);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getDefaultContext_withCache.getArtifactContextItem.error', err);
                return reject(err);
            }
            )
        
        );
}

export /**
    // sample requestQueryContextParamString: "wzCtx;wzctx.json|db;item.db.json"
    // context property 'wzCtx' from json document 'wzctx.json'
    // context property 'db' from json document 'item.db.json'
*/
async function getArtifactContext(owner: string, requestQueryContextParamString: string, progressiveContext?: any) {
    progressiveContext = progressiveContext || {};
    return new Promise((resolve, reject) => {
            if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
                const contextItems = requestQueryContextParamString.split('|');
                var j = 0;
                let resultContext = progressiveContext;
                (function next() {
                    var contextItem = contextItems[j++];
                    if (!contextItem) {
                        return resolve(resultContext);
                    }
                    getArtifactContextItem(owner, contextItem, progressiveContext).then((resultItemContext: any) => {
                        resultContext = Object.assign({}, resultContext, resultItemContext)
                        ;
                        next();
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'getArtifactContext.getArtifactContextItem.error', err);
                        return reject(err);
                    }
                    )
                })();
            }
            else {
                resolve(progressiveContext);
            }
        }
        );
}

export async function getArtifactContextItem(owner: string, requestQueryContextParamString: string, progressiveContext?: any) {
    progressiveContext = progressiveContext || {};
    /**
        * sample requestQueryContextParamString: "wzCtx;wzctx.json"
        * context property 'wzCtx' from json document 'wzctx.json'
    */
    return new Promise((resolve, reject) => {
            if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
                const parts = requestQueryContextParamString.split(';');
                const contextName = parts[0];
                const contextArtifactName = parts[1];
                const contextTransformation = parts.length > 2 ? parts[2] : null;
                if (contextName && contextArtifactName) {
                    if (contextTransformation) {
                        getArtifactTransformation(owner, contextArtifactName, progressiveContext, contextTransformation).then((result: any) => 
                            resolve(Object.assign({}, progressiveContext, {
                                [contextName]: result.transformResult
                             }))
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'getArtifactContextItem.getArtifactTransformation.error', err);
                            return reject(err);
                        }
                        )
                    }
                    else {
                        getArtifactGeneration(owner, contextArtifactName, progressiveContext).then((result: any) => {
                            const contextObject = JSON.parse(result.content);
                            resolve(Object.assign({}, progressiveContext, {
                                [contextName]: contextObject
                             }))
                        }
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'getArtifactContextItem.getArtifactGeneration.error', err);
                            return reject(err);
                        }
                        )
                    }
                }
                else {
                    resolve(progressiveContext);
                }
            }
            else {
                resolve(progressiveContext);
            }
        }
        );
}

export async function getArtifactTransformation(
    owner: string, 
    name: string, 
    context: any, 
    transformerName: string) {
    return new Promise((resolve, reject) => 
            getArtifactProduction(owner, name).then((ap: any) => 
                wizziProds.loadAndTransformModel(ap.mainIttf, ap.packiFiles, context, {
                    transformer: transformerName
                 }).then((result: any) => {
                    return resolve(result);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: name, 
                            mainIttf: ap.mainIttf, 
                            transformerName: transformerName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactTransformation.transformModel.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: name
                     };
                }
                console.log("[31m%s[0m", 'getArtifactTransformation.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactTransformation_withPrepare(
    owner: string, 
    productionName: string, 
    requestQueryContextParam: string, 
    rootContext: any, 
    transformerName: string) {
    return new Promise((resolve, reject) => 
            productionApi.prepareProduction('artifact', owner, productionName, requestQueryContextParam, rootContext).then((productionObj: any) => 
                wizziProds.loadAndTransformModel(productionObj.mainIttf, productionObj.packiFiles, productionObj.context, {
                    transformer: transformerName
                 }).then((result: any) => {
                    return resolve(result);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName, 
                            mainIttf: productionObj.mainIttf, 
                            transformerName: transformerName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactTransformation_withPrepare.transformModel.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactTransformation_withPrepare.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getArtifactGeneration(owner: string, name: string, context: any) {
    return new Promise((resolve, reject) => {
            var artifactName = name;
            var filePathTobeGenerated: string;
            const ss = name.split('!');
            if (ss.length == 2 && ss[0] && ss[1]) {
                artifactName = ss[0];
                filePathTobeGenerated = ss[1];
            }
            console.log("wizziHubProductions.api.artifact.getArtifactGeneration", 'artifactName', artifactName, 'filePathTobeGenerated', filePathTobeGenerated, __filename);
            getArtifactProduction_withCache(owner, artifactName).then((ap: any) => 
                wizziProds.generateArtifact(filePathTobeGenerated || ap.mainIttf, ap.packiFiles, context).then((result: any) => {
                    const response = {
                        content: result.artifactContent, 
                        contentLength: result.artifactContent.length, 
                        contentType: result.contentType
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            requestArtifactName: name, 
                            artifactName: artifactName, 
                            mainIttf: filePathTobeGenerated || ap.mainIttf
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactGeneration.generateArtifact.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        requestArtifactName: name, 
                        artifactName: artifactName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactGeneration.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        }
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
            productionApi.prepareProduction('artifact', owner, productionName, requestQueryContextParam, rootContext).then((productionObj: any) => 
                wizziProds.generateArtifact(filePath || productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result: any) => {
                    const response = {
                        content: result.artifactContent, 
                        contentLength: result.artifactContent.length, 
                        contentType: result.contentType
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName, 
                            mainIttf: filePath || productionObj.mainIttf
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactGeneration_withPrepare.generateArtifact.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactGeneration_withPrepare.prepareProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactMTree(owner: string, productionName: string, rootContext: any) {
    return new Promise((resolve, reject) => 
            getArtifactProduction_withCache(owner, productionName).then((ap: any) => 
                wizziProds.mTree(ap.mainIttf, ap.packiFiles, rootContext).then((result: any) => {
                    const response = {
                        content: result.mTreeIttf, 
                        contentLength: result.mTreeIttf.length, 
                        contentType: 'text/plain'
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactMTree.mTree.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactMTree.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactMTree_withPrepare(
    owner: string, 
    productionName: string, 
    filePath: string, 
    requestQueryContextParam: string, 
    rootContext: any) {
    return new Promise((resolve, reject) => 
            productionApi.prepareProduction('artifact', owner, productionName, requestQueryContextParam, rootContext).then((productionObj: any) => 
                wizziProds.mTree(filePath && filePath.length > 0 ? filePath : productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result: any) => {
                    const response = {
                        content: result.mTreeIttf, 
                        contentLength: result.mTreeIttf.length, 
                        contentType: 'text/plain'
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactMTree.mTree.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactMTree.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactMTreeBuildUpScript(
    owner: string, 
    productionName: string, 
    filePath: string, 
    rootContext: any) {
    return new Promise((resolve, reject) => 
            getArtifactProduction_withCache(owner, productionName).then((ap: any) => 
                wizziProds.mTreeBuildUpScript(filePath && filePath.length > 0 ? filePath : ap.mainIttf, ap.packiFiles, rootContext).then((result: any) => {
                    const response = {
                        content: result.mTreeBuildUpScript, 
                        contentLength: result.mTreeBuildUpScript.length, 
                        contentType: 'text/plain'
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactMTreeBuildUpScript.mTree.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactMTreeBuildUpScript.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function getArtifactMTreeBuildUpScript_withPrepare(
    owner: string, 
    productionName: string, 
    filePath: string, 
    requestQueryContextParam: string, 
    rootContext: any) {
    return new Promise((resolve, reject) => 
            productionApi.prepareProduction('artifact', owner, productionName, requestQueryContextParam, rootContext).then((productionObj: any) => 
                wizziProds.mTreeBuildUpScript(filePath && filePath.length > 0 ? filePath : productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then((result: any) => {
                    const response = {
                        content: result.mTreeBuildUpScript, 
                        contentLength: result.mTreeBuildUpScript.length, 
                        contentType: 'text/plain'
                     };
                    return resolve(response);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                        err.parameter = {
                            artifactOwner: owner, 
                            artifactName: productionName
                         };
                    }
                    console.log("[31m%s[0m", 'getArtifactMTreeBuildUpScript.mTree.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                    err.parameter = {
                        artifactOwner: owner, 
                        artifactName: productionName
                     };
                }
                console.log("[31m%s[0m", 'getArtifactMTreeBuildUpScript.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function prepareGenerationFromWizziJson(req_files: packiTypes.PackiFiles):  Promise<any> {
    
    return new Promise((resolve, reject) => {
            
            let retPackiFiles: packiTypes.PackiFiles = req_files;
            
            const wizziJson = req_files['wizzi.json.ittf'];
            if (wizziJson) {
                wizziProds.generateArtifact('wizzi.json.ittf', {
                    'wizzi.json.ittf': {
                        type: wizziJson.type, 
                        contents: wizziJson.contents
                     }
                 }, {}).then((result: any) => {
                    const wizziJsonObj = JSON.parse(result.artifactContent);
                    getFragmentsFromWizziJson(wizziJsonObj).then((resultPackiFiles: packiTypes.PackiFiles) => {
                        retPackiFiles = mergePackiFiles(retPackiFiles, resultPackiFiles)
                        ;
                        getContextFromWizziJson(wizziJsonObj).then((resultContext) => {
                            return resolve({
                                    packiFiles: retPackiFiles, 
                                    context: resultContext
                                 });
                        }
                        )
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'getArtifactGeneration.getFragmentsFromWizziJson.error', err);
                        return reject(err);
                    }
                    )
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'getArtifactGeneration.generateArtifact.error', err);
                    return reject(err);
                }
                )
            }
            else {
                resolve({
                    packiFiles: req_files, 
                    context: {
                        
                     }
                 })
            }
        }
        );
}

export async function getFragmentsFromWizziJson(wizziJsonObj: any):  Promise<packiTypes.PackiFiles> {
    
    return new Promise((resolve, reject) => {
            
            let retPackiFiles: packiTypes.PackiFiles = {};
            if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
                return resolve(retPackiFiles);
            }
            var j = 0;
            (function next() {
                var tfolder = wizziJsonObj.fragments[j++];
                if (!tfolder) {
                    return resolve(retPackiFiles);
                }
                const parts = tfolder.path.split('/');
                tFolderApi.getTFolderProduction(parts[0], parts.slice(1).join('/')).then((result: CRUDResult) => {
                    const tf: ITFolderProductionModel = result.item;
                    const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                    retPackiFiles = mergePackiFiles(retPackiFiles, tf_packiFiles_object)
                    ;
                    next();
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'getFragmentsFromWizziJson.getTFolderProduction.error', err);
                    return reject(err);
                }
                )
            })();
        }
        );
}

export async function getContextFromWizziJson(wizziJsonObj: any):  Promise<any> {
    
    return new Promise((resolve, reject) => {
            
            let retContext: any = {};
            if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
                return resolve(retContext);
            }
            var j = 0;
            (function next() {
                var contextDef = wizziJsonObj.contexts[j++];
                if (!contextDef) {
                    return resolve(retContext);
                }
                const parts = contextDef.path.split('/');
                getArtifactContextItem(parts[0], contextDef.name + ';' + parts.slice(1).join('/')).then((contextObject: any) => {
                    retContext = Object.assign({}, retContext, contextObject)
                    ;
                    next();
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'getContextFromWizziJson.getArtifactContextItem.error', err);
                    return reject(err);
                }
                )
            })();
        }
        );
}