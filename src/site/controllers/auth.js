"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\auth.ts.ittf
*/
const express_1 = require("express");
const queryString = tslib_1.__importStar(require("query-string"));
const config_1 = require("../../features/config");
const myname = 'site.controllers.auth';
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering AuthController.initialize');
            this.router.get('/login', this.login);
            this.router.get('/login/github', this.loginGithub);
            this.router.get('/login/google', this.loginGoogle);
            this.router.get('/logout', this.logout);
        };
        this.login = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('auth/login.html.ittf', {
                title: 'Sign in to Wizzi · Wizzi'
            });
        });
        this.loginGithub = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () { return response.redirect(`https://github.com/login/oauth/authorize?client_id=${config_1.config.githubClientId}`); });
        this.loginGoogle = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = queryString.stringify({
                client_id: config_1.config.googleClientId,
                scope: 'openid email profile',
                redirect_uri: 'https://www.wizzihub.com/api/v1/authenticate/google/callback',
                nonce: 'gartps',
                response_type: 'code'
            });
            response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
        });
        this.logout = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            request.session.user = null;
            request.session.github_access_token = null;
            request.session.google_access_token = null;
            response.redirect('/');
        });
    }
    ;
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map