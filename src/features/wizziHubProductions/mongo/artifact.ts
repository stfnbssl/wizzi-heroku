/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\mongo\artifact.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IArtifactProductionModel} from "../types";

const ArtifactProductionSchema: Schema<IArtifactProductionModel> = new Schema({
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
 })

// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetArtifactProductionModel() when initialized, after buildModel() has benn called
export type ArtifactProductionModelType = Model<IArtifactProductionModel>;
;

let ArtifactProductionModel: ArtifactProductionModelType;

export function GetArtifactProductionModel():  ArtifactProductionModelType {
    if (!ArtifactProductionModel) {
        ArtifactProductionModel = model<IArtifactProductionModel>("ArtifactProduction", ArtifactProductionSchema)
        ;
    }
    return ArtifactProductionModel;
}

export const ArtifactProductionModelBuilder: ModelBuilderType = {
    buildModel: (options?: any) => 
        ArtifactProductionModel = model<IArtifactProductionModel>("ArtifactProduction", ArtifactProductionSchema)
    
    , 
    applyExtraSetup: (options?: any) => {
    }
    
 };