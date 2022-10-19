"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPost = exports.getPostList = exports.validatePost = void 0;
const tslib_1 = require("tslib");
const post_1 = require("../models/post");
const myname = 'features.blog.api.post';
function validatePost(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            Post.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'blog post already exists'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validatePost = validatePost;
function getPostList(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options = options || {};
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            const query = Post.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPostList', 'Post.find', 'error', err);
                    return reject(err);
                }
                const resultItem = [];
                var i, i_items = result, i_len = result.length, item;
                for (i = 0; i < i_len; i++) {
                    item = result[i];
                    const item_obj = {
                        _id: item._id,
                        id: item.id,
                        owner: item.owner,
                        name: item.name,
                        title: item.title,
                        content: item.content,
                        state: item.state,
                        pubblished_at: item.pubblished_at
                    };
                    resultItem.push(item_obj);
                }
                resolve({
                    oper: 'getPostList',
                    ok: true,
                    item: resultItem
                });
            });
        });
    });
}
exports.getPostList = getPostList;
function getPost(owner, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            Post.find(query, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPost', 'Post.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        oper: 'get',
                        ok: true,
                        item: result[0]
                    });
                }
                resolve({
                    oper: 'get',
                    ok: false,
                    message: 'Blog post not found'
                });
            });
        });
    });
}
exports.getPost = getPost;
function getPostById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            Post.find({
                _id: id
            }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPost', 'Post.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        oper: 'get',
                        ok: true,
                        item: result[0]
                    });
                }
                resolve({
                    oper: 'getPost',
                    ok: false,
                    message: 'Blog post not found'
                });
            });
        });
    });
}
exports.getPostById = getPostById;
function createPost(owner, name, title, content, state, pubblished_at) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            let query = {
                owner: owner,
                name: name
            };
            Post.find(query, 
            // loog myname, 'getPost', 'Post.find', 'result', result
            (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getPost', 'Post.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                        oper: 'create',
                        ok: false,
                        message: 'Blog post already exists'
                    });
                }
                const newPost = new Post({
                    owner: owner,
                    name: name,
                    title: title,
                    content: content,
                    state: state,
                    pubblished_at: pubblished_at,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newPost.save(function (err, doc) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createPost', 'newPost.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                        oper: 'createPost',
                        ok: true,
                        item: doc._doc,
                        message: 'Blog post created'
                    });
                });
            });
        });
    });
}
exports.createPost = createPost;
function updatePost(id, owner, name, title, content, state, pubblished_at) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            const query = {
                _id: id
            };
            const update = {};
            if (typeof owner !== 'undefined') {
                update['owner'] = owner;
            }
            if (typeof name !== 'undefined') {
                update['name'] = name;
            }
            if (typeof title !== 'undefined') {
                update['title'] = title;
            }
            if (typeof content !== 'undefined') {
                update['content'] = content;
            }
            if (typeof state !== 'undefined') {
                update['state'] = state;
            }
            if (typeof pubblished_at !== 'undefined') {
                update['pubblished_at'] = pubblished_at;
            }
            update['updated_at'] = new Date();
            Post.findOneAndUpdate(query, update, {}, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updatePost', 'Post.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updatePost', 'Post.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                        oper: 'updatePost',
                        ok: false,
                        message: 'Blog post document not found: ' + id
                    });
                }
                return resolve({
                    oper: 'updatePost',
                    ok: true,
                    message: 'Blog post updated'
                });
            });
        });
    });
}
exports.updatePost = updatePost;
function deletePost(id, owner, name, title, content, state, pubblished_at) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Post = (0, post_1.GetPostModel)();
        return new Promise((resolve, reject) => {
            let query = {
                _id: id
            };
            Post.deleteOne(query, (err) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deletePost', 'Post.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deletePost',
                    ok: true,
                    message: 'Blog post'
                });
            });
        });
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=post.js.map