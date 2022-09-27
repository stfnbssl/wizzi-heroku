"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiGeneratingController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\packi\controllers\packiGenerating.tsx.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const wizzi_1 = require("../../wizzi");
const production_1 = require("../../production");
const EditorDocument_1 = tslib_1.__importDefault(require("../../../pages/EditorDocument"));
const myname = 'features/packi/controller/packiGenerating';
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
class PackiGeneratingController {
    constructor() {
        this.path = '/~=';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering PackiGeneratingController.initialize');
            this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPackageGeneration));
            this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPackageGeneration));
            this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiMetaGeneration));
            this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiMetaGeneration));
            this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPluginGeneration));
            this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.getPackiPluginGeneration));
        };
        this.getPackiPackageGeneration = 
        // loog myname + '.getPackiPackageGeneration', request.path
        // loog myname + '.getPackiPackageGeneration', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.productionApi.prepareProduction('package', parts[2], parts.slice(3).join('/'), '', {}).then((packageProductionSet) => wizzi_1.wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then((fsJson) => {
                wizzi_1.WizziFactory.extractGeneratedFiles(fsJson).then((packiFiles) => {
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
                            _id: packageProductionSet._id,
                            owner: packageProductionSet.owner,
                            name: packageProductionSet.name,
                            description: packageProductionSet.description,
                            packiFiles: packiFiles,
                            packiProduction: 'package',
                            readOnly: true,
                            generation: true
                        }
                    }, loggedUser, queryParams);
                })
                    .catch((err) => {
                    console.log('getPackiPackageGeneration.extractGeneratedFiles.error', err, __filename);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }).catch((err) => {
                console.log('getPackiPackageGeneration.executeJobs.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('getPackiPackageGeneration.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPackiMetaGeneration = 
        // loog myname + '.getPackiMetaGeneration', request.path
        // loog myname + '.getPackiMetaGeneration', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
        });
        this.getPackiPluginGeneration = 
        // loog myname + '.getPackiPluginGeneration', request.path
        // loog myname + '.getPackiPluginGeneration', parts[1], parts.slice(2).join('/')
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            const parts = request.path.split('/');
            production_1.productionApi.prepareProduction('plugin', parts[2], parts.slice(3).join('/'), '', {}).then((packageProductionSet) => wizzi_1.wizziProds.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then((fsJson) => {
                wizzi_1.WizziFactory.extractGeneratedFiles(fsJson).then((packiFiles) => {
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
                            _id: packageProductionSet._id,
                            owner: packageProductionSet.owner,
                            name: packageProductionSet.name,
                            description: packageProductionSet.description,
                            packiFiles: packiFiles,
                            packiProduction: 'plugin',
                            readOnly: true,
                            generation: true
                        }
                    }, loggedUser, queryParams);
                })
                    .catch((err) => {
                    console.log('getPackiPluginGeneration.extractGeneratedFiles.error', err, __filename);
                    (0, sendResponse_1.sendFailure)(response, {
                        err: err
                    }, 501);
                });
            }).catch((err) => {
                console.log('getPackiPluginGeneration.executeJobs.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            })).catch((err) => {
                console.log('getPackiPluginGeneration.prepareProduction.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.PackiGeneratingController = PackiGeneratingController;
//# sourceMappingURL=packiGenerating.js.map