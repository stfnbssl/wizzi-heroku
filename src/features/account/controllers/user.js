"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\account\controllers\user.tsx.ittf
*/
const express_1 = require("express");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const PageFormDocument_1 = tslib_1.__importDefault(require("../../../pages/PageFormDocument"));
const user_1 = require("../api/user");
const myname = 'features/account/controllers/user';
function renderPackiPageForm(req, res, data, queryParams) {
    const index = '<!DOCTYPE html>' + (server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(PageFormDocument_1.default, { data: data, queryParams: queryParams })));
    res.set('Content-Type', 'text/html');
    res.set('Content-Length', index.length.toString());
    res.send(index);
}
class UserController {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering UserController.initialize');
            this.router.get('/new', this.getNewUserForm);
            this.router.post('/new', this.postNewUser);
            this.router.get('/update', this.getUpdateUserForm);
            this.router.post('/update', this.postUpdateUser);
            this.router.get('/delete', this.getDeleteUserForm);
            this.router.delete('/delete', this.deleteUser);
        };
        this.getNewUserForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPackiPageForm(request, response, {
                type: 'success',
                formName: 'CreateUser',
                formData: {
                    name: request.query.name,
                    email: request.query.email,
                    avatar_url: request.query.avatar_url,
                    openid_provider: request.query.openid_provider
                }
            }, {});
        });
        this.postNewUser = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, user_1.createUserFromSignup)({
                name: request.body.u_name,
                email: request.body.u_email,
                avatarUrl: request.body.u_avatar_url,
                openidProvider: request.body.u_openid_provider,
                wizziUserName: request.body.u_username
            }).then((result) => {
                if (result.created) {
                    request.session.user = result.user;
                    response.redirect('/account/profile');
                }
                else {
                    response.render('error.html.ittf', {
                        message: 'creating a new wizzi user',
                        error: result
                    });
                }
            }).catch((err) => response.render('error.html.ittf', {
                message: 'creating a new wizzi user',
                error: err
            }));
        });
        this.getUpdateUserForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return renderPackiPageForm(request, response, {
                type: 'success',
                formName: 'UpdateUser',
                formData: {
                    website: 'http://dummy.com'
                }
            }, {});
        });
        this.postUpdateUser = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
        this.getDeleteUserForm = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
        this.deleteUser = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map