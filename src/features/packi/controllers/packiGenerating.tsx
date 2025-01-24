/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\controllers\packiGenerating.tsx.ittf
    utc time: Fri, 24 Jan 2025 13:13:18 GMT
*/
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import {ControllerType, AppInitializerType} from '#/src/features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure, sendError} from '#/src/utils/sendResponse';
import {restParamsCheck} from '#/src/utils/rest';
import {FcError, SYSTEM_ERROR} from '#/src/utils/error';
import {statusCode} from '#/src/utils';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {wizziProductionsTypes, wizziProds, wizziFactory} from '#/src/features/wizziProductions';
import {packageApi, metaApi, pluginApi, productionApi} from '#/src/features/wizziHubProductions';
import EditorDocument from '#/src/pages/EditorDocument';
const myname = 'features/packi/controller/packiGenerating';

function renderPackiEditor(
    req: Request, 
    res: Response, 
    packiItemObject: object, 
    loggedUser: object, 
    queryParams: object) {
    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <EditorDocument data={packiItemObject} queryParams={queryParams} loggedUser={loggedUser} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}

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

export class PackiGeneratingController implements ControllerType {
    
    public path = '/~=';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering PackiGeneratingController.initialize');
        this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiPackageGeneration))
        this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiPackageGeneration))
        this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiMetaGeneration))
        this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiMetaGeneration))
        this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiPluginGeneration))
        this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiPluginGeneration))
    };
    
    private getPackiPackageGeneration = async (request: Request, response: Response) => {
        const queryParams = {};
        const parts = request.path.split('/');
        productionApi.prepareProduction('package', parts[2] as string, parts.slice(3).join('/'), '', {}).then((packageProductionSet: any) => 
            wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then((fsJson: any) => {
                wizziFactory.extractGeneratedFiles(fsJson).then((packiFiles) => {
                    const user = (request.session as any).user;
                    const loggedUser = {
                        id: user._id, 
                        username: user.username, 
                        displayName: user.name, 
                        picture: user.avatar_url
                     };
                    renderPackiEditor(request, response, {
                        type: 'success', 
                        packi: {
                            _id: packageProductionSet._id, 
                            owner: packageProductionSet.owner, 
                            name: packageProductionSet.name, 
                            description: packageProductionSet.description, 
                            packiFiles: packiFiles, 
                            packiProduction: 'package', 
                            readOnly: true, 
                            generation: true
                         }
                     }, loggedUser, queryParams)
                }
                )
                .catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    sendFailure(response, {
                        err: err
                     }, 501)
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
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
    
    private getPackiMetaGeneration = async (request: Request, response: Response) => {
        const queryParams = {};
        const parts = request.path.split('/');
    }
    ;
    
    private getPackiPluginGeneration = async (request: Request, response: Response) => {
        const queryParams = {};
        const parts = request.path.split('/');
        productionApi.prepareProduction('plugin', parts[2] as string, parts.slice(3).join('/'), '', {}).then((packageProductionSet: any) => 
            wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then((fsJson: any) => {
                wizziFactory.extractGeneratedFiles(fsJson).then((packiFiles) => {
                    const user = (request.session as any).user;
                    const loggedUser = {
                        id: user._id, 
                        username: user.username, 
                        displayName: user.name, 
                        picture: user.avatar_url
                     };
                    renderPackiEditor(request, response, {
                        type: 'success', 
                        packi: {
                            _id: packageProductionSet._id, 
                            owner: packageProductionSet.owner, 
                            name: packageProductionSet.name, 
                            description: packageProductionSet.description, 
                            packiFiles: packiFiles, 
                            packiProduction: 'plugin', 
                            readOnly: true, 
                            generation: true
                         }
                     }, loggedUser, queryParams)
                }
                )
                .catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    sendFailure(response, {
                        err: err
                     }, 501)
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                sendFailure(response, {
                    err: err
                 }, 501)
            }
            )
        
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
}