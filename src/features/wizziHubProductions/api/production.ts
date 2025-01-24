/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\production.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
//
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import * as productionTypes from '../types';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import * as artifactApi from './artifact';
import * as packageApi from './package';
import * as pluginApi from './plugin';
import * as metaApi from './meta';
import * as tFolderApi from './tfolder';
import {getArtifactGeneration, getArtifactTransformation, getDefaultContext_withCache, getArtifactContextItem} from './artifact';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.production';

// TODO
function setupProductionObject(productionType: productionTypes.PackiProduction, productionObject: any) {
    productionObject.packiProduction = productionType;
    productionObject.configPackiFile = productionObject.packiFiles[packiConstants.packiConfigPath];
    // TODO set a default configPackiFile based on productionType
    if (!productionObject.configPackiFile) {
        productionObject.configPackiFile = {
            tfolders: [
                
            ], 
            contexts: [
                
            ]
         };
    }
    return productionObject;
}

export async function getProductionById(productionType: productionTypes.PackiProduction, id: string) {
    return new Promise((resolve, reject) => {
            if (productionType == 'artifact') {
                artifactApi.getArtifactProductionById(id).then((result: any) => {
                    if (result.ok) {
                        resolve(result.item)
                    }
                    else {
                        reject(result)
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionById.getArtifactProductionById.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'package') {
                packageApi.getPackageProductionById(id).then((result: any) => {
                    if (result.ok) {
                        resolve(result.item)
                    }
                    else {
                        reject(result)
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionById.getPackageProductionById.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'meta') {
                metaApi.getMetaProductionById(id).then((result: any) => {
                    if (result.ok) {
                        resolve(result.item)
                    }
                    else {
                        reject(result)
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionById.getMetaProductionById.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'plugin') {
                pluginApi.getPluginProductionById(id).then((result: any) => {
                    if (result.ok) {
                        resolve(result.item)
                    }
                    else {
                        reject(result)
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionById.getPluginProductionById.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'tfolder') {
                tFolderApi.getTFolderProductionById(id).then((result: any) => {
                    if (result.ok) {
                        resolve(result.item)
                    }
                    else {
                        reject(result)
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionById.getTFolderProductionById.error', err);
                    return reject(err);
                }
                )
            }
            else {
                throw new Error("features.wizziHubProductions.api.production.getProductionById: productionType " + productionType + " not implemented");
            }
        }
        );
}

export async function getProductionObject(productionType: productionTypes.PackiProduction, owner: string, name: string) {
    return new Promise((resolve, reject) => {
            if (productionType == 'artifact') {
                artifactApi.getArtifactProductionObject(owner, name).then((productionObject: any) => 
                    resolve(setupProductionObject(productionType, productionObject))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionObject.getArtifactProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'package') {
                packageApi.getPackageProductionObject(owner, name).then((productionObject: any) => 
                    resolve(setupProductionObject(productionType, productionObject))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionObject.getPackageProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'meta') {
                metaApi.getMetaProductionObject(owner, name).then((productionObject: any) => 
                    resolve(setupProductionObject(productionType, productionObject))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionObject.getMetaProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'plugin') {
                pluginApi.getPluginProductionObject(owner, name).then((productionObject: any) => 
                    resolve(setupProductionObject(productionType, productionObject))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionObject.getPluginProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else if (productionType == 'tfolder') {
                tFolderApi.getTFolderProductionObject(owner, name).then((productionObject: any) => 
                    resolve(setupProductionObject(productionType, productionObject))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.getProductionObject.getTFolderObject.error', err);
                    return reject(err);
                }
                )
            }
            else {
                throw new Error("features.wizziHubProductions.api.production.getProductionObject: productionType " + productionType + " not implemented");
            }
        }
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
async function prepareProductionById(
    productionType: productionTypes.PackiProduction, 
    id: string, 
    requestQueryContextParam: string, 
    rootContext: any) {
    return new Promise((resolve, reject) => 
            getProductionById(productionType, id).then((productionItem: any) => 
                prepareProduction(productionType, productionItem.owner, productionItem.name, requestQueryContextParam, rootContext).then((result: any) => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProductionById.prepareProduction.error', err);
                    return reject(err);
                }
                )
            
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProductionById.getProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}

export // rootContext      Object.assign( {}, request.query, { isWizziStudio, locals.user } )
/**
    // __key__production_flow
    // returns an object with packiFiles and context ready for generation
    // Called by features.wizziHubProductions.api.artifact.getArtifactGeneration_withPrepare
    // Called by features.wizziHubProductions.api.meta.generateMetaProduction
    // Called by features.wizziHubProductions.api.meta.getTemplatePackiFiles
    // Called by handlers of features.wizziHubProductions.controllers.apiv1generations
*/
async function prepareProduction(
    productionType: productionTypes.PackiProduction, 
    owner: string, 
    productionName: string, 
    requestQueryContextParam: string, 
    rootContext: any) {
    console.log(myname + 'prepareProduction entered', owner, productionName, __filename);
    return new Promise((resolve, reject) => 
            getDefaultContext_withCache(owner, rootContext).then((defaultContext: any) => {
                console.log(myname + 'prepareProduction.getDefaultContext_withCache completed', Object.keys(defaultContext), __filename);
                getProductionObject(productionType, owner, productionName).then((productionObject: any) => {
                    if (productionObject.configPackiFile) {
                        getProductionSetFromProductionObject(owner, productionName, productionObject.configPackiFile, productionObject.packiFiles, defaultContext).then((productionSet: any) => {
                            productionObject.packiFiles = productionSet.packiFiles;
                            productionObject.context = productionSet.context;
                            getProductionSetByQueryContext(owner, productionName, requestQueryContextParam, productionObject.packiFiles, productionObject.context).then((queryProductionSet: any) => {
                                productionObject.packiFiles = queryProductionSet.packiFiles;
                                productionObject.context = queryProductionSet.context;
                                resolve(productionObject)
                            }
                            ).catch((err: any) => {
                                if (typeof err === 'object' && err !== null) {
                                }
                                console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProduction.getContextByQueryContext.error', err);
                                return reject(err);
                            }
                            )
                        }
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProduction.getContextByProductionObject.error', err);
                            return reject(err);
                        }
                        )
                    }
                    else {
                        getProductionSetByQueryContext(owner, productionName, requestQueryContextParam, productionObject.packiFiles, defaultContext).then((queryProductionSet: any) => {
                            productionObject.packiFiles = queryProductionSet.packiFiles;
                            productionObject.context = queryProductionSet.context;
                            resolve(productionObject)
                        }
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProduction.getContextByQueryContext.error', err);
                            return reject(err);
                        }
                        )
                    }
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProduction.getProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.production.prepareProduction.getDefaultContext_withCache.error', err);
                return reject(err);
            }
            )
        
        );
}

/**
    // __key__production_flow
    // Called by wizziHubProductions.api.production.prepareProduction
    // increments progressivePackiFiles and progressiveContext
*/
async function getProductionSetFromProductionObject(
    owner: string, 
    productionName: string, 
    configPackiFile: packiTypes.PackiFile, 
    progressivePackiFiles: packiTypes.PackiFiles, 
    progressiveContext: { 
        [key: string]: any;
    }):  Promise<{ 
    packiFiles: packiTypes.PackiFiles;
    context: { 
        [key: string]: any;
    };
}> {
    
    progressiveContext = Object.assign({}, progressiveContext, {
        ctxByProductionObject: "Hello by ProductionObject"
     })
    ;
    return new Promise((resolve, reject) => {
            
            if (configPackiFile) {
                wizziProds.generateArtifact(packiConstants.packiConfigPath, {
                    [packiConstants.packiConfigPath]: {
                        type: configPackiFile.type, 
                        contents: configPackiFile.contents
                     }
                 }, progressiveContext).then((generationResult: any) => {
                    const packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
                    getTFoldersPackiFilesFromPackiConfigJson(owner, packiConfigJsonObj).then(// if packiConfigJsonObj does not contain tfolders an empty object is returned
                    (tFoldersPackiFiles: packiTypes.PackiFiles) => {
                        progressivePackiFiles = mergePackiFiles(progressivePackiFiles, tFoldersPackiFiles)
                        ;
                        addContextPropertiesFromPackiConfigJson(owner, packiConfigJsonObj, progressiveContext).then((resultProductionContext) => {
                            return resolve({
                                    packiFiles: progressivePackiFiles, 
                                    context: resultProductionContext
                                 });
                        }
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'getArtifactGeneration.addContextPropertiesFromPackiConfigJson.error', err);
                            return reject(err);
                        }
                        )
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'getArtifactGeneration.getTFoldersPackiFilesFromPackiConfigJson.error', err);
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
                    packiFiles: progressivePackiFiles, 
                    context: progressiveContext
                 })
            }
        }
        );
}

export async function getTFoldersPackiFilesFromPackiConfigJson(owner: string, packiConfigJsonObj: any):  Promise<packiTypes.PackiFiles> {
    
    return new Promise((resolve, reject) => {
            
            var tFoldersPackiFiles: packiTypes.PackiFiles = {};
            const hasTFolders = packiConfigJsonObj && packiConfigJsonObj.tfolders && packiConfigJsonObj.tfolders.length > 0;
            if (!hasTFolders) {
                return resolve(tFoldersPackiFiles);
            }
            
            var j = 0;
            (function next() {
                var tfolder = packiConfigJsonObj.tfolders[j++];
                if (!tfolder) {
                    return resolve(tFoldersPackiFiles);
                }
                if (!tfolder.name) {
                    return next();
                }
                tFolderApi.getTFolderProduction(owner, tfolder.name).then((result: CRUDResult) => {
                    const tf: productionTypes.ITFolderProductionModel = result.item;
                    const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                    tFoldersPackiFiles = mergePackiFiles(tFoldersPackiFiles, tf_packiFiles_object)
                    ;
                    next();
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'getTFoldersPackiFilesFromPackiConfigJson.getTFolder.error', err);
                    return reject(err);
                }
                )
            })();
        }
        );
}


/**
    // __key__production_flow
*/
async function addContextPropertiesFromPackiConfigJson(owner: string, packiConfigJsonObj: any, progressiveContext: any):  Promise<any> {
    return new Promise((resolve, reject) => {
            
            if (!!(packiConfigJsonObj && packiConfigJsonObj.contexts && packiConfigJsonObj.contexts.length > 0) == false) {
                return resolve(progressiveContext);
            }
            var j = 0;
            (function next() {
                var contextConfig = packiConfigJsonObj.contexts[j++];
                if (!contextConfig) {
                    return resolve(progressiveContext);
                }
                if (!contextConfig.propertyName || !contextConfig.artifactName) {
                    return next();
                }
                getArtifactContextItem(owner, contextConfig.propertyName + ';' + contextConfig.artifactName + (contextConfig.transformationName ? ';' + contextConfig.transformationName : ''), progressiveContext).then((resultContextItem: any) => {
                    progressiveContext = Object.assign({}, progressiveContext, resultContextItem)
                    ;
                    next();
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'addContextPropertiesFromPackiConfigJson.getArtifactContextItem.error', err);
                    return reject(err);
                }
                )
            })();
        }
        );
}
/**
    // param requestQueryContextParamString: contexts[@tfolders]
    // contexts: context-1[|context-2[|...context-n]
    // context-x: contextPropertyName;artifactName[;transformName]
    // tfolders: tfolder-1[|tfolder-2[|...tfolder-n]
    // tfolders-x: tfolderName
    // sample requestQueryContextParamString: "wzCtx;wzctx.json|db;item.db.json@html|css|js"
    // context property 'wzCtx' will contain json document 'wzctx.json'
    // context property 'db' will contain json document 'item.db.json'
    // fragments from tFolders html, css and js will be added to production packiFiles
*/
async function getProductionSetByQueryContext(
    owner: string, 
    productionName: string, 
    requestQueryContextParamString: string, 
    progressivePackiFiles: packiTypes.PackiFiles, 
    progressiveContext: any) {
    
    progressiveContext = Object.assign({}, progressiveContext, {
        ctxByQueryContext: "Hello by QueryContext"
     })
    ;
    return new Promise((resolve, reject) => {
            if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
                const requestQueryContextParamItems = requestQueryContextParamString.split('|');
                var j = 0;
                (function next() {
                    var requestQueryContextParamItem = requestQueryContextParamItems[j++];
                    if (!requestQueryContextParamItem) {
                        return resolve({
                                packiFiles: progressivePackiFiles, 
                                context: progressiveContext
                             });
                    }
                    getArtifactContextItem(owner, requestQueryContextParamItem, progressiveContext).then((resultItemContext: any) => {
                        progressiveContext = Object.assign({}, progressiveContext, resultItemContext)
                        ;
                        next();
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'getProductionSetByQueryContext.getArtifactContextItem.error', err);
                        return reject(err);
                    }
                    )
                })();
            }
            else {
                resolve({
                    packiFiles: progressivePackiFiles, 
                    context: progressiveContext
                 })
            }
        }
        );
}

export async function getCliCtxFromPackiConfig(
    owner: string, 
    packiConfigJsonObj: any, 
    packiFiles: packiTypes.PackiFiles, 
    progressiveContext: any) {
    return new Promise((resolve, reject) => {
            if (!packiConfigJsonObj.meta || !packiConfigJsonObj.meta.metaCtx) {
                return resolve({});
            }
            const kind = packiConfigJsonObj.meta.metaCtx.kind;
            let filePath;
            let artifact;
            if (kind == "file") {
                filePath = packiConfigJsonObj.meta.metaCtx.filePath;
                return resolve(getCliCtxFromPackiFile(filePath, packiFiles, progressiveContext));
            }
            else if (kind == "artifact") {
                artifact = packiConfigJsonObj.meta.metaCtx.artifact;
                artifactApi.getArtifactGeneration_withPrepare(owner, packiConfigJsonObj.meta.metaCtx.artifact.name, "", progressiveContext, "").then((generationResult: any) => 
                    resolve(JSON.parse(generationResult.content))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'api.production.getCliCtxFromPackiConfig.getArtifactGeneration_withPrepare.error', err);
                    return reject(err);
                }
                )
            }
            else {
                return resolve({});
            }
        }
        );
}

export async function getCliCtxFromPackiFile(filePath: string, packiFiles: packiTypes.PackiFiles, progressiveContext: any) {
    return new Promise((resolve, reject) => 
            wizziProds.generateArtifact(filePath, packiFiles, progressiveContext).then((generationResult: any) => 
                resolve(JSON.parse(generationResult.artifactContent))
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'api.production.getCliCtxFromPackiFile.generateArtifact.error', err);
                return reject(err);
            }
            )
        
        );
}