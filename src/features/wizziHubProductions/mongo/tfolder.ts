/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\mongo\tfolder.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {ITFolderProductionModel} from "../types";

const TFolderProductionSchema: Schema<ITFolderProductionModel> = new Schema({
    owner: String, 
    name: String, 
    description: String, 
    packiFiles: String, 
    created_at: Date, 
    updated_at: Date
 });

TFolderProductionSchema.index({
    owner: 1, 
    name: 1
 }, {
    unique: true
 })

// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetTFolderProductionModel() when initialized, after buildModel() has benn called
export type TFolderProductionModelType = Model<ITFolderProductionModel>;
;

let TFolderProductionModel: TFolderProductionModelType;

export function GetTFolderProductionModel():  TFolderProductionModelType {
    if (!TFolderProductionModel) {
        TFolderProductionModel = model<ITFolderProductionModel>("TFolder", TFolderProductionSchema)
        ;
    }
    return TFolderProductionModel;
}

export const TFolderProductionModelBuilder: ModelBuilderType = {
    buildModel: (options?: any) => 
        TFolderProductionModel = model<ITFolderProductionModel>("TFolder", TFolderProductionSchema)
    
    , 
    applyExtraSetup: (options?: any) => {
    }
    
 };