"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\meta.tsx.ittf
*/
const express_1 = require("express");
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
function getPackiFiles() {
    return {
        ['properties/index.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    [ properties',
                '        {',
                '            name "name"',
                '            type "string"',
                '        string( kind )'
            ].join('\n')
        },
        ['properties/t/string.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "string"',
                '    $hook'
            ].join('\n')
        },
        ['properties/t/boolean.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "boolean"',
                '    $hook'
            ].join('\n')
        },
        ['properties/t/number.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "number"',
                '    $hook'
            ].join('\n')
        },
        ['properties/t/object.json.ittf']: {
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
        ['properties/t/array.json.ittf']: {
            type: 'CODE',
            contents: [
                '{',
                '    $params name',
                '    name "${name}"',
                '    type "array"',
                '    [ properties',
                '        $hook'
            ].join('\n')
        },
        ['template/index.html.ittf.ittf']: {
            type: 'CODE',
            contents: [
                'html',
                '    body',
                '        div',
                '            h1',
                '                + Hello ${cliCtx.name}'
            ].join('\n')
        }
    };
}
class MetaProductionController {
    constructor() {
        this.path = '/meta';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering MetaProductionController.initialize');
            this.router.get('/new', this.getNewMetaForm);
            this.router.post('/new', this.postMeta);
            this.router.get('/update/:id', this.getUpdateMetaForm);
            this.router.post('/update', this.putMeta);
            this.router.get('/delete/:id', this.getDeleteMetaForm);
            this.router.post('/delete', this.deleteMeta);
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
            return (0, meta_1.createMetaProduction)(request.session.user.username, request.body.mp_name, request.body.mp_description, JSON.stringify(getPackiFiles())).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/metas');
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
        this.getUpdateMetaForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getUpdateMetaForm.id', id, __filename);
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
        this.getDeleteMetaForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getDeleteMetaForm.id', id, __filename);
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
        this.deleteMeta = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.deleteMeta.request.path', request.path, __filename);
            const obj = request.body;
            (0, meta_1.deleteMetaProduction)(obj.mp_id, obj.mp_owner, obj.mp_name, obj.mp_description).then((result) => {
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
    }
}
exports.MetaProductionController = MetaProductionController;
//# sourceMappingURL=meta.js.map