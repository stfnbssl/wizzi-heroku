/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\actions\uploads.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import path from 'path';
import {PackiFiles} from '#/src/features/packi/types';
import {artifactApi, packageApi, pluginApi, metaApi, jobApi, tFolderApi} from '#/src/features/wizziHubProductions';
import {getFileContents, getFilteredPackiFiles} from './fsrepo';
export function uploadArtifact(
    owner: string, 
    name: string, 
    description: string, 
    mainIttf: string, 
    wizziSchema: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    artifactApi.mergeArtifactProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadArtifact.artifactApi.mergeArtifactProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    artifactApi.createArtifactProduction(owner, name, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadArtifact.artifactApi.createArtifactProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    artifactApi.getArtifactProduction(owner, name).then((ap: any) => 
                        artifactApi.updateArtifactProduction(ap.item._doc._id, owner, name, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadArtifact.artifactApi.createArtifactProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadArtifact.artifactApi.getArtifactProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadArtifact.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}

export function uploadPackage(
    owner: string, 
    name: string, 
    description: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    packageApi.mergePackageProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPackage.packageApi.mergePackageProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    packageApi.createPackageProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPackage.packageApi.createPackageProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    packageApi.getPackageProduction(owner, name).then((ap: any) => 
                        packageApi.updatePackageProduction(ap.item._doc._id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadPackage.packageApi.createPackageProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPackage.packageApi.getPackageProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadPackage.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}

export function uploadPlugin(
    owner: string, 
    name: string, 
    description: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    pluginApi.mergePluginProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPlugin.pluginApi.mergePluginProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    pluginApi.createPluginProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPlugin.pluginApi.createPluginProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    pluginApi.getPluginProduction(owner, name).then((ap: any) => 
                        pluginApi.updatePluginProduction(ap.item._doc._id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadPlugin.pluginApi.createPluginProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadPlugin.pluginApi.getPluginProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadPlugin.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}

export function uploadMeta(
    owner: string, 
    name: string, 
    description: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    metaApi.mergeMetaProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadMeta.metaApi.mergeMetaProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    metaApi.createMetaProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadMeta.metaApi.createMetaProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    metaApi.getMetaProduction(owner, name).then((ap: any) => 
                        metaApi.updateMetaProduction(ap.item._doc._id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadMeta.metaApi.createMetaProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadMeta.metaApi.getMetaProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadMeta.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}

export function uploadJob(
    owner: string, 
    name: string, 
    description: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    jobApi.mergeJobProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadJob.jobApi.mergeJobProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    jobApi.createJobProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadJob.jobApi.createJobProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    jobApi.getJobProduction(owner, name).then((ap: any) => 
                        jobApi.updateJobProduction(ap.item._doc._id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadJob.jobApi.createJobProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadJob.jobApi.getJobProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadJob.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}

export function uploadTFolder(
    owner: string, 
    name: string, 
    description: string, 
    options: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getFilteredPackiFiles(options).then((packiFiles: PackiFiles) => {
                if (options.merge) {
                    tFolderApi.mergeTFolderProductionFiles(owner, name, packiFiles, options).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadTFolder.tFolderApi.mergeTFolderProductionFiles.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.create) {
                    tFolderApi.createTFolderProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                        resolve(result)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadTFolder.tFolderApi.createTFolderProduction.error', err);
                        return reject(err);
                    }
                    )
                }
                else if (options.update) {
                    tFolderApi.getTFolderProduction(owner, name).then((ap: any) => 
                        tFolderApi.updateTFolderProduction(ap.item._doc._id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
                            resolve(result)
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'upload.uploadTFolder.tFolderApi.createTFolderProduction.error', err);
                            return reject(err);
                        }
                        )
                    
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'upload.uploadTFolder.tFolderApi.getTFolderProduction.error', err);
                        return reject(err);
                    }
                    )
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'upload.uploadTFolder.getFilteredPackiFiles.error', err);
                return reject(err);
            }
            )
        
        );
}
