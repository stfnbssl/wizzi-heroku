"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFolderController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const tfolder_1 = require("../api/tfolder");
const utils_2 = require("../utils");
const myname = 'features/production/controllers/tfolder';
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
class TFolderController {
    constructor() {
        this.path = '/tfolder';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering TFolderController.initialize');
            this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewTFolderForm));
            this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postTFolder));
            this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateTFolderForm));
            this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putTFolder));
            this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteTFolderForm));
            this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteTFolder));
        };
        this.getNewTFolderForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'CreateTFolder',
                formData: {
                    owner: request.session.user.username
                }
            }, {});
        });
        this.postTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, meta_1.getTemplatePackiFiles)(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
                wizziSchema: null,
                mainIttf: null
            }).then((packiFiles) => (0, tfolder_1.createTFolder)(request.session.user.username, request.body.tf_name, request.body.tf_description, JSON.stringify((0, utils_2.mergePackiFiles)(packiFiles, getPackiConfigFile()))).then((result) => {
                if (result.ok) {
                    response.redirect('/~~/t/' + request.session.user.username + '/' + request.body.mp_name);
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new tfolder',
                        error: result
                    });
                }
            }).catch((err) => response.render('error.html.ittf', {
                message: 'creating a new tfolder',
                error: err
            })));
        });
        this.getUpdateTFolderForm = 
        // loog myname + '.getUpdateTFolderForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, tfolder_1.getTFolderObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'UpdateTFolder',
                formData: {
                    _id: id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.putTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, tfolder_1.updateTFolder)(obj.tf_id, obj.tf_owner, obj.tf_name, obj.tf_description).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/tfolders');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'updating a tFolder production',
                        error: result
                    });
                }
            });
        });
        this.getDeleteTFolderForm = 
        // loog myname + '.getDeleteTFolderForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, tfolder_1.getTFolderObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'DeleteTFolder',
                formData: {
                    _id: result._id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description
                }
            }, {}));
        });
        this.deleteTFolder = 
        // loog myname + '.deleteTFolder.request.path', request.path
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, tfolder_1.deleteTFolder)(obj.tf_id, obj.tf_owner, obj.tf_name).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/tfolders');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'deleting a tFolder production',
                        error: result
                    });
                }
            });
        });
    }
}
exports.TFolderController = TFolderController;
//# sourceMappingURL=tfolder.js.map