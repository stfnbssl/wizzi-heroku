"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactProductionModelBuilder = exports.GetArtifactProductionModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi-override\src\features\production\mongo\artifact.ts.ittf
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
    return ArtifactProductionModel;
}
exports.GetArtifactProductionModel = GetArtifactProductionModel;
exports.ArtifactProductionModelBuilder = {
    buildModel: () => ArtifactProductionModel = (0, mongoose_1.model)("ArtifactProduction", ArtifactProductionSchema)
};
//# sourceMappingURL=artifact.js.map