"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageProductionModelBuilder = exports.GetPackageProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\production\mongo\package.ts.ittf
*/
const mongoose_1 = require("mongoose");
const PackageProductionSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    description: String,
    packiFiles: String,
    created_at: Date,
    updated_at: Date
});
PackageProductionSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetPackageProductionModel() when initialized, after buildModel() has benn called
let PackageProductionModel;
function GetPackageProductionModel() {
    return PackageProductionModel;
}
exports.GetPackageProductionModel = GetPackageProductionModel;
exports.PackageProductionModelBuilder = {
    buildModel: () => PackageProductionModel = (0, mongoose_1.model)("PackageProduction", PackageProductionSchema)
};
//# sourceMappingURL=package.js.map