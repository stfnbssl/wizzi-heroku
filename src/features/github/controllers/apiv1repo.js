"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1RepoController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\github\controllers\apiv1repo.ts.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const config_1 = require("../../config");
const repo_1 = require("../api/repo");
const myname = 'features/github/controllers/apiv1repo';
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
class ApiV1RepoController {
    constructor() {
        this.path = '/api/v1/github/repo';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1RepoController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getRepoList));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getRepo));
            this.router.get("/clone/:owner/:name/:branch", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.cloneBranch));
        };
        this.getRepoList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, repo_1.getRepositories)(config_1.config.githubAccessToken).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getRepoList.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getRepo = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, repo_1.getRepository)(request.params.owner, request.params.name, config_1.config.githubAccessToken).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getRepo.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.cloneBranch = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, repo_1.cloneBranch)({
                owner: request.params.owner,
                name: request.params.name,
                token: config_1.config.githubAccessToken
            }, request.params.branch || 'main').then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'cloneBranch.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1RepoController = ApiV1RepoController;
//# sourceMappingURL=apiv1repo.js.map