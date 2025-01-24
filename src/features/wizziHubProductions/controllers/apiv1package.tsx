/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\apiv1package.tsx.ittf
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
import {getPackageProductionList, validatePackageProduction, getPackageProduction, getPackageProductionObjectById, updatePackageProduction, createPackageProduction, invalidateCache} from '../api/package';
import {getWizziMetaFolderById} from '../api/package';

const myname = 'features/wizziHubProductions/controllers/apiv1packageproduction';

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

export class ApiV1PackageProductionController implements ControllerType {
    
    public path = '/api/v1/production/package';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ApiV1PackageProductionController.initialize');
        this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getCheckPackageName))
        this.router.get("/meta/:id", makeHandlerAwareOfAsyncErrors(this.getWizziMetaFolder))
        this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getPackages))
        this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackage))
        this.router.put("/:id", makeHandlerAwareOfAsyncErrors(this.putPackage))
        this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors(this.putPackagePackiDiffs))
        this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(this.postPackage))
    };
    
    private getPackages = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPackageProductionList({
            query: {
                owner: owner
             }
         }).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPackages.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getCheckPackageName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        validatePackageProduction(owner, name).then((result: any) => 
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
    
    private getPackage = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPackageProduction(owner, name).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getPackage.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private postPackage = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        var description = __check.notEmpty('body', 'description');
        var packiFiles = __check.notEmpty('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        createPackageProduction(owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'postPackage.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putPackage = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        var owner = __check.notEmpty('body', 'owner');
        var name = __check.notEmpty('body', 'name');
        var description = __check.notEmpty('body', 'description');
        var packiFiles = __check.notEmpty('body', 'packiFiles');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        updatePackageProduction(id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => 
            sendSuccess(response, result)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putPackage.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private putPackagePackiDiffs = async (request: Request, response: Response) => {
        console.log('putPackagePackiDiffs.request.params', request.params, __filename);
        console.log('putPackagePackiDiffs.request.body.packiDiffs', Object.keys(request.body.packiDiffs), __filename);
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPackageProductionObjectById(id).then((prevPackage: any) => {
            console.log('putPackagePackiDiffs.prevPackiFiles', Object.keys(prevPackage.packiFiles), __filename);
            const pm = new PackiBuilder(prevPackage.packiFiles);
            pm.applyPatch_ChangesOnly(request.body.packiDiffs)
            return exec_updatePackageProduction(request, response, pm.packiFiles);
        }
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'putPackagePackiDiffs.getPackageProductionObjectById.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
    
    private getWizziMetaFolder = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getWizziMetaFolderById(id, {}).then((packiFiles: packiTypes.PackiFiles) => 
            sendSuccess(response, packiFiles)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'getWizziMetaFolder.error', err);
            sendFailure(response, {
                err: err && err.message
             }, 501)
        }
        )
    }
    ;
}
function exec_updatePackageProduction(request: any, response: any, packiFiles: any) {
    var __check = restParamsCheck(request);
    var id = __check.optional('params', 'id');
    var owner = __check.optional('body', 'owner');
    var name = __check.optional('body', 'name');
    var description = __check.optional('body', 'description');
    if (__check.hasErrors()) {
        return __check.sendErrors(response);
    }
    updatePackageProduction(id, owner, name, description, JSON.stringify(packiFiles)).then((result: any) => {
        invalidateCache(id)
        sendSuccess(response, result)
    }
    ).catch((err: any) => {
        if (typeof err === 'object' && err !== null) {
        }
        console.log("[31m%s[0m", 'exec_updatePackageProduction.updatePackageProduction.error', err);
        sendFailure(response, {
            err: err && err.message
         }, 501)
    }
    )
}