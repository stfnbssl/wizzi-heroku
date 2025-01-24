/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\mongo\package.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Schema, Model, model} from "mongoose";
import {ModelBuilderType} from "../../app/types";
import {IPackageProductionModel} from "../types";

const PackageProductionSchema: Schema<IPackageProductionModel> = new Schema({
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
 })

// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetPackageProductionModel() when initialized, after buildModel() has benn called
export type PackageProductionModelType = Model<IPackageProductionModel>;
;

let PackageProductionModel: PackageProductionModelType;

export function GetPackageProductionModel():  PackageProductionModelType {
    if (!PackageProductionModel) {
        PackageProductionModel = model<IPackageProductionModel>("PackageProduction", PackageProductionSchema)
        ;
    }
    return PackageProductionModel;
}

export const PackageProductionModelBuilder: ModelBuilderType = {
    buildModel: (options?: any) => 
        PackageProductionModel = model<IPackageProductionModel>("PackageProduction", PackageProductionSchema)
    
    , 
    applyExtraSetup: (options?: any) => {
    }
    
 };