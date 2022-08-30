"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFolderController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\controllers\tfolder.tsx.ittf
*/
const express_1 = require("express");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const tfolder_1 = require("../api/tfolder");
const myname = 'features/production/controllers/tfolder';
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
class TFolderController {
    constructor() {
        this.path = '/tfolder';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering TFolderController.initialize');
            this.router.get('/new', this.getNewTFolderForm);
            this.router.post('/new', this.postTFolder);
            this.router.get('/update/:id', this.getUpdateTFolderForm);
            this.router.post('/update', this.putTFolder);
            this.router.get('/delete/:id', this.getDeleteTFolderForm);
            this.router.post('/delete', this.deleteTFolder);
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
            return (0, tfolder_1.createTFolder)(request.session.user.username, request.body.tf_name, request.body.tf_description, JSON.stringify(getPackiFiles('readme.md.ittf'))).then((result) => {
                if (result.ok) {
                    response.redirect('/productions/tfolders');
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
            }));
        });
        this.getUpdateTFolderForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getUpdateTFolderForm.id', id, __filename);
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
        this.getDeleteTFolderForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            console.log(myname + '.getDeleteTFolderForm.id', id, __filename);
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
        this.deleteTFolder = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(myname + '.deleteTFolder.request.path', request.path, __filename);
            const obj = request.body;
            (0, tfolder_1.deleteTFolder)(obj.tf_id, obj.tf_owner, obj.tf_name, obj.tf_description).then((result) => {
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