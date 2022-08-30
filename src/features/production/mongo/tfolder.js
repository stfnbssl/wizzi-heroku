"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFolderModelBuilder = exports.GetTFolderModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\mongo\tfolder.ts.ittf
*/
const mongoose_1 = require("mongoose");
const TFolderSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    description: String,
    packiFiles: String,
    created_at: Date,
    updated_at: Date
});
TFolderSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetTFolderModel() when initialized, after buildModel() has benn called
let TFolderModel;
function GetTFolderModel() {
    return TFolderModel;
}
exports.GetTFolderModel = GetTFolderModel;
exports.TFolderModelBuilder = {
    buildModel: () => TFolderModel = (0, mongoose_1.model)("TFolder", TFolderSchema)
};
//# sourceMappingURL=tfolder.js.map