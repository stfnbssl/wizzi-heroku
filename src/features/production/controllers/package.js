"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\controllers\package.tsx.ittf
*/
const express_1 = require("express");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const package_1 = require("../api/package");
const myname = 'features/production/controllers/package';
function renderPageForm(req, res, data, queryParams) {
    const index = '<!DOCTYPE html>' + (server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(PageFormDocument_1.default, { data: data, queryParams: queryParams })));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function getPackiFiles(mainIttf) {
    return {
        [mainIttf]: {
            type: 'CODE',
            contents: ''
        }
    };
}
class PackageProductionController {
    constructor() {
        this.path = '/package';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering PackageProductionController.initialize');
            this.router.get('/new', this.getNewPackageForm);
            this.router.post('/new', this.postPackage);
            this.router.get('/update/:id', this.getUpdatePackageForm);
            this.router.post('/update', this.putPackage);
            this.router.get('/delete/:id', this.getDeletePackageForm);
            this.router.post('/delete', this.deletePackage);
            this.router.get('/props/:owner/:name', this.getPackageProperties);
        };
        this.getNewPackageForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'CreatePackageProduction',
                formData: {
                    owner: request.session.user.username
                }
            }, {});
        });
        this.postPackage = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.postNewPackage.request.body', JSON.stringify(request.body, null, 2), __filename);
            console.log(myname + '.postNewPackage.request.session.user', JSON.stringify(request.session.user, null, 2), __filename);
            (0, meta_1.getTemplatePackiFiles)(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}).then((packiFiles) => (0, package_1.createPackageProduction)(request.session.user.username, request.body.pp_name, request.body.pp_description, JSON.stringify(packiFiles)).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/packages');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new package production',
                        error: result
                    });
                }
            }).catch((err) => response.render('error.html.ittf', {
                message: 'creating a new package production',
                error: err
            }))).catch((err) => response.render('error.html.ittf', {
                message: 'getting template packi files while creating a new package production',
                error: err
            }));
        });
        this.getUpdatePackageForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getUpdatePackageForm.id', id, __filename);
            (0, package_1.getPackageProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'UpdatePackageProduction',
                formData: {
                    _id: id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.putPackage = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, package_1.updatePackageProduction)(obj.pp_id, obj.pp_owner, obj.pp_name, obj.pp_description).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/packages');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'updating a package production',
                        error: result
                    });
                }
            });
        });
        this.getDeletePackageForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getDeletePackageForm.id', id, __filename);
            (0, package_1.getPackageProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'DeletePackageProduction',
                formData: {
                    _id: result._id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.deletePackage = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.deletePackage.request.path', request.path, __filename);
            const obj = request.body;
            (0, package_1.deletePackageProduction)(obj.pp_id, obj.pp_owner, obj.pp_name, obj.pp_description).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/packages');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'deleting a package production',
                        error: result
                    });
                }
            });
        });
        this.getPackageProperties = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'PropertyEditor',
                formData: {
                    owner: request.query.owner,
                    name: request.query.name,
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
            }, {});
        });
    }
}
exports.PackageProductionController = PackageProductionController;
//# sourceMappingURL=package.js.map