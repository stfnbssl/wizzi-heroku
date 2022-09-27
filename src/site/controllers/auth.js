"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\site\controllers\auth.ts.ittf
*/
const express_1 = require("express");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils");
const queryString = tslib_1.__importStar(require("query-string"));
const config_1 = require("../../features/config");
const myname = 'site.controllers.auth';
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
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering AuthController.initialize');
            this.router.get("/login", makeHandlerAwareOfAsyncErrors(this.login));
            this.router.get("/login/github", makeHandlerAwareOfAsyncErrors(this.loginGithub));
            this.router.get("/login/google", makeHandlerAwareOfAsyncErrors(this.loginGoogle));
            this.router.get("/logout", makeHandlerAwareOfAsyncErrors(this.logout));
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