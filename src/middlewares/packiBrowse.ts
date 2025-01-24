/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\packiBrowse.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import util from 'util';
import path from 'path';
import stringify from 'json-stringify-safe';
import parseUrl from 'parseurl';
import {Application, RequestHandler, Request, Response} from 'express';
import {artifactApi, pluginApi, packageApi} from '../features/wizziHubProductions';
import {MiddlewareType} from '../features/app/types';
import {config} from '../features/config';
import {sendFailure, sendHtml} from '../utils/sendResponse';

const myname = 'express.middleware.packiBrowse';
const packiSiteBrowsePackageItemPath = '/~p';
const packiSiteBrowsePluginItemPath = '/~l';
const packiSiteBrowsePath = '/~-';
const packiUserBrowsePath = '/~';

export const PackiBrowseMiddleware: MiddlewareType = (app: Application) => {
    app.use(packiSiteBrowsePackageItemPath, packiBrowseMiddleware('package', false));
    app.use(packiSiteBrowsePluginItemPath, packiBrowseMiddleware('plugin', false));
    app.use(packiSiteBrowsePath, packiBrowseMiddleware('artifact', true));
    app.use(packiUserBrowsePath, packiBrowseMiddleware('artifact', false));
    console.log('PackiBrowseMiddleware. Browse package', packiSiteBrowsePackageItemPath);
    console.log('PackiBrowseMiddleware. Browse plugin', packiSiteBrowsePluginItemPath);
    console.log('PackiBrowseMiddleware. Browse artifact site Level', packiSiteBrowsePath);
    console.log('PackiBrowseMiddleware. Browse artifact', packiUserBrowsePath);
}
;
function getPackiBrowseContext(request: Request) {
    return Object.assign({}, request.query, {
            isWizziStudio: false, 
            locals: {
                user: (request.session as any).user
             }
         });
}
function packiBrowseMiddleware(packiProduction: string, isSiteLevel: boolean):  RequestHandler {
    return async (request: Request, response: Response, next: Function) => {
            if (request.method !== 'GET' && request.method !== 'HEAD') {
                return next();
            }
            const parsedUrl = parseUrl(request);
            if (!parsedUrl || !parsedUrl.pathname) {
                return next();
            }
            const pathname = decodeURIComponent(parsedUrl.pathname);
            const parts = pathname.split('/');
            let owner, productionName;
            if (isSiteLevel) {
                owner = "stfnbssl";
                productionName = parts.slice(1).join('/');
            }
            else {
                owner = parts[1];
                productionName = parts.slice(2).join('/');
            }
            
            _executeBrowse(packiProduction, owner, productionName, request, response)
        }
    ;
}
function _executeBrowse(
    packiProduction: string, 
    owner: string, 
    productionName: string, 
    request: Request, 
    response: Response) {
    
    let productionApi;
    if (packiProduction == 'package') {
        productionApi = packageApi;
    }
    else if (packiProduction == 'plugin') {
        productionApi = pluginApi;
    }
    else {
        productionApi = artifactApi;
    }
    
    if (request.query.meta && (request.query.meta as string).toLowerCase() == 'mtree') {
        productionApi.getArtifactMTree_withPrepare(owner, productionName, request.query.filepath as string, request.query.context as string, getPackiBrowseContext(request)).then((result: any) => {
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }
        ).catch((err: any) => {
            console.log("[31m%s[0m", '' + myname + '_executeBrowse.artifactApi.getArtifactMTree.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    }
    else if (request.query.meta && (request.query.meta as string).toLowerCase() == 'script') {
        productionApi.getArtifactMTreeBuildUpScript_withPrepare(owner, productionName, request.query.filepath as string, request.query.context as string, getPackiBrowseContext(request)).then((result: any) => {
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }
        ).catch((err: any) => {
            console.log("[31m%s[0m", '' + myname + '_executeBrowse.artifactApi.getArtifactMTree.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    }
    else if (request.query.meta && (request.query.meta as string).toLowerCase() == 'raw') {
        productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath as string, request.query.context as string, getPackiBrowseContext(request)).then((result: any) => {
            response.status(200);
            response.set('Content-Type', 'text/plain');
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }
        ).catch((err: any) => {
            console.log("[31m%s[0m", '' + myname + '_executeBrowse.artifactApi.getArtifactGeneration.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    }
    else {
        productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath as string, request.query.context as string, getPackiBrowseContext(request)).then((result: any) => {
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }
        ).catch((err: any) => {
            console.log("[31m%s[0m", '' + myname + '_executeBrowse.artifactApi.getArtifactGeneration.error', err);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + err.message + '</code></pre></body></html>';
            }
            sendHtml(response, content)
        }
        )
    }
}