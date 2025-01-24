/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\controllers\job.tsx.ittf
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
import {createJobProduction, updateJobProduction, deleteJobProduction, getJobProductionObject, getJobProductionObjectById} from '../api/job';
import {mergePackiFiles} from '../utils';
import {packiTypes} from '#/src/features/packi';

const myname = 'features/wizziHubProductions/controllers/job';

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
             }, 
            ['.db/metaProductionSelections.json']: {
                type: 'CODE', 
                contents: [
                    '{', 
                    '    "metaCategories": [', 
                    '       {', 
                    '          "name": "..."', 
                    '       }', 
                    '    ],', 
                    '    "metaProductions": [', 
                    '       {', 
                    '          "name": "..."', 
                    '       }', 
                    '    ]', 
                    '}'
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

export class JobProductionController implements ControllerType {
    
    public path = '/job';
    
    public router = Router();
    
    
    initialize = (app: express.Application, initValues: AppInitializerType) => {
        console.log("[33m%s[0m", 'Entering JobProductionController.initialize');
        this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewJobForm))
        this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postJob))
        this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateJobForm))
        this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putJob))
        this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteJobForm))
        this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteJob))
    };
    
    private getNewJobForm = async (request: Request, response: Response) => 
        renderPageForm(request, response, {
            type: 'success', 
            formName: 'CreateJob', 
            formData: {
                owner: (request.session as any).user.username
             }
         }, {})
    
    ;
    
    private postJob = async (request: Request, response: Response) => 
        getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context as string, request.body.context ? JSON.parse(request.body.context) : {}, {
            wizziSchema: "js", 
            mainIttf: "index.js.ittf"
         }).then((packiFiles: packiTypes.PackiFiles) => 
            createJobProduction((request.session as any).user.username, request.body.job_name, request.body.job_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile()))).then((result: CRUDResult) => {
                if (result.ok) {
                    response.redirect('/~~/j/' + (request.session as any).user.username + '/' + request.body.job_name)
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new job production', 
                        error: result
                     })
                }
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'creating a new job production', 
                    error: err
                 })
            }
            )
        
        ).catch((err: any) => {
            if (typeof err === 'object' && err !== null) {
            }
            response.render('error.html.ittf', {
                message: 'getting template packi files while creating a new job production', 
                error: err
             })
        }
        )
    
    ;
    
    private getUpdateJobForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getJobProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'UpdateJobProduction', 
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
    
    private putJob = async (request: Request, response: Response) => {
        const obj = request.body;
        updateJobProduction(obj.job_id, obj.job_owner, obj.job_name, obj.job_description).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/job');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'updating a job production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
    
    private getDeleteJobForm = async (request: Request, response: Response) => {
        var __check = restParamsCheck(request);
        var id = __check.notEmpty('params', 'id');
        if (__check.hasErrors()) {
            return __check.sendErrors(response);
        }
        getJobProductionObjectById(id).then((result: any) => 
            renderPageForm(request, response, {
                type: 'success', 
                formName: 'DeleteJobProduction', 
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
    
    private deleteJob = async (request: Request, response: Response) => {
        const obj = request.body;
        deleteJobProduction(obj.job_id, obj.job_owner, obj.job_name).then((result: any) => {
            if (result.ok) {
                response.redirect('/productions/job');
            }
            else {
                response.render('error.html.ittf', {
                    message: 'deleting a job production', 
                    error: result
                 })
            }
        }
        )
    }
    ;
}