"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1AuthenticateController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\auth\controllers\apiv1authenticate.ts.ittf
*/
const express_1 = require("express");
const config_1 = require("../../config");
const axios_1 = tslib_1.__importDefault(require("axios"));
const myname = 'features.auth.controllers.apiv1authenticate';
class ApiV1AuthenticateController {
    constructor() {
        this.path = '/api/v1/authenticate';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1AuthenticateController.initialize');
            this.router.get('/github/callback', this.githubCallback);
            this.router.get('/google/callback', this.googleCallback);
        };
        this.githubCallback = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const body = {
                client_id: config_1.config.githubClientId,
                client_secret: config_1.config.githubClientSecret,
                code: request.query.code
            };
            const options = { headers: { accept: 'application/json' } };
            axios_1.default.post(`https://github.com/login/oauth/access_token`, body, options).then((result) => {
                console.log(myname, 'githubCallback', 'result', JSON.stringify(result.data, null, 2), __filename);
                return result.data['access_token'];
            }).then((_token) => {
                console.log(myname, 'githubCallback', '_token', _token, __filename);
                request.session.github_access_token = _token;
                request.session.save(function (err) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'githubCallback', 'error saving session', err);
                        return response.status(500).json({ message: err.message });
                    }
                    console.log(myname, 'githubCallback', 'session saved before redirect to /account/profile/github', __filename);
                    response.redirect('/account/profile/github');
                });
            }).catch((err) => {
                console.log(myname, 'githubCallback', 'error', err, __filename);
                response.status(500).json({ message: err.message });
            });
        });
        this.googleCallback = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const body = {
                client_id: config_1.config.googleClientId,
                client_secret: config_1.config.googleClientSecret,
                code: request.query.code,
                redirect_uri: 'https://www.wizzihub.com/api/v1/authenticate/google/callback',
                grant_type: 'authorization_code'
            };
            const options = { headers: { accept: 'application/json' } };
            axios_1.default.post(`https://oauth2.googleapis.com/token`, body, options).then((result) => {
                return result.data['access_token'];
            }).then((_token) => {
                request.session.google_access_token = _token;
                request.session.save(function (err) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'githubCallback', 'error saving session', err);
                        return response.status(500).json({ message: err.message });
                        console.log(myname, 'githubCallback', 'session saved before redirect to /account/profile/google', __filename);
                    }
                    response.redirect('/account/profile/google');
                });
            }).catch((err) => response.status(500).json({ message: err.message }));
        });
    }
}
exports.ApiV1AuthenticateController = ApiV1AuthenticateController;
//# sourceMappingURL=apiv1authenticate.js.map