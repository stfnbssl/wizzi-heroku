"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiBrowseMiddleware = void 0;
const tslib_1 = require("tslib");
const parseurl_1 = tslib_1.__importDefault(require("parseurl"));
const production_1 = require("../features/production");
const sendResponse_1 = require("../utils/sendResponse");
const myname = 'express.middleware.packiBrowse';
const packiSiteBrowsePackageItemPath = '/~p';
const packiSiteBrowsePluginItemPath = '/~l';
const packiSiteBrowsePath = '/~-';
const packiUserBrowsePath = '/~';
const PackiBrowseMiddleware = (app) => {
    app.use(packiSiteBrowsePackageItemPath, packiBrowseMiddleware('package', false));
    app.use(packiSiteBrowsePluginItemPath, packiBrowseMiddleware('plugin', false));
    app.use(packiSiteBrowsePath, packiBrowseMiddleware('artifact', true));
    app.use(packiUserBrowsePath, packiBrowseMiddleware('artifact', false));
};
exports.PackiBrowseMiddleware = PackiBrowseMiddleware;
function getPackiBrowseContext(request) {
    return {
        isWizziStudio: false,
        locals: {
            user: request.session.user
        }
    };
}
function packiBrowseMiddleware(packiProduction, isSiteLevel) {
    return (request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            return next();
        }
        const parsedUrl = (0, parseurl_1.default)(request);
        if (!parsedUrl || !parsedUrl.pathname) {
            return next();
        }
        console.log(myname + '.parsedUrl', parsedUrl, __filename);
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
        console.log(myname + '.owner', owner, 'productionName', productionName, 'context', request.query.context, __filename);
        _executeBrowse(packiProduction, owner, productionName, request, response);
    });
}
function _executeBrowse(packiProduction, owner, productionName, request, response) {
    let productionApi;
    if (packiProduction == 'package') {
        productionApi = production_1.packageApi;
    }
    else if (packiProduction == 'plugin') {
        productionApi = production_1.pluginApi;
    }
    else {
        productionApi = production_1.artifactApi;
    }
    if (request.query.meta && request.query.meta.toLowerCase() == 'mtree') {
        productionApi.getArtifactMTree_withPrepare(owner, productionName, request.query.context, getPackiBrowseContext(request)).then((result) => {
            console.log(myname + 'getArtifactMTree_withPrepare.result.length:', result.length, __filename);
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }).catch((err) => {
            console.log('' + myname + '_executeBrowse.artifactApi.getArtifactMTree.error', err, __filename);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
            }
            (0, sendResponse_1.sendHtml)(response, content);
        });
    }
    else if (request.query.meta && request.query.meta.toLowerCase() == 'script') {
        productionApi.getArtifactMTreeBuildupScript_withPrepare(owner, productionName, request.query.context, getPackiBrowseContext(request)).then((result) => {
            console.log(myname + 'getArtifactMTreeBuildupScript_withPrepare.result.length:', result.length, __filename);
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }).catch((err) => {
            console.log('' + myname + '_executeBrowse.artifactApi.getArtifactMTree.error', err, __filename);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
            }
            (0, sendResponse_1.sendHtml)(response, content);
        });
    }
    else if (request.query.meta && request.query.meta.toLowerCase() == 'raw') {
        productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then((result) => {
            console.log(myname + 'getArtifactGeneration_withPrepare.result.length:', result.length, __filename);
            response.status(200);
            response.set('Content-Type', 'text/plain');
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }).catch((err) => {
            console.log('' + myname + '_executeBrowse.artifactApi.getArtifactGeneration.error', err, __filename);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
            }
            (0, sendResponse_1.sendHtml)(response, content);
        });
    }
    else {
        productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then((result) => {
            console.log(myname + 'getArtifactGeneration_withPrepare.result.length:', result.length, __filename);
            response.status(200);
            response.set('Content-Type', result.contentType);
            response.set('Content-Length', result.contentLength.toString());
            response.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            response.set('Expires', '-1');
            response.set('Pragma', 'no-cache');
            response.send(result.content);
        }).catch((err) => {
            console.log('' + myname + '_executeBrowse.artifactApi.getArtifactGeneration.error', err, __filename);
            var content = err;
            if (typeof err === 'object' && err !== null) {
                content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
            }
            (0, sendResponse_1.sendHtml)(response, content);
        });
    }
}
//# sourceMappingURL=packiBrowse.js.map