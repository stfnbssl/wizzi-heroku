/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\ittfStatic.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import util from 'util';
import path from 'path';
import fs from 'fs';
import stringify from 'json-stringify-safe';
import parseUrl from 'parseurl';
import {Application, RequestHandler, Request, Response, NextFunction} from 'express';
import {sendFailure, sendHtml} from '../utils/sendResponse';
import {MiddlewareType} from '../features/app/types';
import {config} from '../features/config';
import {wizziProds} from '../features/wizziProductions';
import {WizziModel} from '@wizzi/factory';


export const IttfStaticMiddleware: MiddlewareType = (app: Application) => {
    console.log('IttfStaticMiddleware. Folder served from ', path.resolve(__dirname, '..', 'ittf'));
    app.use('/ittf', ittfMiddleware(path.resolve(__dirname, '..', 'ittf'), '/ittf'));
}
;


/**
    // 
    // request.query._context contains a semicolon separated list of context models export names.
    // For each <export-name> must exists a request.query._<export-name> parameter
    // with a type;path value pair.
    // The type is the model knwon type or a wizzi schema, the path is the
    // relative path of the ittf document of the model, relative to the
    // filepath of the requested resource.
    // 
    // Example (two context models, export names: cs and info)
    // request.query._context = 'cs;info'
    // request.query._cs = 'cheatsheet;html'
    // request.query._info = 'json;../cslayout.json.ittf'
    // 
    // If the path value is missing it defaults to ./index.<type>.ittf
    // 
    // 
*/
function ittfMiddleware(basePath: string, routePath: string):  RequestHandler {
    let store_siteCtx = null;
    
    function ittfContext(request: Request, data?: any) {
        const ctx = Object.assign({}, {
            baseUrl: "http://localhost:3003", 
            request: request, 
            locals: {
                user: (request as any).session.user
             }, 
            siteCtx: store_siteCtx, 
            isWizziStudio: true
         }, data || {});
        ctx.ittfCtx = ctx;
        return ctx;
    }
    
    return async (request: Request, response: Response, next: NextFunction) => {
            if (request.method !== 'GET' && request.method !== 'HEAD') {
                return next();
            }
            const parsedUrl = parseUrl(request);
            if (!parsedUrl || !parsedUrl.pathname) {
                return next();
            }
            const urlPathName = decodeURIComponent(parsedUrl.pathname);
            // ??? urlPathName.substr(routePath.length);
            const pathname = urlPathName;
            // ??? urlPathName.substr(routePath.length);
            const filePath = path.join(basePath, pathname);
            const extname = path.extname(filePath);
            var queryMeta = (request.query.meta as string);
            var queryTransform = (request.query.transform as string);
            if (fs.existsSync(filePath) === false) {
                return next();
            }
            if (fs.statSync(filePath).isDirectory()) {
                return sendFolderScan(filePath, basePath, queryMeta, request, response);
            }
            if (queryTransform && queryTransform.indexOf('/') > 0) {
                return sendTransform(filePath, queryTransform, response);
            }
            wizziProds.loadSiteJsonModel('sitectx.json.ittf').then(async (siteCtx) => {
                store_siteCtx = siteCtx;
                if (queryMeta && queryMeta === 'html') {
                    try {
                        const documentState = await wizziProds.scanIttfDocumentFs(filePath, path.dirname(basePath));
                        const generated = await wizziProds.generateArtifactFs(config.metaHtmlIttfPath, ittfContext(request, {
                                wizzischema: 'html', 
                                path: filePath, 
                                ds: documentState
                             }));
                        response.writeHead(200, {
                            'Content-Type': 'text/html', 
                            'Content-Length': generated.artifactContent.length
                         })
                        response.end(generated.artifactContent);
                    } 
                    catch (ex) {
                        sendError(response, ex, {
                            format: 'json'
                         })
                    } 
                }
                else {
                    return contextLoader(filePath, request, function(err: any, modelContext: WizziModel) {
                            if (err) {
                                return sendError(response, err, {
                                        format: 'json'
                                     });
                            }
                            wizziProds.generateArtifactFs(filePath, Object.assign({}, modelContext, ittfContext(request))).then((generated: any) => {
                                response.writeHead(200, {
                                    'Content-Type': generated.contentType, 
                                    'Content-Length': generated.artifactContent.length
                                 })
                                response.end(generated.artifactContent);
                            }
                            ).catch((err: any) => {
                                if (typeof err === 'object' && err !== null) {
                                }
                                console.log("[31m%s[0m", 'ittfStatic.wizziProds.generateArtifactFs.error', err);
                                sendFailure(response, {
                                    err: err
                                 }, 501)
                            }
                            )
                        });
                }
            }
            )
        }
    ;
}
/**
    // 
    // request.query._context contains a semicolon separated list of context models export names.
    // For each <export-name> must exists a request.query._<export-name> parameter
    // with a type;path value pair.
    // The type is the model knwon type or a wizzi schema, the path is the
    // relative path of the ittf document of the model, relative to the
    // filepath of the requested resource.
    // 
    // Example (two context models, export names: cs and info)
    // request.query._context = 'cs;info'
    // request.query._cs = 'cheatsheet;html'
    // request.query._info = 'json;../cslayout.json.ittf'
    // 
    // If the path value is missing it defaults to ./index.<type>.ittf
    // 
    // 
*/
type contextRequest = { 
    name?: string;
    type?: string;
    exportName: string;
    fullPath: any;
    relPath: any;
};
async function contextLoader(resourceFilePath: string, request: Request, callback: any) {
    const contextRequest: string = (request.query._context as string);
    if (contextRequest && contextRequest.length > 0) {
        const ss = contextRequest.split(';');
        const ctxRequests: contextRequest[] = [];
        ss.forEach((element) => {
            const ctxRequest: contextRequest = {
                exportName: element, 
                fullPath: undefined, 
                relPath: undefined
             };
            const type_path = (request.query['_' + element] as string);
            if (!type_path) {
                return (callback({
                        requestedResource: resourceFilePath, 
                        message: 'Missing query param for requested context model: ' + element
                     }));
            }
            const tp = type_path.split(';');
            ctxRequest.type = tp[0];
            if (tp.length < 2) {
                ctxRequest.relPath = './index.' + tp[0] + '.ittf';
            }
            else {
                ctxRequest.relPath = tp[1];
            }
            if (ctxRequest.type === 'cheatsheet') {
                ctxRequest.name = ctxRequest.relPath;
                ctxRequests.push(ctxRequest);
            }
            else {
                ctxRequest.fullPath = path.join(path.dirname(resourceFilePath), ctxRequest.relPath);
                ctxRequests.push(ctxRequest);
            }
        }
        )
        const resultContext: { 
            [k: string]: WizziModel;
        } = {};
        const repeatCount = ctxRequests.length;
        const repeat = (index: number) => {
            if (index == repeatCount) {
                return callback(null, resultContext);
            }
            const ctxRequest = ctxRequests[index];
            if (ctxRequest.type === 'cheatsheet') {
                return callback('Context loader for cheatsheet type not implemented.');
            }
            else {
                wizziProds.loadModelFs(ctxRequest.fullPath, {
                    isWizziStudio: true
                 }).then((model) => {
                    resultContext[ctxRequest.exportName] = model;
                    repeat(index + 1);
                }
                ).catch(err => 
                    callback(err)
                )
            }
        }
        ;
        repeat(0);
    }
    else {
        try {
            const twinJsonContext = await wizziProds.inferAndLoadContextFs(resourceFilePath, 'wzCtx');
            return (callback(null, twinJsonContext));
        } 
        catch (ex) {
            return callback(ex);
        } 
    }
}

async function sendFolderScan(
    folderPath: string, 
    root: string, 
    meta: string, 
    request: Request, 
    response: Response) {
    try {
        const folderState = await wizziProds.scanIttfFolder(folderPath, path.dirname(root));
        const siteCtx = await wizziProds.loadSiteJsonModel('sitectx.json.ittf');
        if (meta === 'json') {
            return sendJSONStringified(response, folderState);
        }
        else {
            const generated = await wizziProds.generateArtifactFs(config.metaFolderIttfPath, {
                    wizzischema: 'html', 
                    path: folderPath, 
                    fs: folderState, 
                    locals: {
                        user: (request as any).session.user
                     }, 
                    siteCtx, 
                    isWizziStudio: true
                 });
            response.writeHead(200, {
                'Content-Type': 'text/html', 
                'Content-Length': generated.artifactContent.length
             })
            response.end(generated.artifactContent);
        }
    } 
    catch (ex) {
        console.log("[31m%s[0m", 'sendFolderScan.exception', ex);
        sendError(response, ex, {
            format: 'json'
         })
    } 
}

function sendTransform(filePath: string, transformer: string, response: Response) {
    wizziProds.loadAndTransformModelFs(filePath, {
        isWizziStudio: true
     }, {
        transformer: transformer
     }).then(model => 
        response.send(stringify(model, null, 2))
    ).catch(err => 
        sendError(response, err, {
            format: 'json'
         })
    )
}

function sendJSONStringified(response: Response, wizziModelInstance: any) {
    response.send('<pre>' + stringify(cleanCircular(wizziModelInstance, []), null, 2) + '</pre>');
}

function cleanCircular(obj: any, stock: any[]) {
    if (!obj) {
        return ;
    }
    if (stock.indexOf(obj) >= 0) {
        return ;
    }
    else {
        stock.push(obj);
    }
    if (typeof obj === 'object') {
        if (obj.length) {
            (obj as []).forEach(element => 
                cleanCircular(element, stock)
            )
            return ;
        }
        if (obj.parent) {
            delete obj.parent
        }
        if (obj.wzParent) {
            delete obj.wzParent
        }
        if (obj.nodes) {
            delete obj.nodes
        }
        if (obj.evalContext) {
            delete obj.evalContext
        }
        if (obj.loadContext && obj.sourceKey) {
            delete obj.loadContext
        }
        for (var k in obj) {
            var item = obj[k];
            if (!item) {
                delete obj[k]
            }
            else {
                if (typeof item === 'object' && item.length && item.length == 0) {
                    delete obj[k]
                }
                else {
                    cleanCircular(item, stock);
                }
            }
        }
    }
    return obj;
}

function sendError(response: Response, err: any, options: any) {
    options = options || {};
    const code = options.code || 999;
    let errEmit: any = err;
    delete errEmit.__is_error
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, {
                depth: null
             })
            ;
        }
        errEmit = err.replace(RegExp('\n', 'g'), '<br>');
    }
    else {
        if (err.stack && err.stack.split) {
            const stackArray: string[] = [];
            (err.stack as string).split('\n').forEach(element => 
                stackArray.push('    ' + element)
            )
            errEmit.stack = stackArray;
        }
    }
    response.setHeader('Content-Type', 'application/json');
    response.send(stringify({
        code, 
        error: errEmit
     }, null, 4))
}