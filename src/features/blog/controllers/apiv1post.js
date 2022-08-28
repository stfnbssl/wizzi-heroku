"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1PostController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\features\blog\controllers\apiv1post.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const post_1 = require("../api/post");
const myname = 'features/blog/controllers/apiv1post';
class ApiV1PostController {
    constructor() {
        this.path = '/api/v1/blog/post';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1PostController.initialize');
            this.router.get('/:owner', this.getPostList);
            this.router.get('/checkname/:owner/:name', this.getCheckPostName);
            this.router.get('/:owner/:name', this.getPost);
            this.router.post('/:owner/:name', this.postPost);
            this.router.delete('/:id', this.deletePost);
        };
        this.getPostList = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.getListPost)({
                query: {
                    owner: request.params.owner
                }
            }).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPostList.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getCheckPostName = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.validatePost)(request.params.owner, request.params.name).then((result) => {
                console.log('getCheckPostName.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('getCheckPostName.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.getPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, post_1.getPost)(request.params.owner, request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('getPost.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.postPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('postPost.request.params', request.params, __filename);
            console.log('postPost.request.body', request.body, __filename);
            (0, post_1.createPost)(request.params.owner, request.params.name, request.body.title, request.body.content).then((result) => {
                console.log('postPost.create.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('postPost.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.putPost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('putPost.request.params', request.params, __filename);
            console.log('putPost.request.body', request.body, __filename);
            (0, post_1.updatePost)(request.params.id, request.body.owner, request.body.name, request.body.title, request.body.content, request.body.state).then((result) => {
                console.log('putPost.update.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('putPost.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
        this.deletePost = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('deletePost.request.params', request.params, __filename);
            console.log('deletePost.request.body', request.body, __filename);
            (0, post_1.deletePost)(request.params.id).then((result) => {
                console.log('deletePost.update.result', result, __filename);
                (0, sendResponse_1.sendSuccess)(response, result);
            }).catch((err) => {
                console.log('deletePost.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1PostController = ApiV1PostController;
//# sourceMappingURL=apiv1post.js.map