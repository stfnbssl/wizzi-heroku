/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\apiv1meta.tsx.ittf
    utc time: Fri, 24 Jan 2025 15:11:52 GMT
*/
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import {ControllerType, AppInitializerType} from '#/src/features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure, sendError} from '#/src/utils/sendResponse';
import {restParamsCheck} from '#/src/utils/rest';
import {FcError, SYSTEM_ERROR} from '#/src/utils/error';
import {statusCode} from '#/src/utils';
import {wizziProductionsTypes, wizziProds, wizziFactory} from '#/src/features/wizziProductions';
import {packiTypes, PackiBuilder} from '#/src/features/packi';
import {mergePackiFiles} from '../utils';
import {getMetaProductionList, validateMetaProduction, getMetaProduction, getMetaProductionObjectById, updateMetaProduction, createMetaProduction, invalidateCache} from '../api/meta';
import {generateMetaProduction} from '../api/meta';
import {artifactApi, productionApi} from '#/src/features/wizziHubProductions';
const myname = 'features/wizziHubProductions/controllers/apiv1metaproduction';

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

export class ApiV1MetaProductionController implements ControllerType {
    
    public path = '/api/v1/production/meta';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ApiV1MetaProductionController.initialize');
        this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getMetas))
        this.router.get("/props/:id", makeHandlerAwareOfAsyncErrors(this.getMetaProperties))
        this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckMetaName))
        this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getMeta))
        this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putMeta))
        this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putMetaPackiDiffs))
        this.router.post("'/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postMeta))
        this.router.post("'/generate/:owner/:name", makeHandlerAwareOfAsyncErrors(this.generateMetaByName))
    };
    
    private getMetas = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getMetaProductionList({
            query: {
                owner: owner
             }
         }).then((result: any) => {
            if (result.ok) {
                sendSuccess(response, result)
            }
            else {
                console.log("[31m%s[0m", 'getMetas.error', result);
                sendFailure(response, {
                    err: result
                 }, 501)
            }
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getMetas.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getMetaProperties = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        productionApi.prepareProductionById('meta', id, '', {}).then((metaProductionSet: any) => 
            wizziProds.generateArtifact('properties/index.json.ittf', metaProductionSet.packiFiles, metaProductionSet.context).then(value => 
                sendSuccess(response, {
                    meta: JSON.parse(value.artifactContent)
                 })
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.packi.controllers.production.generateArtifact.error', err);
                sendFailure(response, {
                    err: err && err.message
                 }, 501)
            }
            )
        
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getMetaProperties.prepareProductionById.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getCheckMetaName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        validateMetaProduction(owner, name).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            sendFailure(response, {
                err: err
             }, 501)
        }
        )
    }
    ;
    
    private getMeta = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getMetaProduction(owner, name).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getMeta.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private postMeta = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        createMetaProduction(owner, name, request.body.description, JSON.stringify(request.body.packiFiles)).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'postMeta.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putMeta = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        var packiFiles = __check.notUndefined('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        exec_updateMetaProduction(request, response, packiFiles)
    }
    ;
    
    private putMetaPackiDiffs = async (request: Request, response: Response) => {
        console.log('putMetaPackiDiffs.request.params', request.params, __filename);
        console.log('putMetaPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getMetaProductionObjectById(id).then((prevMeta: any) => {
            console.log('putMetaPackiDiffs.prevPackiFiles', Object.keys(prevMeta.packiFiles), __filename);
            const pm = new PackiBuilder(prevMeta.packiFiles);
            pm.applyPatch_ChangesOnly(request.body.packiDiffs)
            return exec_updateMetaProduction(request, response, pm.packiFiles);
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putMetaPackiDiffs.getMetaProductionObjectById.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private generateMetaByName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        var owner = __check.notEmpty('params', 'owner');
        var metaCtx = __check.notEmpty('body', 'metaCtx');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        generateMetaProduction(owner, name, metaCtx).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'generateMetaByName.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
}
function exec_updateMetaProduction(request: any, response: any, packiFiles: any) {
    var __check = restParamsCheck(request);
    var id = __check.optional('params', 'id');
    var owner = __check.optional('body', 'owner');
    var name = __check.optional('body', 'name');
    var description = __check.optional('body', 'description');
    if (__check.hasErrors()) {
        return __check.sendErrors(response);
    }
    updateMetaProduction(id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => {
        invalidateCache(id)
        sendSuccess(response, result)
    }
    ).catch((err: any) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updateMetaProduction.updateMetaProduction.error', err);
        sendFailure(response, {
            err: err && err.message
         }, 501)
    }
    )
}