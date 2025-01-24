/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\apiv1artifact.tsx.ittf
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
import {getArtifactProductionList, validateArtifactProduction, getArtifactProduction, getArtifactProductionObjectById, updateArtifactProduction, createArtifactProduction, invalidateCache} from '../api/artifact';
const myname = 'features/wizziHubProductions/controllers/apiv1artifact';

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

export class ApiV1ArtifactProductionController implements ControllerType {
    
    public path = '/api/v1/production/artifact';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ApiV1ArtifactProductionController.initialize');
        this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getArtifacts))
        this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckArtifactName))
        this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getArtifact))
        this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putArtifact))
        this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putArtifactPackiDiffs))
        this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postArtifact))
    };
    
    private getArtifacts = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getArtifactProductionList({
            query: {
                owner: owner
             }
         }).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getArtifacts.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getCheckArtifactName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        validateArtifactProduction(owner, name).then((result: any) => 
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
    
    private getArtifact = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getArtifactProduction(owner, name).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getArtifact.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private postArtifact = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        var description = __check.notEmpty('body', 'description');
        var mainIttf = __check.notEmpty('body', 'mainIttf');
        var wizziSchema = __check.notEmpty('body', 'wizziSchema');
        var packiFiles = __check.notUndefined('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        createArtifactProduction(owner, name, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then((result: any) => {
            invalidateCache(owner, name)
            sendSuccess(response, result)
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'postArtifact.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putArtifact = async (request: Request, response: Response) => {
        console.log('putArtifact.request.params', request.params, __filename);
        console.log('putArtifact.request.body', Object.keys(request.body), __filename);
        var __check = restParamsCheck(request);
        var packiFiles = __check.notUndefined('body', 'packiFiles');
        var options = __check.optional('body', 'options');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        console.log('putArtifact.request.body.packiFiles', Object.keys(packiFiles), __filename);
        if (options && options.wizzify) {
            wizziProds.wizzify(packiFiles).then((resultPackiFiles: any) => {
                console.log('putArtifact.wizzify.resultPackiFiles', Object.keys(resultPackiFiles), __filename);
                return exec_updateArtifactProduction(request, response, resultPackiFiles);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putArtifact.wizzify.error', err);
                sendFailure(response, {
                    err: err && err.message
                 }, 501)
            }
            )
        }
        else if (options && options.merge) {
            var __check = restParamsCheck(request);
            var id = __check.notUndefined('params', 'id');
            if (__check.hasErrors()) {
                return __check.sendErrors(response);
            }
            getArtifactProductionObjectById(id).then((prevArtifact: any) => {
                const resultPackiFiles = mergePackiFiles(prevArtifact.packiFiles, packiFiles);
                console.log('putArtifact.merge.resultPackiFiles', Object.keys(resultPackiFiles), __filename);
                return exec_updateArtifactProduction(request, response, resultPackiFiles);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'putArtifact.merge.getArtifactProductionById.error', err);
                sendFailure(response, {
                    err: err && err.message
                 }, 501)
            }
            )
        }
        else {
            exec_updateArtifactProduction(request, response, packiFiles)
        }
    }
    ;
    
    private putArtifactPackiDiffs = async (request: Request, response: Response) => {
        console.log('putArtifactPackiDiffs.request.params', request.params, __filename);
        console.log('putArtifactPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getArtifactProductionObjectById(id).then((prevArtifact: any) => {
            console.log('putArtifactPackiDiffs.prevPackiFiles', Object.keys(prevArtifact.packiFiles), __filename);
            const pm = new PackiBuilder(prevArtifact.packiFiles);
            pm.applyPatch_ChangesOnly(request.body.packiDiffs)
            return exec_updateArtifactProduction(request, response, pm.packiFiles);
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putArtifactPackiDiffs.getArtifactProductionObjectById.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
}
function exec_updateArtifactProduction(request: any, response: any, packiFiles: any) {
    var __check = restParamsCheck(request);
    var id = __check.optional('params', 'id');
    var owner = __check.optional('body', 'owner');
    var name = __check.optional('body', 'name');
    var description = __check.optional('body', 'description');
    var mainIttf = __check.optional('body', 'mainIttf');
    var wizziSchema = __check.optional('body', 'wizziSchema');
    if (__check.hasErrors()) {
        return __check.sendErrors(response);
    }
    updateArtifactProduction(id, owner, name, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then((result: any) => {
        invalidateCache(id)
        sendSuccess(response, result)
    }
    ).catch((err: any) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updateArtifactProduction.updateArtifactProduction.error', err);
        sendFailure(response, {
            err: err && err.message
         }, 501)
    }
    )
}