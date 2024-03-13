"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const plugin_1 = require("../api/plugin");
const utils_2 = require("../utils");
const myname = 'features/production/controllers/plugin';
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
                '            $$ aartifactName "..name.."'
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
class PluginProductionController {
    constructor() {
        this.path = '/plugin';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering PluginProductionController.initialize');
            this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewPluginForm));
            this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postPlugin));
            this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdatePluginForm));
            this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putPlugin));
            this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeletePluginForm));
            this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deletePlugin));
            this.router.get("/props", makeHandlerAwareOfAsyncErrors(this.getPluginProperties));
        };
        this.getNewPluginForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'CreatePluginProduction',
                formData: {
                    owner: request.session.user.username
                }
            }, {});
        });
        this.postPlugin = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getTemplatePackiFiles)(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
                wizziSchema: "js",
                mainIttf: "index.js.ittf"
            }).then((packiFiles) => (0, plugin_1.createPluginProduction)(request.session.user.username, request.body.pp_name, request.body.pp_description, JSON.stringify((0, utils_2.mergePackiFiles)(packiFiles, getPackiConfigFile()))).then((result) => {
                if (result.ok) {
                    response.redirect('/~~/l/' + request.session.user.username + '/' + request.body.pp_name);
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new plugin production',
                        error: result
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'creating a new plugin production',
                    error: err
                });
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'getting template packi files while creating a new plugin production',
                    error: err
                });
            });
        });
        this.getUpdatePluginForm = 
        // loog myname + '.getUpdatePluginForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, plugin_1.getPluginProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'UpdatePluginProduction',
                formData: {
                    _id: id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.putPlugin = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, plugin_1.updatePluginProduction)(obj.pl_id, obj.pl_owner, obj.pl_name, obj.pl_description).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/plugins');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'updating a plugin production',
                        error: result
                    });
                }
            });
        });
        this.getDeletePluginForm = 
        // loog myname + '.getDeletePluginForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, plugin_1.getPluginProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'DeletePluginProduction',
                formData: {
                    _id: result._id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.deletePlugin = 
        // loog myname + '.deletePlugin.request.path', request.path
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, plugin_1.deletePluginProduction)(obj.pl_id, obj.pl_owner, obj.pl_name).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/plugins');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'deleting a plugin production',
                        error: result
                    });
                }
            });
        });
        this.getPluginProperties = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
exports.PluginProductionController = PluginProductionController;
//# sourceMappingURL=plugin.js.map