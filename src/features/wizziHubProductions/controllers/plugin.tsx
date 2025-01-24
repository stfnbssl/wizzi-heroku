/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\plugin.tsx.ittf
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
import {createPluginProduction, updatePluginProduction, deletePluginProduction, getPluginProductionObject, getPluginProductionObjectById} from '../api/plugin';
import {mergePackiFiles} from '../utils';
import {packiTypes} from '#/src/features/packi';

const myname = 'features/wizziHubProductions/controllers/plugin';

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
                    '            $$ aartifactName "..name.."'
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

export class PluginProductionController implements ControllerType {
    
    public path = '/plugin';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering PluginProductionController.initialize');
        this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewPluginForm))
        this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postPlugin))
        this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdatePluginForm))
        this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putPlugin))
        this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeletePluginForm))
        this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deletePlugin))
        this.router.get("/props", makeHandlerAwareOfAsyncErrors(this.getPluginProperties))
    };
    
    private getNewPluginForm = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreatePluginProduction', 
            formData: {
                owner: (request.session as any).user.username
             }
         }, {})
    
    ;
    
    private postPlugin = async (request: Request, response: Response) => 
        getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context as string, request.body.context ? JSON.parse(request.body.context) : {}, {
            wizziSchema: "js", 
            mainIttf: "index.js.ittf"
         }).then((packiFiles: packiTypes.PackiFiles) => 
            createPluginProduction((request.session as any).user.username, request.body.pl_name, request.body.pl_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile()))).then((result: CRUDResult) => {
                if (result.ok) {
                    response.redirect('/~~/l/' + (request.session as any).user.username + '/' + request.body.pl_name)
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new plugin production', 
                        error: result
                     })
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'creating a new plugin production', 
                    error: err
                 })
            }
            )
        
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            response.render('error.html.ittf', {
                message: 'getting template packi files while creating a new plugin production', 
                error: err
             })
        }
        )
    
    ;
    
    private getUpdatePluginForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPluginProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'UpdatePluginProduction', 
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
    
    private putPlugin = async (request: Request, response: Response) => {
        const obj = request.body;
        updatePluginProduction(obj.pl_id, obj.pl_owner, obj.pl_name, obj.pl_description).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/plugins');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'updating a plugin production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getDeletePluginForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPluginProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'DeletePluginProduction', 
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
    
    private deletePlugin = async (request: Request, response: Response) => {
        const obj = request.body;
        deletePluginProduction(obj.pl_id, obj.pl_owner, obj.pl_name).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/plugins');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'deleting a plugin production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getPluginProperties = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'PropertyEditor', 
            formData: {
                owner: request.query.owner, 
                name: request.query.name, 
                schema: {
                    properties: [
                        {
                            name: 'name', 
                            type: 'string'
                         }, 
                        {
                            name: 'age', 
                            type: 'number'
                         }, 
                        {
                            name: 'jobs', 
                            type: 'array', 
                            properties: [
                                {
                                    name: 'title', 
                                    type: 'string'
                                 }, 
                                {
                                    name: 'year', 
                                    type: 'number'
                                 }
                            ]
                         }, 
                        {
                            name: 'react', 
                            type: 'object', 
                            properties: [
                                {
                                    name: 'useReact', 
                                    type: 'boolean', 
                                    isCondition: true
                                 }, 
                                {
                                    name: 'useRouter', 
                                    type: 'boolean'
                                 }, 
                                {
                                    name: 'useRedux', 
                                    type: 'boolean'
                                 }
                            ]
                         }
                    ]
                 }
             }
         }, {})
    
    ;
}