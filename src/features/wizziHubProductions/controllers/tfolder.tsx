/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\tfolder.tsx.ittf
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
import PageFormDocument from '#/src/pages/PageFormDocument';
import {CRUDResult} from '#/src/features/types';
import {getTemplatePackiFiles} from '../api/meta';
import {createTFolderProduction, updateTFolderProduction, deleteTFolderProduction, getTFolderProductionObject, getTFolderProductionObjectById} from '../api/tfolder';
import {mergePackiFiles} from '../utils';
import {packiTypes} from '#/src/features/packi';

const myname = 'features/wizziHubProductions/controllers/tfolder';

function renderPageForm(
    req: Request, 
    res: Response, 
    data: object, 
    queryParams: object) {
    const index = '<!DOCTYPE html>' + (ReactDOMServer.renderToStaticMarkup(
    <PageFormDocument data={data} queryParams={queryParams} />
    ));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function getPackiConfigFile():  packiTypes.PackiFiles {
    return {
            ['.packi/config.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    { meta', 
                    '        $$ name "..name.."', 
                    '        { metaCtx"', 
                    '            kind "artifact" $$ file|artifact', 
                    '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"', 
                    '            { artifact', 
                    '                $$ name "..name.." $$ when kind = "artifact"', 
                    '            [ contexts', 
                    '                {', 
                    '                    $$ propertyName "..name.."', 
                    '                    $$ artifactName "..name.."', 
                    '    [ tfolders', 
                    '        {', 
                    '            $$ name "..name.."', 
                    '    [ contexts', 
                    '        {', 
                    '            $$ propertyName "..name.."', 
                    '            $$ artifactName "..name.."'
                ].join('\n')
             }
         };
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

export class TFolderProductionController implements ControllerType {
    
    public path = '/tfolder';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering TFolderProductionController.initialize');
        this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewTFolderForm))
        this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postTFolder))
        this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateTFolderForm))
        this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putTFolder))
        this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteTFolderForm))
        this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteTFolder))
    };
    
    private getNewTFolderForm = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateTFolder', 
            formData: {
                owner: (request.session as any).user.username
             }
         }, {})
    
    ;
    
    private postTFolder = async (request: Request, response: Response) => 
        getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context as string, request.body.context ? JSON.parse(request.body.context) : {}, {
            wizziSchema: null, 
            mainIttf: null
         }).then((packiFiles: packiTypes.PackiFiles) => 
            createTFolderProduction((request.session as any).user.username, request.body.tf_name, request.body.tf_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile()))).then((result: CRUDResult) => {
                if (result.ok) {
                    response.redirect('/~~/t/' + (request.session as any).user.username + '/' + request.body.mp_name)
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new tfolder', 
                        error: result
                     })
                }
            }
            ).catch((err: any) => 
                response.render('error.html.ittf', {
                    message: 'creating a new tfolder', 
                    error: err
                 })
            )
        
        )
    
    ;
    
    private getUpdateTFolderForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getTFolderProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'UpdateTFolderProduction', 
                formData: {
                    _id: id, 
                    owner: result.owner, 
                    name: result.name, 
                    description: result.description
                 }
             }, {})
        )
    }
    ;
    
    private putTFolder = async (request: Request, response: Response) => {
        const obj = request.body;
        updateTFolderProduction(obj.tf_id, obj.tf_owner, obj.tf_name, obj.tf_description).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/tfolders');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'updating a tFolder production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getDeleteTFolderForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getTFolderProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'DeleteTFolderProduction', 
                formData: {
                    _id: result._id, 
                    owner: result.owner, 
                    name: result.name, 
                    description: result.description
                 }
             }, {})
        )
    }
    ;
    
    private deleteTFolder = async (request: Request, response: Response) => {
        const obj = request.body;
        deleteTFolderProduction(obj.tf_id, obj.tf_owner, obj.tf_name).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/tfolders');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'deleting a tFolder production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
}