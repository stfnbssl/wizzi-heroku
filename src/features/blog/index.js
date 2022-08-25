"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postApi = exports.blogControllers = exports.blogModelBuilders = exports.blogModelGetters = exports.blogTypes = void 0;
const tslib_1 = require("tslib");
const blogTypes = tslib_1.__importStar(require("./types"));
exports.blogTypes = blogTypes;
const post_1 = require("./mongo/post");
const apiv1post_1 = require("./controllers/apiv1post");
const postApi = tslib_1.__importStar(require("./api/post"));
exports.postApi = postApi;
const blogModelGetters = {
    GetPostModel: post_1.GetPostModel
};
exports.blogModelGetters = blogModelGetters;
const blogModelBuilders = [
    post_1.PostModelBuilder
];
exports.blogModelBuilders = blogModelBuilders;
const blogControllers = [
    new apiv1post_1.ApiV1PostController()
];
exports.blogControllers = blogControllers;
//# sourceMappingURL=index.js.map