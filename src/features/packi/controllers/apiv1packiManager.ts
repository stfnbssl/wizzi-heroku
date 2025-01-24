/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\controllers\apiv1packiManager.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import {ControllerType, AppInitializerType} from '#/src/features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure, sendError} from '#/src/utils/sendResponse';
import {restParamsCheck} from '#/src/utils/rest';
import {FcError, SYSTEM_ERROR} from '#/src/utils/error';
import {statusCode} from '#/src/utils';
import {PackiFiles, PackiGenerationContext, PackiInstallContext} from '../types';
import {prettify, generate, installDemoPackage} from '../api/packiManager';

const myname = 'features/packi/controllers/apiv1packiManager';

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

export class ApiV1PackiManagerController implements ControllerType {
    
    public path = '/api/v1/packimanager';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering ApiV1PackiManagerController.initialize');
        this.router.post('/prettify', this.executePrettify);
        this.router.post('/generate', this.executeGenerate);
        this.router.post('/install', this.executeInstall);
    };
    
    private executePrettify = async (request: Request, response: Response) => {
        const requestData: { 
            packiFiles: PackiFiles;
        } = request.body;
        prettify(requestData.packiFiles).then((result: any) => 
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
    
    private executeGenerate = async (request: Request, response: Response) => {
        const requestData: { 
            packiFiles: PackiFiles;
            context: PackiGenerationContext;
        } = request.body;
        generate(requestData.packiFiles, null, requestData.context).then((result: any) => 
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
    
    private executeInstall = async (request: Request, response: Response) => {
        const requestData: { 
            packiFiles: PackiFiles;
            context: PackiInstallContext;
        } = request.body;
        installDemoPackage(requestData.packiFiles, requestData.context).then((result: any) => 
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
}
