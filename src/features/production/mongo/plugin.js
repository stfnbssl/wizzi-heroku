"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginProductionModelBuilder = exports.GetPluginProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\mongo\plugin.ts.ittf
*/
const mongoose_1 = require("mongoose");
const PluginProductionSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    description: String,
    packiFiles: String,
    created_at: Date,
    updated_at: Date
});
PluginProductionSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetPluginProductionModel() when initialized, after buildModel() has benn called
let PluginProductionModel;
function GetPluginProductionModel() {
    if (!PluginProductionModel) {
        PluginProductionModel = (0, mongoose_1.model)("PluginProduction");
    }
    return PluginProductionModel;
}
exports.GetPluginProductionModel = GetPluginProductionModel;
exports.PluginProductionModelBuilder = {
    buildModel: (options) => PluginProductionModel = (0, mongoose_1.model)("PluginProduction", PluginProductionSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=plugin.js.map