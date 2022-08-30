"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModelBuilder = exports.GetPostModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\blog\mongo\post.ts.ittf
*/
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    title: String,
    content: String,
    state: String,
    created_at: Date,
    updated_at: Date,
    published_at: Date
});
PostSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetPostModel() when initialized, after buildModel() has benn called
let PostModel;
function GetPostModel() {
    return PostModel;
}
exports.GetPostModel = GetPostModel;
exports.PostModelBuilder = {
    buildModel: () => PostModel = (0, mongoose_1.model)("Post", PostSchema)
};
//# sourceMappingURL=post.js.map