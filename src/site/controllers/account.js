"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\site\controllers\account.ts.ittf
*/
const express_1 = require("express");
const queryString = tslib_1.__importStar(require("query-string"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const account_1 = require("../../features/account");
const config_1 = require("../../features/config");
const myname = 'site.controllers.account';
class AccountController {
    constructor() {
        this.path = '/account';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering AccountController.initialize');
            this.router.get('/login', this.login);
            this.router.get('/login/github', this.loginGithub);
            this.router.get('/api/v/authenticate/github/callback', this.githubCallback);
            this.router.get('/profile/github', this.profileGithub);
            this.router.get('/login/google', this.loginGoogle);
            this.router.get('/api/v/authenticate/google/callback', this.googleCallback);
            this.router.get('/profile/google', this.profileGoogle);
            this.router.get('/profile', this.profile);
            this.router.get('/logout', this.logout);
        };
        this.login = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('account/login.html.ittf', {
                title: 'Sign in to Wizzi · Wizzi'
            });
        });
        this.loginGithub = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () { return response.redirect(`https://github.com/login/oauth/authorize?client_id=${config_1.config.githubClientId}`); });
        this.githubCallback = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const body = {
                client_id: config_1.config.githubClientId,
                client_secret: config_1.config.githubClientSecret,
                code: request.query.code
            };
            const options = { headers: { accept: 'application/json' } };
            axios_1.default.post(`https://github.com/login/oauth/access_token`, body, options).then((result) => {
                console.log(myname, 'site.controllers.home.githubCallback', 'result', JSON.stringify(result.data, null, 2), __filename);
                return result.data['access_token'];
            }).then((_token) => {
                console.log(myname, 'site.controllers.home.githubCallback', '_token', _token, __filename);
                request.session.github_access_token = _token;
                response.redirect('/profile/github');
            }).catch((err) => {
                console.log(myname, 'githubCallback', 'error', err, __filename);
                response.status(500).json({ message: err.message });
            });
        });
        this.profileGithub = 
        // loog myname, 'profileGithub'
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + request.session.github_access_token
                }
            }).then((githubResult) => {
                console.log(myname, 'profileGithub', 'githubResult.data', githubResult.data, __filename);
                if (githubResult.data.email == null) {
                    response.render('account/error-github-email-private.html.ittf', {
                        profile: githubResult.data,
                        message: 'trying to create your wizzi account'
                    });
                }
                else {
                    account_1.userApi.getUserByEmail(githubResult.data.email).then((wizziresult) => {
                        console.log(myname, 'profileGithub', 'getUserByEmail', 'wizziresult', wizziresult, __filename);
                        // _ response.send('<pre><code>' +  JSON.stringify({ userData: user /*result.data*/ }, null, 2) + '</code></pre>')
                        if (wizziresult.found) {
                            request.session.user = wizziresult.user;
                            response.redirect('/profile');
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
                    }).catch(
                    // loog myname, 'profileGithub', 'getUserByEmail', 'error', err
                    (err) => response.render('error.html.ittf', {
                        error: err,
                        message: 'getting user data by email'
                    }));
                }
            });
        });
        this.loginGoogle = 
        // loog og myname, 'loginGoogle'
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParams = queryString.stringify({
                client_id: config_1.config.googleClientId,
                scope: 'openid email profile',
                redirect_uri: 'http://localhost:3000/api/v/authenticate/google/callback',
                nonce: 'gartps',
                response_type: 'code'
            });
            response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
        });
        this.googleCallback = 
        // loog og myname, 'googleCallback'
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const body = {
                client_id: config_1.config.googleClientId,
                client_secret: config_1.config.googleClientSecret,
                code: request.query.code,
                redirect_uri: 'http://localhost:3000/api/v/authenticate/google/callback',
                grant_type: 'authorization_code'
            };
            const options = { headers: { accept: 'application/json' } };
            axios_1.default.post(`https://oauth2.googleapis.com/token`, body, options).then(
            // loog og myname, 'googleCallback:', JSON.stringify(result.data,null,2)
            (result) => {
                return result.data['access_token'];
            }).then(
            // loog og myname, '_token:', _token
            (_token) => {
                request.session.google_access_token = _token;
                response.redirect('/profile/google');
            }).catch((err) => response.status(500).json({ message: err.message }));
        });
        this.profileGoogle = 
        // loog og myname, 'profileGoogle'
        (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v2/userinfo`,
                headers: {
                    Authorization: 'Bearer ' + request.session.google_access_token
                }
            }).then(
            // loog og myname, 'profileGoogle', 'googleResult.data', googleResult.data
            (googleResult) => {
                if (googleResult.data.email == null) {
                    response.render('account/error-google-email-private.html.ittf', {
                        profile: googleResult.data,
                        message: 'trying to create your wizzi account'
                    });
                }
                else {
                    account_1.userApi.getUserByEmail(googleResult.data.email).then(
                    // loog og myname, 'profileGoogle', 'getUserByEmail', 'wizziresult', wizziresult
                    (wizziresult) => {
                        // _ response.send('<pre><code>' +  JSON.stringify({ userData: user /*result.data*/ }, null, 2) + '</code></pre>')
                        if (wizziresult.found) {
                            request.session.user = wizziresult.user;
                            response.redirect('/profile');
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
                    }).catch(
                    // loog og myname, 'profileGoogle', 'getUserByEmail', 'error', err
                    (err) => response.render('error.html.ittf', {
                        error: err,
                        message: 'getting user data by email'
                    }));
                }
            });
        });
        this.profile = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('account/profile.html.ittf', {
                title: request.session.user ? request.session.user.name + ' profile · Wizzi' : 'User unknown'
            });
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
exports.AccountController = AccountController;
//# sourceMappingURL=account.js.map