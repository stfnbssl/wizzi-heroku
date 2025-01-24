/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziMeta\api\wizziMeta.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import path from 'path';
import {verify, fSystem} from '@wizzi/utils';
import {WizziMetaRequest, WizziInMemoryMetaRef} from '../types';
import {wizziProds, wizziFactory} from '#/src/features/wizziProductions';
import {metaApi} from '#/src/features/wizziHubProductions';
import {packiTypes} from '#/src/features/packi';
const file = fSystem.vfile();

export async function getMetaParameters(options: WizziMetaRequest) {
    return new Promise((resolve, reject) => {
            const inMemoryMetas: WizziInMemoryMetaRef[] = options.inMemoryMetas || [];
            metaApi.getInMemoryMetaPlugins(inMemoryMetas).then(// log 'wizziMeta.getMetaParameters.options', options
            async (inMemoryItems: any) => {
                console.log('wizziMeta.getMetaParameters.inMemoryItems', Object.keys(inMemoryItems), __filename);
                let jsonwf = await wizziFactory.createJsonFsAndFactory({}, null, {
                        inMemoryItems: inMemoryItems
                     }, {});
                const mpOptions = {} as any;
                if (options.metaProductions) {
                    mpOptions.metaCtx = {};
                    var i, i_items=options.metaProductions, i_len=options.metaProductions.length, prod;
                    for (i=0; i<i_len; i++) {
                        prod = options.metaProductions[i];
                        if (prod && prod.name && prod.name[0]) {
                            const useProductionVar = 'use' + prod.name[0].toUpperCase() + prod.name.substring(1);
                            mpOptions.metaCtx[useProductionVar] = true;
                        }
                    }
                }
                jsonwf.wf.getMetaParameters(mpOptions, async (err, metaParameters) => {
                    if (err) {
                        return reject(err);
                    }
                    const metaParametersObj: { 
                        [key: string]: any;
                    } = {};
                    for (var k in metaParameters) {
                        const parts = k.split('/');
                        if (parts.length == 3 && parts[2] == 'index.json.ittf') {
                            const mpName = parts[1];
                            if (mpName) {
                                let mpObj = metaParametersObj[mpName];
                                if (!mpObj) {
                                    mpObj = metaParametersObj[mpName] = {};
                                }
                                mpObj.index = k;
                                mpObj.metaProductionName = mpName;
                            }
                        }
                        if (parts.length == 3 && parts[2] == 'globals.json.ittf') {
                            const mpName = parts[1];
                            if (mpName) {
                                let mpObj = metaParametersObj[mpName];
                                if (!mpObj) {
                                    mpObj = metaParametersObj[mpName] = {};
                                }
                                mpObj.globals = k;
                                mpObj.metaProductionName = mpName;
                            }
                        }
                    }
                    const metaParametersObjArray = Object.values(metaParametersObj);
                    const jsonwf2 = await wizziFactory.createJsonFsAndFactory(metaParameters, null, null, {});
                    function generateJson(count: number) {
                        const mpObj = metaParametersObjArray[count] as any;
                        if (!mpObj) {
                            const result = {
                                metaParametersObj: metaParametersObj, 
                                packiFiles: metaParameters
                             };
                            return resolve(result);
                        }
                        if (mpObj.index) {
                            jsonwf2.wf.loadModelAndGenerateArtifact(wizziFactory.ensurePackiFilePrefix(mpObj.index), {
                                modelRequestContext: {}, 
                                artifactRequestContext: {}
                             }, 'json/document', (err: any, result: any) => {
                                if (err) {
                                    return reject(err);
                                }
                                mpObj.parametersIndexObj = JSON.parse(result);
                                if (mpObj.globals) {
                                    jsonwf2.wf.loadModelAndGenerateArtifact(wizziFactory.ensurePackiFilePrefix(mpObj.globals), {
                                        modelRequestContext: {}, 
                                        artifactRequestContext: {}
                                     }, 'json/document', (err: any, result: any) => {
                                        if (err) {
                                            return reject(err);
                                        }
                                        mpObj.parametersGlobalsObj = JSON.parse(result);
                                        generateJson(count + 1)
                                    }
                                    )
                                }
                                else {
                                    generateJson(count + 1)
                                }
                            }
                            )
                        }
                        else {
                            if (mpObj.globals) {
                                jsonwf2.wf.loadModelAndGenerateArtifact(wizziFactory.ensurePackiFilePrefix(mpObj.globals), {
                                    modelRequestContext: {}, 
                                    artifactRequestContext: {}
                                 }, 'json/document', (err: any, result: any) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    mpObj.parametersGlobalsObj = JSON.parse(result);
                                    generateJson(count + 1)
                                }
                                )
                            }
                            else {
                                generateJson(count + 1)
                            }
                        }
                    }
                    generateJson(0)
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziMeta.getMetaParameters.error', err);
                return reject(err);
            }
            )
        }
        );
}


export async function getProvidedMetas(options: WizziMetaRequest) {
    const jsonwf = await wizziFactory.createJsonFsAndFactory({}, null, null, {});
    return new Promise((resolve, reject) => {
            console.log('wizziMeta.getMetaProvides.options', options, __filename);
            jsonwf.wf.getProvidedMetas((err, providedMetas) => {
                if (err) {
                    return reject(err);
                }
                return resolve(providedMetas);
            }
            )
        }
        );
}

export async function executeMetaProduction(options: WizziMetaRequest) {
    return new Promise(// log 'wizziMeta.executeMetaProduction.options', options
        (resolve, reject) => 
            createMetaCtx(options).then(// log 'wizziMeta.createWizziPackage.metaCtx', metaCtx
            (metaCtx: any) => {
                var pluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.plugins/packages';
                var metaPluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.metas/packages';
                var globalContext = {};
                wizziProds.executeMetaProduction(metaCtx, undefined, undefined, {}).then((packiFiles: any) => {
                    persistPackageFiles(packiFiles, options)
                    .then((packiFiles: any) => {
                        return resolve(packiFiles);
                    }
                    )
                    .catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.persistPackageFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.executeMetaProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.createMetaCtx.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function executeMetaProductionWithInMemoryPlugins(options: WizziMetaRequest) {
    return new Promise((resolve, reject) => {
            const inMemoryMetas: WizziInMemoryMetaRef[] = options.inMemoryMetas || [];
            metaApi.getInMemoryMetaPlugins(inMemoryMetas).then((inMemoryItems: any) => {
                console.log('wizziMeta.executeMetaProductionWithInMemoryPlugins.inMemoryItems', Object.keys(inMemoryItems), __filename);
                createMetaCtx(options).then(// log 'wizziMeta.createWizziPackage.metaCtx', metaCtx
                (metaCtx: any) => {
                    var pluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.plugins/packages';
                    var metaPluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.metas/packages';
                    var globalContext = {};
                    wizziProds.executeMetaProduction(metaCtx, undefined, undefined, {}, {
                        inMemoryItems: inMemoryItems
                     }).then((packiFiles: any) => {
                        persistPackageFiles(packiFiles, options)
                        .then((packiFiles: any) => {
                            return resolve(packiFiles);
                        }
                        )
                        .catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.persistPackageFiles.error', err);
                            return reject(err);
                        }
                        )
                    }
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.executeMetaProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.createMetaCtx.error', err);
                    return reject(err);
                }
                )
            }
            )
        }
        );
}
async function createMetaCtx(options: WizziMetaRequest) {
    return new Promise(// log 'createMetaCtx.options.metaCtxFilepath', options.metaCtxFilepath
        (resolve, reject) => {
            if (options.metaCtx) {
                return resolve(options.metaCtx);
            }
            if (verify.isEmpty(options.metaCtxFilepath)) {
                return reject('wizziMeta.createMetaCtx. Missing both metaCtx and metaCtxFilepath: ' + options.metaCtxFilepath);
            }
            wizziProds.loadModelFs(options.metaCtxFilepath as string, {
                metaCtx: {
                    pkgName: options.outputPackageName, 
                    description: options.description || options.outputPackageName
                 }
             }).then((metaCtx: any) => {
                return resolve(metaCtx);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziMeta.createMetaCtx.error', err);
                return reject(err);
            }
            )
        }
        );
}
async function persistPackageFiles(packiFiles: packiTypes.PackiFiles, options: WizziMetaRequest) {
    return new Promise((resolve, reject) => {
            if (options.persist) {
                // TODO
                if (options.persist.type == 'filesystem') {
                    return resolve(packiFiles);
                }
                else {
                    return reject('wizziMeta.persistPackageFiles. Unknown persist type: ' + options.persist.type);
                }
            }
            else {
                return resolve(packiFiles);
            }
        }
        );
}