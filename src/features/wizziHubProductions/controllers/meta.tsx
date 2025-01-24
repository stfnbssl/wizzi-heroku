/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\meta.tsx.ittf
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
import {CRUDResult} from '../../types';
import {createMetaProduction, updateMetaProduction, deleteMetaProduction, getMetaProductionObject, getMetaProductionObjectById, generateMetaProduction} from '../api/meta';
import {mergePackiFiles} from '../utils';
import {packiTypes} from '#/src/features/packi';

const myname = 'features/wizziHubProductions/controllers/meta';

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
                    '    [ tfolders', 
                    '        {', 
                    '            $$ name "..."', 
                    '    [ contexts', 
                    '        {', 
                    '            $$ propertyName "..."', 
                    '            $$ artifactName "..."'
                ].join('\n')
             }, 
            ['.packi/parameters/index.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    [ parameters', 
                    '        {', 
                    '            name "name"', 
                    '            type "string"', 
                    '        string$( kind )'
                ].join('\n')
             }, 
            ['.packi/parameters/t/string.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    $params name', 
                    '    name "${name}"', 
                    '    type "string"', 
                    '    $hook'
                ].join('\n')
             }, 
            ['.packi/parameters/t/boolean.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    $params name', 
                    '    name "${name}"', 
                    '    type "boolean"', 
                    '    $hook'
                ].join('\n')
             }, 
            ['.packi/parameters/t/integer.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    $params name', 
                    '    name "${name}"', 
                    '    type "integer"', 
                    '    $hook'
                ].join('\n')
             }, 
            ['.packi/parameters/t/object.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    $params name', 
                    '    name "${name}"', 
                    '    type "object"', 
                    '    [ parameters', 
                    '        $hook'
                ].join('\n')
             }, 
            ['.packi/parameters/t/array.json.ittf']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    $params name', 
                    '    name "${name}"', 
                    '    type "array"', 
                    '    { item', 
                    '        [ parameters', 
                    '            $hook'
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

export class MetaProductionController implements ControllerType {
    
    public path = '/meta';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering MetaProductionController.initialize');
        this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewMetaForm))
        this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postMeta))
        this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateMetaForm))
        this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putMeta))
        this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteMetaForm))
        this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteMeta))
        this.router.post("/generate", makeHandlerAwareOfAsyncErrors(this.generateMeta))
    };
    
    private getNewMetaForm = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateMetaProduction', 
            formData: {
                owner: (request.session as any).user.username
             }
         }, {})
    
    ;
    
    private postMeta = async (request: Request, response: Response) => 
        createMetaProduction((request.session as any).user.username, request.body.mp_name, request.body.mp_description, JSON.stringify(getPackiConfigFile())).then((result: CRUDResult) => {
            if (result.ok) {
                response.redirect('/~~/m/' + (request.session as any).user.username + '/' + request.body.mp_name)
            }
            else {
                response.render('error.html.ittf', {
                    message: 'creating a new meta production', 
                    error: result
                 })
            }
        }
        ).catch((err: any) => 
            response.render('error.html.ittf', {
                message: 'creating a new meta production', 
                error: err
             })
        )
    
    ;
    
    private getUpdateMetaForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getMetaProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'UpdateMetaProduction', 
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
    
    private putMeta = async (request: Request, response: Response) => {
        const obj = request.body;
        updateMetaProduction(obj.mp_id, obj.mp_owner, obj.mp_name, obj.mp_description).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/metas');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'updating a meta production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getDeleteMetaForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getMetaProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'DeleteMetaProduction', 
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
    
    private deleteMeta = async (request: Request, response: Response) => {
        const obj = request.body;
        deleteMetaProduction(obj.mp_id, obj.mp_owner, obj.mp_name).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/metas');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'deleting a meta production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private generateMeta = async (request: Request, response: Response) => {
        generateMetaProduction(request.body.owner, request.body.name, request.body.metaCtx).then((wizziPackiFiles: packiTypes.PackiFiles) => 
            sendSuccess(response, wizziPackiFiles)
        )
        .catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            response.render('error.html.ittf', {
                message: 'MetaProductionController.generateMeta', 
                error: err
             })
        }
        )
    }
    ;
}