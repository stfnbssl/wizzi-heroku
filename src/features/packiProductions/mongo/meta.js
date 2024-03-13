"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaProductionModelBuilder = exports.GetMetaProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\mongo\meta.ts.ittf
    utc time: Wed, 13 Mar 2024 06:20:39 GMT
*/
const mongoose_1 = require("mongoose");
const MetaProductionSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    description: String,
    packiFiles: String,
    created_at: Date,
    updated_at: Date
});
MetaProductionSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetMetaProductionModel() when initialized, after buildModel() has benn called
let MetaProductionModel;
function GetMetaProductionModel() {
    if (!MetaProductionModel) {
        MetaProductionModel = (0, mongoose_1.model)("MetaProduction");
    }
    return MetaProductionModel;
}
exports.GetMetaProductionModel = GetMetaProductionModel;
exports.MetaProductionModelBuilder = {
    buildModel: (options) => MetaProductionModel = (0, mongoose_1.model)("MetaProduction", MetaProductionSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=meta.js.map