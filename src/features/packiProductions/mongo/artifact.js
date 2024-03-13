"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactProductionModelBuilder = exports.GetArtifactProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packiProductions\mongo\artifact.ts.ittf
    utc time: Wed, 13 Mar 2024 05:51:46 GMT
*/
const mongoose_1 = require("mongoose");
const ArtifactProductionSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    description: String,
    wizziSchema: String,
    mainIttf: String,
    packiFiles: String,
    created_at: Date,
    updated_at: Date
});
ArtifactProductionSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetArtifactProductionModel() when initialized, after buildModel() has benn called
let ArtifactProductionModel;
function GetArtifactProductionModel() {
    if (!ArtifactProductionModel) {
        ArtifactProductionModel = (0, mongoose_1.model)("ArtifactProduction");
    }
    return ArtifactProductionModel;
}
exports.GetArtifactProductionModel = GetArtifactProductionModel;
exports.ArtifactProductionModelBuilder = {
    buildModel: (options) => ArtifactProductionModel = (0, mongoose_1.model)("ArtifactProduction", ArtifactProductionSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=artifact.js.map