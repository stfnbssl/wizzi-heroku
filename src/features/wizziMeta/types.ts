/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziMeta\types.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import {packiTypes} from '#/src/features/packi';
import {wizziProductionsTypes} from '#/src/features/wizziProductions';

export type WizziProductionRef = { 
    kind: string;
    name: string;
    apiURL: string;
};
;

export type WizziInMemoryMetaRef = { 
    owner: string;
    name: string;
};
;
export type WizziMetaPersistence = { 
    type?: string;
    folderPath?: string;
    packageOwner?: string;
    packageName?: string;
};
;
export type WizziMetaRequest = { 
    description?: string;
    metaPlugins?: string[];
    factoryPlugins?: string[];
    metaProductions?: wizziProductionsTypes.ExtraMetaProductionData[];
    inMemoryMetas?: WizziInMemoryMetaRef[];
    metaCtx?: any;
    metaCtxFilepath?: string;
    metaCtxRef?: WizziProductionRef;
    outputPackageName?: string;
    persist?: WizziMetaPersistence;
};
;