"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModelBuilder = exports.GetPostModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\blog\models\post.ts.ittf
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
    if (!PostModel) {
        PostModel = (0, mongoose_1.model)("Post");
    }
    return PostModel;
}
exports.GetPostModel = GetPostModel;
exports.PostModelBuilder = {
    buildModel: (options) => PostModel = (0, mongoose_1.model)("Post", PostSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=post.js.map