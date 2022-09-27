"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PostController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\blog\controllers\apiv1post.ts.ittf
*/
const express_1 = require("express");
const index_1 = require("../../../middlewares/index");
const sendResponse_1 = require("../../../utils/sendResponse");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils");
const post_1 = require("../api/post");
const myname = 'features/blog/controllers/apiv1post';
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
class ApiV1PostController {
    constructor() {
        this.path = '/api/v1/blog/post';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PostController.initialize');
            this.router.get("/:owner", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getPostList));
            this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getCheckPostName));
            this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.getPost));
            this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.postPost));
            this.router.delete("/:id", makeHandlerAwareOfAsyncErrors(index_1.apiSecured), makeHandlerAwareOfAsyncErrors(this.deletePost));
        };
        this.getPostList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.getListPost)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'getPostList.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckPostName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.validatePost)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'getCheckPostName.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.getPost)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'getPost.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.createPost)(request.params.owner, request.params.name, request.body.title, request.body.content).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'postPost.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.updatePost)(request.params.id, request.body.owner, request.body.name, request.body.title, request.body.content, request.body.state).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'putPost.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.deletePost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.deletePost)(request.params.id).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log("[31m%s[0m", 'deletePost.error', err);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PostController = ApiV1PostController;
//# sourceMappingURL=apiv1post.js.map