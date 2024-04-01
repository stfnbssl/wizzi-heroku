"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageProductionModelBuilder = exports.GetPackageProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\mongo\package.ts.ittf
    utc time: Mon, 01 Apr 2024 15:09:26 GMT
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
    if (!PackageProductionModel) {
        PackageProductionModel = (0, mongoose_1.model)("PackageProduction");
    }
    return PackageProductionModel;
}
exports.GetPackageProductionModel = GetPackageProductionModel;
exports.PackageProductionModelBuilder = {
    buildModel: (options) => PackageProductionModel = (0, mongoose_1.model)("PackageProduction", PackageProductionSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=package.js.map