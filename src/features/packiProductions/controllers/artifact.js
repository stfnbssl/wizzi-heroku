"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactProductionController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = require("express");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const meta_1 = require("../api/meta");
const artifact_1 = require("../api/artifact");
const utils_2 = require("../utils");
const myname = 'features/production/controllers/artifact';
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
class ArtifactProductionController {
    constructor() {
        this.path = '/artifact';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering ArtifactProductionController.initialize');
            this.router.get("/new", makeHandlerAwareOfAsyncErrors(this.getNewArtifactForm));
            this.router.post("/new", makeHandlerAwareOfAsyncErrors(this.postArtifact));
            this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors(this.getUpdateArtifactForm));
            this.router.post("/update", makeHandlerAwareOfAsyncErrors(this.putArtifact));
            this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors(this.getDeleteArtifactForm));
            this.router.post("/delete", makeHandlerAwareOfAsyncErrors(this.deleteArtifact));
        };
        this.getNewArtifactForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPageForm(request, response, {
                type: 'success',
                formName: 'CreateArtifactProduction',
                formData: {
                    owner: request.session.user.username,
                    name: request.query.name,
                    mainIttf: request.query.mainIttf,
                    schema: request.query.schema
                }
            }, {});
        });
        this.postArtifact = 
        // loog myname + '.postNewArtifact.request.body', JSON.stringify(request.body, null, 2)
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wizziSchema = request.body.ap_wizzi_schema || 'html';
            const mainIttf = request.body.ap_main_ittf || 'index.' + wizziSchema + '.ittf';
            const contexts = request.body.ap_contexts || '[]';
            const tfolders = request.body.ap_tfolders || '[]';
            (0, meta_1.getTemplatePackiFiles)(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
                wizziSchema: wizziSchema,
                mainIttf: mainIttf
            }).then((packiFiles) => (0, artifact_1.createArtifactProduction)(request.session.user.username, request.body.ap_name, request.body.ap_description, mainIttf, wizziSchema, JSON.stringify((0, utils_2.mergePackiFiles)(packiFiles, getPackiConfigFile()))).then((result) => {
                // _ response.redirect('/packi/productions/artifacts')
                if (result.ok) {
                    response.redirect('/~~/a/' + request.session.user.username + '/' + request.body.ap_name);
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new artifact production',
                        error: result
                    });
                }
            }).catch((err) => response.render('error.html.ittf', {
                message: 'creating a new artifact production',
                error: err
            })));
        });
        this.getUpdateArtifactForm = 
        // loog myname + '.getUpdateArtifactForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, artifact_1.getArtifactProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'UpdateArtifactProduction',
                formData: {
                    _id: id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description,
                    mainIttf: result.mainIttf,
                    wizziSchema: result.wizziSchema
                }
            }, {}));
        });
        this.putArtifact = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, artifact_1.updateArtifactProduction)(obj.ap_id, obj.ap_owner, obj.ap_name, obj.ap_description, obj.ap_mainIttf, obj.ap_wizziSchema).then((result) => {
                if (result.ok) {
                    response.redirect('/packi/productions/artifacts');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'updating a artifact production',
                        error: result
                    });
                }
            });
        });
        this.getDeleteArtifactForm = 
        // loog myname + '.getDeleteArtifactForm.id', id
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            (0, artifact_1.getArtifactProductionObjectById)(id).then((result) => renderPageForm(request, response, {
                type: 'success',
                formName: 'DeleteArtifactProduction',
                formData: {
                    _id: result._id,
                    owner: result.owner,
                    name: result.name,
                    description: result.description,
                    mainIttf: result.mainIttf,
                    wizziSchema: result.wizziSchema
                }
            }, {}));
        });
        this.deleteArtifact = 
        // loog myname + '.deleteArtifact.request.path', request.path
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = request.body;
            (0, artifact_1.deleteArtifactProduction)(obj.ap_id, obj.ap_owner, obj.ap_name).then((result) => {
                if (result.ok) {
                    response.redirect('/packi/productions/artifacts');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'deleting a artifact production',
                        error: result
                    });
                }
            });
        });
    }
}
exports.ArtifactProductionController = ArtifactProductionController;
//# sourceMappingURL=artifact.js.map