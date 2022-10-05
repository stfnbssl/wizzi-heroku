"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\account.ts.ittf
*/
const express_1 = require("express");
const index_1 = require("../../middlewares/index");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils");
const queryString = tslib_1.__importStar(require("query-string"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const account_1 = require("../../features/account");
const myname = 'site.controllers.account';
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
class AccountController {
    constructor() {
        this.path = '/account';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering AccountController.initialize');
            this.router.get("/profile", makeHandlerAwareOfAsyncErrors(index_1.webSecured), makeHandlerAwareOfAsyncErrors(this.profile));
            this.router.get("/profile/github", makeHandlerAwareOfAsyncErrors(this.profileGithub));
            this.router.get("/profile/google", makeHandlerAwareOfAsyncErrors(this.profileGoogle));
        };
        this.profile = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('account/profile.html.ittf', {
                title: request.session.user ? request.session.user.name + ' profile · Wizzi' : 'User unknown'
            });
        });
        this.profileGithub = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + request.session.github_access_token
                }
            }).then((githubResult) => {
                if (githubResult.data.email == null) {
                    response.render('account/error-github-email-private.html.ittf', {
                        profile: githubResult.data,
                        message: 'trying to create your wizzi account'
                    });
                }
                else {
                    account_1.userApi.getUserByEmail(githubResult.data.email).then((wizziresult) => {
                        // _ response.send('<pre><code>' +  JSON.stringify({ userData: user /*result.data*/ }, null, 2) + '</code></pre>')
                        if (wizziresult.found) {
                            request.session.user = wizziresult.user;
                            response.redirect('/account/profile');
                        }
                        else {
                            const queryParams = queryString.stringify({
                                name: githubResult.data.name,
                                email: githubResult.data.email,
                                avatar_url: githubResult.data.avatar_url,
                                openid_provider: 'github'
                            });
                            response.redirect(`/user/new?${queryParams}`);
                        }
                    }).catch((err) => {
                        console.log("[31m%s[0m", myname, 'profileGithub', 'getUserByEmail', 'error', err);
                        response.render('error.html.ittf', {
                            error: err,
                            message: 'Error getting user data by email from mongodb'
                        });
                    });
                }
            });
        });
        this.profileGoogle = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v2/userinfo`,
                headers: {
                    Authorization: 'Bearer ' + request.session.google_access_token
                }
            }).then((googleResult) => {
                if (googleResult.data.email == null) {
                    response.render('account/error-google-email-private.html.ittf', {
                        profile: googleResult.data,
                        message: 'trying to create your wizzi account'
                    });
                }
                else {
                    account_1.userApi.getUserByEmail(googleResult.data.email).then((wizziresult) => {
                        // _ response.send('<pre><code>' +  JSON.stringify({ userData: user /*result.data*/ }, null, 2) + '</code></pre>')
                        if (wizziresult.found) {
                            request.session.user = wizziresult.user;
                            response.redirect('/account/profile');
                        }
                        else {
                            const queryParams = queryString.stringify({
                                name: googleResult.data.name,
                                email: googleResult.data.email,
                                avatar_url: googleResult.data.picture,
                                openid_provider: 'google'
                            });
                            response.redirect(`/user/new?${queryParams}`);
                        }
                    }).catch((err) => response.render('error.html.ittf', {
                        error: err,
                        message: 'getting user data by email'
                    }));
                }
            });
        });
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.js.map