"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IttfStaticMiddleware = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\middlewares\ittfStatic.ts.ittf
*/
const util_1 = tslib_1.__importDefault(require("util"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const json_stringify_safe_1 = tslib_1.__importDefault(require("json-stringify-safe"));
const parseurl_1 = tslib_1.__importDefault(require("parseurl"));
const config_1 = require("../features/config");
const wizzi_1 = require("../features/wizzi");
const IttfStaticMiddleware = (app) => {
    console.log('IttfStaticMiddleware. Folder served from ', path_1.default.resolve(__dirname, '..', '..', 'ittf'), __filename);
    app.use('/ittf', ittfMiddleware(path_1.default.resolve(__dirname, '..', '..', 'ittf'), '/ittf'));
};
exports.IttfStaticMiddleware = IttfStaticMiddleware;
const extContentTypeMap = {
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.ittf': 'text/plain',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.scss': 'text/scss',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/x-font-ttf',
    '.txt': 'text/plain',
    '.vtt': 'text/vtt',
    '.woff': 'application/x-font-woff',
    '.yaml': 'text/yanl',
    '.yml': 'text/yanl',
    '.xml': 'text/xml'
};
function ittfSchemaOf(file) {
    const nameParts = path_1.default.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return nameParts[nameParts.length - 2];
    }
    return undefined;
}
function contentTypeFor(file) {
    const ittfSchema = ittfSchemaOf(file);
    if (ittfSchema) {
        return extContentTypeMap['.' + ittfSchema];
    }
    return undefined;
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
function ittfMiddleware(basePath, routePath) {
    return (request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            return next();
        }
        const parsedUrl = (0, parseurl_1.default)(request);
        if (!parsedUrl || !parsedUrl.pathname) {
            return next();
        }
        const urlPathName = decodeURIComponent(parsedUrl.pathname);
        // ??? urlPathName.substr(routePath.length);
        const pathname = urlPathName;
        // ??? urlPathName.substr(routePath.length);
        const filePath = path_1.default.join(basePath, pathname);
        const extname = path_1.default.extname(filePath);
        var queryMeta = request.query.meta;
        var queryTransform = request.query.transform;
        if (fs_1.default.existsSync(filePath) === false) {
            return next();
        }
        if (fs_1.default.statSync(filePath).isDirectory()) {
            return sendFolderScan(filePath, basePath, queryMeta, request, response);
        }
        if (queryTransform && queryTransform.indexOf('/') > 0) {
            return sendTransform(filePath, queryTransform, response);
        }
        let ittfSchema = ittfSchemaOf(filePath);
        let contentType = contentTypeFor(filePath);
        if (!contentType) {
            next();
        }
        loadJsonIttfModel('sitectx.json.ittf').then((siteCtx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (queryMeta && queryMeta === 'html') {
                try {
                    const documentState = yield wizzi_1.wizziProds.scanIttfDocumentFs(filePath, path_1.default.dirname(basePath));
                    const generated = yield wizzi_1.wizziProds.generateArtifactFs(config_1.config.metaHtmlIttfPath, {
                        wizzischema: 'html',
                        path: filePath,
                        request,
                        ds: documentState,
                        locals: {
                            user: request.session.user
                        },
                        siteCtx
                    });
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Content-Length': generated.artifactContent.length
                    });
                    response.end(generated.artifactContent);
                }
                catch (ex) {
                    sendError(response, ex, {
                        format: 'json'
                    });
                }
            }
            else if (queryMeta && queryMeta === 'json' && ittfSchema == 'ittf') {
                wizzi_1.wizziProds.generateArtifactFs(filePath, {
                    locals: {
                        user: request.session.user
                    },
                    siteCtx
                }, {
                    generator: 'ittf/tojson'
                }).then((generated) => {
                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Content-Length': generated.artifactContent.length
                    });
                    response.end(generated.artifactContent);
                }).catch((err) => {
                    return sendError(response, err, {
                        format: 'json'
                    });
                });
            }
            else {
                return contextLoader(filePath, request, function (err, modelContext) {
                    if (err) {
                        return sendError(response, err, {
                            format: 'json'
                        });
                    }
                    modelContext = Object.assign({}, modelContext, {
                        locals: {
                            user: request.session.user
                        },
                        siteCtx
                    });
                    wizzi_1.wizziProds.generateArtifactFs(filePath, modelContext).then((generated) => {
                        response.writeHead(200, {
                            'Content-Type': contentType,
                            'Content-Length': generated.artifactContent.length
                        });
                        response.end(generated.artifactContent);
                    }).catch((err) => {
                        return sendError(response, err, {
                            format: 'json'
                        });
                    });
                });
            }
        }));
    });
}
function contextLoader(resourceFilePath, request, callback) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contextRequest = request.query._context;
        if (contextRequest && contextRequest.length > 0) {
            const ss = contextRequest.split(';');
            const ctxRequests = [];
            ss.forEach((element) => {
                const ctxRequest = {
                    exportName: element,
                    fullPath: undefined,
                    relPath: undefined
                };
                const type_path = request.query['_' + element];
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
                    ctxRequest.fullPath = path_1.default.join(path_1.default.dirname(resourceFilePath), ctxRequest.relPath);
                    ctxRequests.push(ctxRequest);
                }
            });
            const resultContext = {};
            const repeatCount = ctxRequests.length;
            const repeat = (index) => {
                if (index == repeatCount) {
                    return callback(null, resultContext);
                }
                const ctxRequest = ctxRequests[index];
                if (ctxRequest.type === 'cheatsheet') {
                    return callback('Context loader for cheatsheet type not implemented.');
                }
                else {
                    wizzi_1.wizziProds.loadModelFs(ctxRequest.fullPath, {}).then((model) => {
                        resultContext[ctxRequest.exportName] = model;
                        repeat(index + 1);
                    }).catch(err => callback(err));
                }
            };
            repeat(0);
        }
        else {
            try {
                const twinJsonContext = yield wizzi_1.wizziProds.inferAndLoadContextFs(resourceFilePath, 'wzCtx');
                return (callback(null, twinJsonContext));
            }
            catch (ex) {
                return callback(ex);
            }
        }
    });
}
function sendFolderScan(folderPath, root, meta, request, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const folderState = yield wizzi_1.wizziProds.scanIttfFolder(folderPath, path_1.default.dirname(root));
            const siteCtx = yield loadJsonIttfModel('sitectx.json.ittf');
            if (meta === 'json') {
                return sendJSONStringified(response, folderState);
            }
            else {
                const generated = yield wizzi_1.wizziProds.generateArtifactFs(config_1.config.metaFolderIttfPath, {
                    wizzischema: 'html',
                    path: folderPath,
                    fs: folderState,
                    locals: {
                        user: request.session.user
                    },
                    siteCtx
                });
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': generated.artifactContent.length
                });
                response.end(generated.artifactContent);
            }
        }
        catch (ex) {
            console.log('sendFolderScan.exception', ex, __filename);
            sendError(response, ex, {
                format: 'json'
            });
        }
    });
}
function sendTransform(filePath, transformer, response) {
    wizzi_1.wizziProds.transformModelFs(filePath, {}, {
        transformer: transformer
    }).then(model => response.send((0, json_stringify_safe_1.default)(model, null, 2))).catch(err => sendError(response, err, {
        format: 'json'
    }));
}
function sendJSONStringified(response, wizziModelInstance) {
    response.send('<pre>' + (0, json_stringify_safe_1.default)(cleanCircular(wizziModelInstance, []), null, 2) + '</pre>');
}
function cleanCircular(obj, stock) {
    if (!obj) {
        return;
    }
    if (stock.indexOf(obj) >= 0) {
        return;
    }
    else {
        stock.push(obj);
    }
    if (typeof obj === 'object') {
        if (obj.length) {
            obj.forEach(element => cleanCircular(element, stock));
            return;
        }
        if (obj.parent) {
            delete obj.parent;
        }
        if (obj.wzParent) {
            delete obj.wzParent;
        }
        if (obj.nodes) {
            delete obj.nodes;
        }
        if (obj.evalContext) {
            delete obj.evalContext;
        }
        if (obj.loadContext && obj.sourceKey) {
            delete obj.loadContext;
        }
        for (var k in obj) {
            var item = obj[k];
            if (!item) {
                delete obj[k];
            }
            else {
                if (typeof item === 'object' && item.length && item.length == 0) {
                    delete obj[k];
                }
                else {
                    cleanCircular(item, stock);
                }
            }
        }
    }
    return obj;
}
function sendError(response, err, options) {
    options = options || {};
    const code = options.code || 999;
    let errEmit = err;
    delete errEmit.__is_error;
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util_1.default.inspect(err, {
                depth: null
            });
        }
        errEmit = err.replace(RegExp('\n', 'g'), '<br>');
    }
    else {
        if (err.stack && err.stack.split) {
            const stackArray = [];
            err.stack.split('\n').forEach(element => stackArray.push('    ' + element));
            errEmit.stack = stackArray;
        }
    }
    response.setHeader('Content-Type', 'application/json');
    response.send((0, json_stringify_safe_1.default)({
        code,
        error: errEmit
    }, null, 4));
}
function loadJsonIttfModel(relPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => wizzi_1.wizziProds.loadModelFs(path_1.default.join(config_1.config.ittfPath, 'models', relPath), {}).then(
        // log 'loadJsonIttfModel', model
        model => resolve(model)).catch(err => reject(err)));
    });
}
//# sourceMappingURL=ittfStatic.js.map