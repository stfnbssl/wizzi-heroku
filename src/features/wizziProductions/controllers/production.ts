/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziProductions\controllers\production.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import {ControllerType, AppInitializerType} from '#/src/features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure, sendError} from '#/src/utils/sendResponse';
import {restParamsCheck} from '#/src/utils/rest';
import {FcError, SYSTEM_ERROR} from '#/src/utils/error';
import {statusCode} from '#/src/utils';
import fs from 'fs';
import path from 'path';
import {ArtifactRequest, MetaContext} from '../types';
import * as wizziFactory from '../factory';
import * as wizziProds from '../productions';
import {packiTypes} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {resolveContexts} from '../api/context';
import {file} from '@wizzi/factory';
const myname = 'features/wizzi/controller/productions';

function makeHandlerAwareOfAsyncErrors(handler: any) {
    return async function(request: Request, response: Response, next: NextFunction) {
            try {
                await handler(request, response, next);
            } 
            catch (error: any) {
                if (error instanceof FcError) {
                    response.status(statusCode.BAD_REQUEST).send({
                        error: {
                            code: error.code, 
                            message: error.message, 
                            data: error.data || {}
                         }
                     })
                }
                else {
                    const fcError = new FcError(SYSTEM_ERROR);
                    response.status(statusCode.BAD_REQUEST).send({
                        error: {
                            code: fcError.code, 
                            message: error.message, 
                            data: fcError.data || {}
                         }
                     })
                }
            } 
        };
}

export class ProductionController implements ControllerType {
    
    public path = '/api/v1/wizzi/production';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ProductionController.initialize');
        this.router.post("/artifact", makeHandlerAwareOfAsyncErrors(this.artifact))
        this.router.post("/folder/artifacts", makeHandlerAwareOfAsyncErrors(this.folderArtifacts))
        this.router.post("/mtree", makeHandlerAwareOfAsyncErrors(this.mTree))
        this.router.post("/mtreescript", makeHandlerAwareOfAsyncErrors(this.mTreeBuildUpScript))
        this.router.post("/wizzify", makeHandlerAwareOfAsyncErrors(this.wizzify))
        this.router.post("/mtreescan", makeHandlerAwareOfAsyncErrors(this.mTreeScan))
        this.router.post("/meta/execute", makeHandlerAwareOfAsyncErrors(this.metaExecute))
        this.router.post("/wrapittf", makeHandlerAwareOfAsyncErrors(this.wrapIttfText))
    };
    
    private artifact = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        resolveContexts(artifactRequest.contextItems || []).then((context: any) => {
            if (artifactRequest.ittfDocument) {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.generateArtifactFs(path.join(config.ittfPath, artifactRequest.ittfDocument.path as string), context).then(generatedArtifact => 
                        sendSuccess(response, generatedArtifact)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifactFs.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.generateArtifact(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.packiFiles as packiTypes.PackiFiles, context).then((generatedArtifact: any) => 
                        sendSuccess(response, generatedArtifact)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.generateArtifactDb(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.path as string, context).then((generatedArtifact: any) => 
                        sendSuccess(response, generatedArtifact)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else {
                    sendError(response, {
                        err: {
                            message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
                         }
                     })
                }
            }
            else {
                sendError(response, {
                    err: {
                        message: "Invalid artifactRequest"
                     }
                 })
            }
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.artifact.resolveContexts.error', err);
            sendError(response, err)
        }
        )
    }
    ;
    
    private folderArtifacts = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        resolveContexts(artifactRequest.contextItems || []).then((context: any) => {
            if (artifactRequest.ittfFolder) {
                const sourceError = {
                    err: {
                        message: "Invalid artifactRequest.ittfFolder.source: " + artifactRequest.ittfFolder.source
                     }
                 };
                if (artifactRequest.ittfFolder.source == 'packi') {
                    if (artifactRequest.ittfFolder.sourceFolderUri && artifactRequest.ittfFolder.destFolderUri && artifactRequest.ittfFolder.packiFiles) {
                        wizziProds.generateFolderArtifacts(artifactRequest.ittfFolder.sourceFolderUri, artifactRequest.ittfFolder.destFolderUri, artifactRequest.ittfFolder.packiFiles, context, {
                            generateFragments: artifactRequest.ittfFolder.generateFragments
                         }).then((packiFiles: any) => {
                            console.log("features/wizzi/controller/productions.handler.folderArtifacts.generateFolderArtifacts.result", Object.keys(packiFiles), __filename);
                            sendSuccess(response, packiFiles)
                        }
                        ).catch((err: any) => {
                            if (typeof err === 'object' && err !== null) {
                            }
                            console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.folderArtifacts.generateFolderArtifacts.error', err);
                            sendError(response, err)
                        }
                        )
                    }
                    else {
                        sendError(response, {
                            err: {
                                message: "Invalid artifactRequest.ittfFolder.sourceFolderUri: missing"
                             }
                         })
                    }
                }
                else {
                    sendError(response, {
                        err: {
                            message: "Invalid artifactRequest.ittfFolder.source: " + artifactRequest.ittfFolder.source
                         }
                     })
                }
            }
            else {
                sendError(response, {
                    err: {
                        message: "Invalid artifactRequest"
                     }
                 })
            }
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", '} features/wizzi/controller/productions.handler.folderArtifacts.resolveContexts.error', err);
            sendError(response, err)
        }
        )
    }
    ;
    
    private mTree = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        resolveContexts(artifactRequest.contextItems || []).then((context: any) => {
            if (artifactRequest.ittfDocument) {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeFs(path.join(config.ittfPath, artifactRequest.ittfDocument.path as string), context).then(mTree => 
                        sendSuccess(response, {
                            mTree: mTree.mTreeIttf
                         })
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeFs.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTree(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.packiFiles as packiTypes.PackiFiles, context).then((mTree: any) => 
                        sendSuccess(response, {
                            mTree: mTree.mTreeIttf
                         })
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTree.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeDb(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.path as string, context).then((mTree: any) => 
                        sendSuccess(response, {
                            mTree: mTree.mTreeIttf
                         })
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeDb.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else {
                    sendError(response, {
                        err: {
                            message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
                         }
                     })
                }
            }
            else {
                sendError(response, {
                    err: {
                        message: "Invalid artifactRequest"
                     }
                 })
            }
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", '} features/wizzi/controller/productions.handler.mTree.resolveContexts.error', err);
            sendError(response, err)
        }
        )
    }
    ;
    
    private mTreeBuildUpScript = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        resolveContexts(artifactRequest.contextItems || []).then((context: any) => {
            if (artifactRequest.ittfDocument) {
                if (artifactRequest.ittfDocument.source == 'fs') {
                    wizziProds.mTreeBuildUpScriptFs(path.join(config.ittfPath, artifactRequest.ittfDocument.path as string), context).then(mTreeBuildUpScript => 
                        sendSuccess(response, mTreeBuildUpScript)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptFs.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'packi') {
                    wizziProds.mTreeBuildUpScript(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.packiFiles as packiTypes.PackiFiles, context).then((mTreeBuildUpScript: any) => 
                        sendSuccess(response, mTreeBuildUpScript)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScript.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else if (artifactRequest.ittfDocument.source == 'db') {
                    wizziProds.mTreeBuildUpScriptDb(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.path as string, context).then((mTreeBuildUpScript: any) => 
                        sendSuccess(response, mTreeBuildUpScript)
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptDb.error', err);
                        sendError(response, err)
                    }
                    )
                }
                else {
                    sendError(response, {
                        err: {
                            message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
                         }
                     })
                }
            }
            else {
                sendError(response, {
                    err: {
                        message: "Invalid artifactRequest"
                     }
                 })
            }
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeBuildUpScript.resolveContexts.error', err);
            sendError(response, err)
        }
        )
    }
    ;
    
    private wizzify = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        if (artifactRequest.wizzifiable) {
            if (artifactRequest.wizzifiable.source == 'fs') {
                wizziProds.wizzifyFs(artifactRequest.wizzifiable.filePath).then(wizzifiedContents => 
                    sendSuccess(response, {
                        wizzified: wizzifiedContents
                     })
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.wizzify.wizziProds.wizzifyFs.error', err);
                    sendError(response, err)
                }
                )
            }
            else if (artifactRequest.wizzifiable.source == 'packi') {
                wizziProds.wizzify(artifactRequest.wizzifiable.packiFiles).then(wizzifiedPackiFiles => 
                    sendSuccess(response, {
                        wizzifiedPackiFiles: wizzifiedPackiFiles
                     })
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.wizzify.wizziProds.wizzify.error', err);
                    sendError(response, err)
                }
                )
            }
            else {
                sendError(response, {
                    err: {
                        message: "Invalid artifactRequest.wizzifiable.source: " + artifactRequest.wizzifiable.source
                     }
                 })
            }
        }
        else {
            sendError(response, {
                err: {
                    message: "Invalid artifactRequest. Missing `wizzifiable` parameter"
                 }
             })
        }
    }
    ;
    
    private mTreeScan = async (request: Request, response: Response) => {
        const artifactRequest: ArtifactRequest = request.body;
        if (artifactRequest.ittfDocument) {
            var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
            if (artifactRequest.ittfDocument.source == 'fs') {
                wizziProds.scanIttfDocumentFs(path.join(config.ittfPath, artifactRequest.ittfDocument.path as string), rootFolder).then(mTreeScan => 
                    sendSuccess(response, {
                        mTreeScan: mTreeScan
                     })
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanFs.error', err);
                    sendError(response, err)
                }
                )
            }
            else if (artifactRequest.ittfDocument.source == 'packi') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocument(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.packiFiles as packiTypes.PackiFiles, rootFolder).then((mTreeScan: any) => 
                    sendSuccess(response, {
                        mTreeScan: mTreeScan
                     })
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScan.error', err);
                    sendError(response, err)
                }
                )
            }
            else if (artifactRequest.ittfDocument.source == 'db') {
                var rootFolder = artifactRequest.ittfDocument.rootFolder || '';
                wizziProds.scanIttfDocumentDb(artifactRequest.ittfDocument.mainIttf as string, artifactRequest.ittfDocument.path as string, rootFolder).then((mTreeScan: any) => 
                    sendSuccess(response, {
                        mTreeScan: mTreeScan
                     })
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanDb.error', err);
                    sendError(response, err)
                }
                )
            }
            else {
                sendFailure(response, {
                    err: {
                        message: 'Invalid artifactRequest.ittfDocument.source ' + artifactRequest.ittfDocument.source
                     }
                 }, 501)
            }
        }
        else {
            sendError(response, {
                err: {
                    message: "Invalid artifactRequest. Missing `ittfDocument` parameter"
                 }
             })
        }
    }
    ;
    
    private wrapIttfText = async (request: Request, response: Response) => 
        wizziProds.wrapIttfText(request.body.schema, request.body.ittfText).then((wrappedIttfText: string) => 
            sendSuccess(response, {
                wrappedIttfText: wrappedIttfText
             })
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'features/wizzi/controller/productions.handler.mTreeScan.wizziProds.wrapIttfText.error', err);
            sendError(response, err)
        }
        )
    
    ;
    
    private metaExecute = async (request: Request, response: Response) => {
        throw new Error("features/wizzi/controller/productions.handler.metaExecute not implemented");
    }
    ;
}