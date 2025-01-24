/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\package.tsx.ittf
    utc time: Fri, 24 Jan 2025 15:11:52 GMT
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
import {getTemplatePackiFiles} from '../api/meta';
import {createPackageProduction, updatePackageProduction, deletePackageProduction, getPackageProductionObject, getPackageProductionObjectById, getWizziMetaFolder} from '../api/package';
import {mergePackiFiles} from '../utils';
import {packiTypes} from '#/src/features/packi';

const myname = 'features/wizziHubProductions/controllers/package';

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

export class PackageProductionController implements ControllerType {
    
    public path = '/package';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering PackageProductionController.initialize');
        this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewPackageForm))
        this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postPackage))
        this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdatePackageForm))
        this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putPackage))
        this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeletePackageForm))
        this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deletePackage))
        this.router.get("/props/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackageProperties))
        this.router.get("/meta/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getWizziMetaFolderByName))
    };
    
    private getNewPackageForm = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreatePackageProduction', 
            formData: {
                owner: (request.session as any).user.username
             }
         }, {})
    
    ;
    
    private postPackage = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var meta_id = __check.notEmpty('body', 'meta_id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getTemplatePackiFiles(meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context as string, request.body.context ? JSON.parse(request.body.context) : {}, {
            wizziSchema: null, 
            mainIttf: null
         }).then((packiFiles: packiTypes.PackiFiles) => 
            createPackageProduction((request.session as any).user.username, request.body.pp_name, request.body.pp_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile()))).then((result: CRUDResult) => {
                if (result.ok) {
                    response.redirect('/~~/p/' + (request.session as any).user.username + '/' + request.body.pp_name)
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new package production', 
                        error: result
                     })
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'creating a new package production', 
                    error: err
                 })
            }
            )
        
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            response.render('error.html.ittf', {
                message: 'getting template packi files while creating a new package production', 
                error: err
             })
        }
        )
    }
    ;
    
    private getUpdatePackageForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPackageProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'UpdatePackageProduction', 
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
    
    private putPackage = async (request: Request, response: Response) => {
        const obj = request.body;
        updatePackageProduction(obj.pp_id, obj.pp_owner, obj.pp_name, obj.pp_description).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/packages');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'updating a package production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getDeletePackageForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getPackageProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'DeletePackageProduction', 
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
    
    private deletePackage = async (request: Request, response: Response) => {
        const obj = request.body;
        deletePackageProduction(obj.pp_id, obj.pp_owner, obj.pp_name).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/packages');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'deleting a package production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getPackageProperties = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('query', 'owner');
        var name = __check.notEmpty('query', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'PropertyEditor', 
            formData: {
                owner: owner, 
                name: name, 
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
    }
    ;
    
    private getWizziMetaFolderByName = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var owner = __check.notEmpty('params', 'owner');
        var name = __check.notEmpty('params', 'name');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getWizziMetaFolder(owner, name, {}).then((packiFiles: packiTypes.PackiFiles) => 
            sendSuccess(response, packiFiles)
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            response.render('error.html.ittf', {
                message: 'getting wizzi meta folder', 
                error: err
             })
        }
        )
    }
    ;
}