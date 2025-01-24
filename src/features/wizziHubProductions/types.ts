/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\types.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/

import {Document} from "mongoose";
import {packiTypes} from '#src/features/packi';

export type PackiProduction = 'artifact' | 'package' | 'meta' | 'plugin' | 'tfolder' | 'job';
;

export type IArtifactProduction = { 
    owner: string;
    name: string;
    description: string;
    mainIttf: string;
    wizziSchema: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type IArtifactProduction_doc = { 
    _doc: IArtifactProduction;
};

export interface IArtifactProductionModel extends IArtifactProduction, IArtifactProduction_doc, Document {
}


export type IPackageProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type IPackageProduction_doc = { 
    _doc: IPackageProduction;
};

export interface IPackageProductionModel extends IPackageProduction, IPackageProduction_doc, Document {
}


export type IPluginProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type IPluginProduction_doc = { 
    _doc: IPluginProduction;
};

export interface IPluginProductionModel extends IPluginProduction, IPluginProduction_doc, Document {
}


export type IMetaProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type IMetaProduction_doc = { 
    _doc: IMetaProduction;
};

export interface IMetaProductionModel extends IMetaProduction, IMetaProduction_doc, Document {
}


export type ITFolderProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type ITFolderProduction_doc = { 
    _doc: ITFolderProduction;
};

export interface ITFolderProductionModel extends ITFolderProduction, ITFolderProduction_doc, Document {
}


export type IJobProduction = { 
    owner: string;
    name: string;
    description: string;
    packiFiles: string;
    created_at: Date;
    updated_at: Date;
};
;


type IJobProduction_doc = { 
    _doc: IJobProduction;
};

export interface IJobProductionModel extends IJobProduction, IJobProduction_doc, Document {
}

export type WizziInMemoryMetaRef = { 
    owner: string;
    name: string;
};
;

export type PackiProductionObject = { 
    _id: string;
    owner: string;
    name: string;
    description: string;
    mainIttf?: string;
    wizziSchema?: string;
    packiFiles: packiTypes.PackiFiles;
    created_at: Date;
    updated_at: Date;
    packiProduction: string;
    configPackiFile?: packiTypes.PackiFile;
    packiConfigJsonObj?: any;
};
;