"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelBuilder = exports.GetUserModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\account\mongo\user.ts.ittf
*/
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: String,
    username: String,
    name: String,
    avatar_url: String,
    openid_provider: String,
    created_at: Date,
    updated_at: Date,
    last_access_at: Date
});
// mongoose models creation is centralized
// mongodb calls buildModel() when starting, after connection has been established
// controllers call UserModel() when initialized, after buildModel() has benn called
let UserModel;
function GetUserModel() {
    return UserModel;
}
exports.GetUserModel = GetUserModel;
exports.UserModelBuilder = {
    buildModel: (options) => UserModel = (0, mongoose_1.model)("User", UserSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=user.js.map