"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiEditingController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\packi\controllers\packiEditing.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const production_1 = require("../../production");
const EditorDocument_1 = tslib_1.__importDefault(require("../../../pages/EditorDocument"));
const myname = 'features/packi/controller/packiEditing';
function renderPackiEditor(req, res, packiItemObject, loggedUser, queryParams) {
    const index = '<!DOCTYPE html>' + (server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(EditorDocument_1.default, { data: packiItemObject, queryParams: queryParams, loggedUser: loggedUser })));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function makeHandlerAwareOfAsyncErrors(handler) {
    return function (request, response, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(request, response, next);
            }
            catch (error) {
                if (error instanceof error_1.FcError) {
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: error.code,
                        message: error.message,
                        data: error.data || {}
                    });
                }
                else {
                    const fcError = new error_1.FcError(error_1.SYSTEM_ERROR);
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: fcError.code,
                        message: error.message,
                        data: fcError.data || {}
                    });
                }
            }
        });
    };
}
class PackiEditingController {
    constructor() {
        this.path = '/~~';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering PackiEditingController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiItemList));
            this.router.get("/a/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiArtifactProductionByUsername_Name));
            this.router.get("/a/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiArtifactProductionByUsername_Name));
            this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPackageProductionByUsername_Name));
            this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPackageProductionByUsername_Name));
            this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiMetaProductionByUsername_Name));
            this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiMetaProductionByUsername_Name));
            this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPluginProductionByUsername_Name));
            this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPluginProductionByUsername_Name));
            this.router.get("/t/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiTFolderByUsername_Name));
            this.router.get("/t/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiTFolderByUsername_Name));
        };
        this.getPackiItemList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.redirect('/productions/artifacts');
        });
        this.getPackiArtifactProductionByUsername_Name = 
        // TODO
        // loog myname + '.getPackiArtifactProductionByUsername_Name', request.path
        // loog myname + '.getPackiArtifactProductionByUsername_Name', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.artifactApi.getArtifactProductionObject(parts[2], parts.slice(3).join('/')).then(
            // loog myname + '.getPackiArtifactProductionByUsername_Name.result', result
            (result) => {
                const user = request.session.user;
                const loggedUser = {
                    id: user._id,
                    username: user.username,
                    displayName: user.name,
                    picture: user.avatar_url
                };
                renderPackiEditor(request, response, {
                    type: 'success',
                    packi: {
                        _id: result._id,
                        owner: result.owner,
                        name: result.name,
                        description: result.description,
                        mainIttf: result.mainIttf,
                        wizziSchema: result.wizziSchema,
                        packiFiles: result.packiFiles,
                        packiProduction: 'artifact'
                    }
                }, loggedUser, queryParams);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackiArtifactProductionByUsername_Name.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiPackageProductionByUsername_Name = 
        // TODO
        // loog myname + '.getPackiPackageProductionByUsername_Name', request.path
        // loog myname + '.getPackiPackageProductionByUsername_Name', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.packageApi.getPackageProductionObject(parts[2], parts.slice(3).join('/')).then(
            // loog myname + '.getPackiPackageProductionByUsername_Name.result', Object.keys(result)
            (result) => {
                const user = request.session.user;
                const loggedUser = {
                    id: user._id,
                    username: user.username,
                    displayName: user.name,
                    picture: user.avatar_url
                };
                renderPackiEditor(request, response, {
                    type: 'success',
                    packi: {
                        _id: result._id,
                        owner: result.owner,
                        name: result.name,
                        description: result.description,
                        packiFiles: result.packiFiles,
                        packiProduction: 'package'
                    }
                }, loggedUser, queryParams);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackiPackageProductionByUsername_Name.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiMetaProductionByUsername_Name = 
        // TODO
        // loog myname + '.getPackiMetaProductionByUsername_Name', request.path
        // loog myname + '.getPackiMetaProductionByUsername_Name', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.metaApi.getMetaProductionObject(parts[2], parts.slice(3).join('/')).then(
            // loog myname + '.getPackiMetaProductionByUsername_Name.result', result
            (result) => {
                const user = request.session.user;
                const loggedUser = {
                    id: user._id,
                    username: user.username,
                    displayName: user.name,
                    picture: user.avatar_url
                };
                renderPackiEditor(request, response, {
                    type: 'success',
                    packi: {
                        _id: result._id,
                        owner: result.owner,
                        name: result.name,
                        description: result.description,
                        packiFiles: result.packiFiles,
                        packiProduction: 'meta'
                    }
                }, loggedUser, queryParams);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackiMetaProductionByUsername_Name.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiPluginProductionByUsername_Name = 
        // TODO
        // loog myname + '.getPackiPluginProductionByUsername_Name', request.path
        // loog myname + '.getPackiPluginProductionByUsername_Name', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.pluginApi.getPluginProductionObject(parts[2], parts.slice(3).join('/')).then(
            // loog myname + '.getPackiPluginProductionByUsername_Name.result', result
            (result) => {
                const user = request.session.user;
                const loggedUser = {
                    id: user._id,
                    username: user.username,
                    displayName: user.name,
                    picture: user.avatar_url
                };
                renderPackiEditor(request, response, {
                    type: 'success',
                    packi: {
                        _id: result._id,
                        owner: result.owner,
                        name: result.name,
                        description: result.description,
                        packiFiles: result.packiFiles,
                        packiProduction: 'plugin'
                    }
                }, loggedUser, queryParams);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackiPluginProductionByUsername_Name.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiTFolderByUsername_Name = 
        // TODO
        // loog myname + '.getPackiTFolderByUsername_Name', request.path
        // loog myname + '.getPackiTFolderByUsername_Name', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.tFolderApi.getTFolderObject(parts[2], parts.slice(3).join('/')).then(
            // loog myname + '.getPackiTFolderByUsername_Name.result', result
            (result) => {
                const user = request.session.user;
                const loggedUser = {
                    id: user._id,
                    username: user.username,
                    displayName: user.name,
                    picture: user.avatar_url
                };
                renderPackiEditor(request, response, {
                    type: 'success',
                    packi: {
                        _id: result._id,
                        owner: result.owner,
                        name: result.name,
                        description: result.description,
                        packiFiles: result.packiFiles,
                        packiProduction: 'tfolder'
                    }
                }, loggedUser, queryParams);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getPackiTFolderByUsername_Name.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.PackiEditingController = PackiEditingController;
//# sourceMappingURL=packiEditing.js.map