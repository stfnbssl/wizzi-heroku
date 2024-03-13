"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const package_1 = require("../api/package");
const utils_2 = require("../utils");
const myname = 'features/production/controllers/package';
function renderPageForm(req, res, data, queryParams) {
    const index = '<!DOCTYPE html>' + (server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(PageFormDocument_1.default, { data: data, queryParams: queryParams })));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
function getPackiConfigFile() {
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
        ['.packi/properties/index.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    [ properties',
                '        {',
                '            name "name"',
                '            type "string"',
                '        string$( kind )'
            ].join('\n')
        },
        ['.packi/properties/t/string.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "string"',
                '    $hook'
            ].join('\n')
        },
        ['.packi/properties/t/boolean.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "boolean"',
                '    $hook'
            ].join('\n')
        },
        ['.packi/properties/t/number.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "number"',
                '    $hook'
            ].join('\n')
        },
        ['.packi/properties/t/object.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "object"',
                '    [ properties',
                '        $hook'
            ].join('\n')
        },
        ['.packi/properties/t/array.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "array"',
                '    [ properties',
                '        $hook'
            ].join('\n')
        }
    };
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
class PackageProductionController {
    constructor() {
        this.path = '/package';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering PackageProductionController.initialize');
            this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewPackageForm));
            this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postPackage));
            this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdatePackageForm));
            this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putPackage));
            this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeletePackageForm));
            this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deletePackage));
            this.router.get("/props/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getPackageProperties));
            this.router.get("/meta/:owner/:name", makeHandlerAwareOfAsyncErrors(this.getWizziMetaFolderByName));
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
        this.postPackage = 
        // loog myname + '.postNewPackage.request.body', JSON.stringify(request.body, null, 2)
        // loog myname + '.postNewPackage.request.session.user', JSON.stringify((request.session as any).user, null, 2)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getTemplatePackiFiles)(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
                wizziSchema: null,
                mainIttf: null
            }).then((packiFiles) => (0, package_1.createPackageProduction)(request.session.user.username, request.body.pp_name, request.body.pp_description, JSON.stringify((0, utils_2.mergePackiFiles)(packiFiles, getPackiConfigFile()))).then((result) => {
                if (result.ok) {
                    response.redirect('/~~/p/' + request.session.user.username + '/' + request.body.pp_name);
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new package production',
                        error: result
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'creating a new package production',
                    error: err
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'getting template packi files while creating a new package production',
                    error: err
                });
            });
        });
        this.getUpdatePackageForm = 
        // loog myname + '.getUpdatePackageForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
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
        this.getDeletePackageForm = 
        // loog myname + '.getDeletePackageForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
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
        this.deletePackage = 
        // loog myname + '.deletePackage.request.path', request.path
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, package_1.deletePackageProduction)(obj.pp_id, obj.pp_owner, obj.pp_name).then((result) => {
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
        this.getWizziMetaFolderByName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, package_1.getWizziMetaFolder)(request.params.owner, request.params.name, {}).then((packiFiles) => (0, sendResponse_1.sendSuccess)(response, packiFiles)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'getting wizzi meta folder',
                    error: err
                });
            });
        });
    }
}
exports.PackageProductionController = PackageProductionController;
//# sourceMappingURL=package.js.map