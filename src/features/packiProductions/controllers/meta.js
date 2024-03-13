"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const myname = 'features/production/controllers/meta';
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
                '    [ tfolders',
                '        {',
                '            $$ name "..."',
                '    [ contexts',
                '        {',
                '            $$ propertyName "..."',
                '            $$ artifactName "..."'
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
class MetaProductionController {
    constructor() {
        this.path = '/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering MetaProductionController.initialize');
            this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewMetaForm));
            this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postMeta));
            this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateMetaForm));
            this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putMeta));
            this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteMetaForm));
            this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteMeta));
            this.router.post("/generate", makeHandlerAwareOfAsyncErrors(this.generateMeta));
        };
        this.getNewMetaForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'CreateMetaProduction',
                formData: {
                    owner: request.session.user.username
                }
            }, {});
        });
        this.postMeta = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.createMetaProduction)(request.session.user.username, request.body.mp_name, request.body.mp_description, JSON.stringify(getPackiConfigFile())).then((result) => {
                if (result.ok) {
                    response.redirect('/~~/m/' + request.session.user.username + '/' + request.body.mp_name);
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new meta production',
                        error: result
                    });
                }
            }).catch((err) => response.render('error.html.ittf', {
                message: 'creating a new meta production',
                error: err
            }));
        });
        this.getUpdateMetaForm = 
        // loog myname + '.getUpdateMetaForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, meta_1.getMetaProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'UpdateMetaProduction',
                formData: {
                    _id: id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.putMeta = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, meta_1.updateMetaProduction)(obj.mp_id, obj.mp_owner, obj.mp_name, obj.mp_description).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/metas');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'updating a meta production',
                        error: result
                    });
                }
            });
        });
        this.getDeleteMetaForm = 
        // loog myname + '.getDeleteMetaForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, meta_1.getMetaProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'DeleteMetaProduction',
                formData: {
                    _id: result._id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.deleteMeta = 
        // loog myname + '.deleteMeta.request.path', request.path
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, meta_1.deleteMetaProduction)(obj.mp_id, obj.mp_owner, obj.mp_name).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/metas');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'deleting a meta production',
                        error: result
                    });
                }
            });
        });
        this.generateMeta = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, meta_1.generateMetaProduction)(request.body.owner, request.body.name, request.body.metaCtx).then(
            // loog myname, 'getWizziMetaFolderByPackageProductionObject.generateMetaProduction', Object.keys(wizziPackiFiles)
            (wizziPackiFiles) => (0, sendResponse_1.sendSuccess)(response, wizziPackiFiles))
                .catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                response.render('error.html.ittf', {
                    message: 'MetaProductionController.generateMeta',
                    error: err
                });
            });
        });
    }
}
exports.MetaProductionController = MetaProductionController;
//# sourceMappingURL=meta.js.map