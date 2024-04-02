"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFolderModelBuilder = exports.GetTFolderModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\mongo\tfolder.ts.ittf
    utc time: Tue, 02 Apr 2024 19:03:14 GMT
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
    if (!TFolderModel) {
        TFolderModel = (0, mongoose_1.model)("TFolder");
    }
    return TFolderModel;
}
exports.GetTFolderModel = GetTFolderModel;
exports.TFolderModelBuilder = {
    buildModel: (options) => TFolderModel = (0, mongoose_1.model)("TFolder", TFolderSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=tfolder.js.map