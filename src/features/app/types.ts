/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\app\types.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import express from 'express';
import {ConfigType} from '#/src/features/config';
export type ModelBuilderType = { 
    buildModel: (options?: any) => void;
    applyExtraSetup: (options?: any) => void;
}
export type ApiType = { 
    name: string;
    initialize: (app: express.Application, initValues: AppInitializerType) => void;
}
export type ControllerType = { 
    path: string;
    router: express.Router;
    initialize: (app: express.Application, initValues: AppInitializerType) => void;
}
export type MiddlewareType = (app: express.Application) => void;
export type AppInitializerType = { 
    config: ConfigType;
    globalApi: any;
    apis: ApiType[];
    controllers: ControllerType[];
    middlewaresPre: MiddlewareType[];
    middlewaresPost: MiddlewareType[];
}