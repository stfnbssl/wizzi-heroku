"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiEditingController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const packiProductions_1 = require("../../packiProductions");
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
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering PackiEditingController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(this.getPackiItemList));
            this.router.get("/a/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiArtifactProductionByUsername_Name));
            this.router.get("/a/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiArtifactProductionByUsername_Name));
            this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiPackageProductionByUsername_Name));
            this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiPackageProductionByUsername_Name));
            this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiMetaProductionByUsername_Name));
            this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiMetaProductionByUsername_Name));
            this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiPluginProductionByUsername_Name));
            this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiPluginProductionByUsername_Name));
            this.router.get("/t/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackiTFolderByUsername_Name));
            this.router.get("/t/:owner/:name/*", makeHandlerAwareOfAsyncErrors(this.getPackiTFolderByUsername_Name));
        };
        this.getPackiItemList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.redirect('/packi/productions/artifacts');
        });
        this.getPackiArtifactProductionByUsername_Name = 
        // TODO
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            packiProductions_1.artifactApi.getArtifactProductionObject(parts[2], parts.slice(3).join('/')).then((result) => {
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiPackageProductionByUsername_Name = 
        // TODO
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            packiProductions_1.packageApi.getPackageProductionObject(parts[2], parts.slice(3).join('/')).then((result) => {
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiMetaProductionByUsername_Name = 
        // TODO
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            packiProductions_1.metaApi.getMetaProductionObject(parts[2], parts.slice(3).join('/')).then((result) => {
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiPluginProductionByUsername_Name = 
        // TODO
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            packiProductions_1.pluginApi.getPluginProductionObject(parts[2], parts.slice(3).join('/')).then((result) => {
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiTFolderByUsername_Name = 
        // TODO
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            packiProductions_1.tFolderApi.getTFolderObject(parts[2], parts.slice(3).join('/')).then((result) => {
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
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.PackiEditingController = PackiEditingController;
//# sourceMappingURL=packiEditing.js.map