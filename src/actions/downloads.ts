/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\actions\downloads.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import path from 'path';
import {fSystem, verify} from '@wizzi/utils';
import {PackiFiles} from '#/src/features/packi/types';
import {artifactApi, packageApi, pluginApi, metaApi, jobApi, tFolderApi} from '#/src/features/wizziHubProductions';
import type {DownloadOptions} from './types';
export function downloadArtifactList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            artifactApi.getArtifactProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'ArtifactList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadArtifact.getArtifactProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadArtifact(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            artifactApi.getArtifactProductionObject(owner, name).then(// info 'artifactApi.getArtifactProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadArtifact.getArtifactProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export function downloadPackageList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            packageApi.getPackageProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'PackageList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadPackage.getPackageProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadPackage(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            packageApi.getPackageProductionObject(owner, name).then(// info 'packageApi.getPackageProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadPackage.getPackageProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export function downloadPluginList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            pluginApi.getPluginProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'PluginList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadPlugin.getPluginProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadPlugin(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            pluginApi.getPluginProductionObject(owner, name).then(// info 'pluginApi.getPluginProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadPlugin.getPluginProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export function downloadMetaList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            metaApi.getMetaProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'MetaList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadMeta.getMetaProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadMeta(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            metaApi.getMetaProductionObject(owner, name).then(// info 'metaApi.getMetaProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadMeta.getMetaProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export function downloadJobList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            jobApi.getJobProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'JobList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadJob.getJobProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadJob(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            jobApi.getJobProductionObject(owner, name).then(// info 'jobApi.getJobProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadJob.getJobProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export function downloadTFolderList(owner: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            tFolderApi.getTFolderProductionList({
                owner
             }).then((result: any) => {
                if (options.destFolder) {
                    writeJSONToDest(path.join(options.destFolder, '..', '.packi', 'TFolderList.json'), result)
                    var i, i_items=result.item, i_len=result.item.length, item;
                    for (i=0; i<i_len; i++) {
                        item = result.item[i];
                        const packiFiles: PackiFiles = JSON.parse(item.packiFiles);
                        writePackiToDest(packiFiles, path.join(options.destFolder, verify.replaceAll(item.name, '/', '_')))
                    }
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadTFolder.getTFolderProductionList.error', err);
                return reject(err);
            }
            )
        
        );
}
export function downloadTFolder(owner: string, name: string, options: DownloadOptions):  Promise<any> {
    return new Promise((resolve, reject) => 
            tFolderApi.getTFolderProductionObject(owner, name).then(// info 'tFolderApi.getTFolderProductionObject.result', Object.keys(result)
            (result: any) => {
                if (options.destFolder) {
                    writePackiToDest(result.packiFiles, options.destFolder)
                }
                return resolve(result.item);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'download.downloadTFolder.getTFolderProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

function writeJSONToDest(destPath: string, json: any) {
    fSystem.vfile().write(destPath, JSON.stringify(json, null, 2));
}

function writePackiToDest(packiFiles: PackiFiles, destFolder: string) {
    for (var k in packiFiles) {
        const pf = packiFiles[k];
        if (pf) {
            fSystem.vfile().write(path.join(destFolder, k), pf.contents)
        }
    }
}
