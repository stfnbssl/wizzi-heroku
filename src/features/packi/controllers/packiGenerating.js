"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiGeneratingController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\packi\controllers\packiGenerating.tsx.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
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
class PackiGeneratingController {
    constructor() {
        this.path = '/~=';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering PackiGeneratingController.initialize');
            this.router.get('/p/:owner/:name', this.getPackiPackageGeneration);
            this.router.get('/p/:owner/:name/*', this.getPackiPackageGeneration);
            this.router.get('/m/:owner/:name', this.getPackiMetaGeneration);
            this.router.get('/m/:owner/:name/*', this.getPackiMetaGeneration);
            this.router.get('/l/:owner/:name', this.getPackiPluginGeneration);
            this.router.get('/l/:owner/:name/*', this.getPackiPluginGeneration);
        };
        this.getPackiPackageGeneration = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.getPackiPackageGeneration', request.path, __filename);
            const queryParams = {};
            const parts = request.path.split('/');
            console.log(myname + '.getPackiPackageGeneration', parts[1], parts.slice(2).join('/'), __filename);
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
        this.getPackiMetaGeneration = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.getPackiMetaGeneration', request.path, __filename);
            const queryParams = {};
            const parts = request.path.split('/');
            console.log(myname + '.getPackiMetaGeneration', parts[1], parts.slice(2).join('/'), __filename);
        });
        this.getPackiPluginGeneration = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.getPackiPluginGeneration', request.path, __filename);
            const queryParams = {};
            const parts = request.path.split('/');
            console.log(myname + '.getPackiPluginGeneration', parts[1], parts.slice(2).join('/'), __filename);
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