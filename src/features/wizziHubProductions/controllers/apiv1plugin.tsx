/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\apiv1plugin.tsx.ittf
    utc time: Fri, 24 Jan 2025 13:13:18 GMT
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
import {getPluginProductionList, validatePluginProduction, getPluginProduction, getPluginProductionObjectById, updatePluginProduction, createPluginProduction, invalidateCache} from '../api/plugin';

const myname = 'features/wizziHubProductions/controllers/apiv1plugin';

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

export class ApiV1PluginProductionController implements ControllerType {
    
    public path = '/api/v1/production/plugin';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ApiV1PluginProductionController.initialize');
        this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getPlugins))
        this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckPluginName))
        this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPlugin))
        this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putPlugin))
        this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putPluginPackiDiffs))
        this.router.post("/:post", makeHandlerAwareOfAsyncErrors(this.postPlugin))
    };
    
    private getPlugins = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPluginProductionList({
            query: {
                owner: owner
             }
         }).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPlugins.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getCheckPluginName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        validatePluginProduction(owner, name).then((result: any) => 
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
    
    private getPlugin = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPluginProduction(owner, name).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPlugin.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private postPlugin = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        var description = __check.notEmpty('body', 'description');
        var packiFiles = __check.notEmpty('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        createPluginProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'postPlugin.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putPlugin = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        var owner = __check.notEmpty('body', 'owner');
        var name = __check.notEmpty('body', 'name');
        var description = __check.notEmpty('body', 'description');
        var packiFiles = __check.notEmpty('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        updatePluginProduction(id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putPlugin.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putPluginPackiDiffs = async (request: Request, response: Response) => {
        console.log('putPluginPackiDiffs.request.params', request.params, __filename);
        console.log('putPluginPackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPluginProductionObjectById(id).then((prevPlugin: any) => {
            console.log('putPluginPackiDiffs.prevPackiFiles', Object.keys(prevPlugin.packiFiles), __filename);
            const pm = new PackiBuilder(prevPlugin.packiFiles);
            pm.applyPatch_ChangesOnly(request.body.packiDiffs)
            return exec_updatePluginProduction(request, response, pm.packiFiles);
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putPluginPackiDiffs.getPluginProductionObjectById.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
}
function exec_updatePluginProduction(request: any, response: any, packiFiles: any) {
    var __check = restParamsCheck(request);
    var id = __check.optional('params', 'id');
    var owner = __check.optional('body', 'owner');
    var name = __check.optional('body', 'name');
    var description = __check.optional('body', 'description');
    if (__check.hasErrors()) {
        return __check.sendErrors(response);
    }
    updatePluginProduction(id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => {
        invalidateCache(id)
        sendSuccess(response, result)
    }
    ).catch((err: any) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updatePluginProduction.updatePluginProduction.error', err);
        sendFailure(response, {
            err: err && err.message
         }, 501)
    }
    )
}