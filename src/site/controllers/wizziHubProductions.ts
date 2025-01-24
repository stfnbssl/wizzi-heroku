/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\site\controllers\wizziHubProductions.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import {ControllerType, AppInitializerType} from '#/src/features/app/types';
import {sendHtml, sendSuccess, sendPromiseResult, sendFailure, sendError} from '#/src/utils/sendResponse';
import {restParamsCheck} from '#/src/utils/rest';
import {FcError, SYSTEM_ERROR} from '#/src/utils/error';
import {statusCode} from '#/src/utils';
import jsesc from 'jsesc';
import {artifactApi, packageApi, pluginApi, metaApi, tFolderApi, jobApi} from '../../features/wizziHubProductions';

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

export class WizziHubProductionsController implements ControllerType {
    
    public path = '/packi/productions';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering WizziHubProductionsController.initialize');
        this.router.get("/artifacts", makeHandlerAwareOfAsyncErrors(this.artifacts))
        this.router.get("/packages", makeHandlerAwareOfAsyncErrors(this.packages))
        this.router.get("/plugins", makeHandlerAwareOfAsyncErrors(this.plugins))
        this.router.get("/metas", makeHandlerAwareOfAsyncErrors(this.metas))
        this.router.get("/tfolders", makeHandlerAwareOfAsyncErrors(this.tfolders))
        this.router.get("/jobs", makeHandlerAwareOfAsyncErrors(this.jobs))
    };
    
    private artifacts = async (request: Request, response: Response) => 
        artifactApi.getArtifactProductionList().then(result => 
            response.render('wizziHub/productions/artifacts.html.ittf', {
                title: 'Artifact productions · Wizzi', 
                artifacts: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListArtifactProduction', 
                        formData: {
                            artifacts: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'artifact productions.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
    
    private packages = async (request: Request, response: Response) => 
        packageApi.getPackageProductionList().then(result => 
            response.render('wizziHub/productions/packages.html.ittf', {
                title: 'Package productions · Wizzi', 
                packages: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListPackageProduction', 
                        formData: {
                            packages: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'package productions.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
    
    private plugins = async (request: Request, response: Response) => 
        pluginApi.getPluginProductionList().then(result => 
            response.render('wizziHub/productions/plugins.html.ittf', {
                title: 'Plugin productions · Wizzi', 
                plugins: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListPluginProduction', 
                        formData: {
                            plugins: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'plugin productions.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
    
    private metas = async (request: Request, response: Response) => 
        metaApi.getMetaProductionList().then(result => 
            response.render('wizziHub/productions/metas.html.ittf', {
                title: 'Meta productions · Wizzi', 
                metas: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListMetaProduction', 
                        formData: {
                            metas: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'meta productions.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
    
    private tfolders = async (request: Request, response: Response) => 
        tFolderApi.getTFolderProductionList().then(result => 
            response.render('wizziHub/productions/tfolders.html.ittf', {
                title: 'tFolder · Wizzi', 
                tfolders: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListTFolder', 
                        formData: {
                            tfolders: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'tFolders.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
    
    private jobs = async (request: Request, response: Response) => 
        jobApi.getJobProductionList().then(result => 
            response.render('wizziHub/productions/jobs.html.ittf', {
                title: 'job · Wizzi', 
                jobs: result.item, 
                __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${jsesc({
                    data: {
                        type: 'success', 
                        formName: 'ListJob', 
                        formData: {
                            jobs: result.item
                         }
                     }, 
                    queryParams: {
                        
                     }
                 }, {
                    quotes: 'double', 
                    isScriptContext: true
                 })}`
             })
        ).catch((err: any) => {
            console.log("[31m%s[0m", 'jobs.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    
    ;
}