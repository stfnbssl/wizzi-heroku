/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\index.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {MiddlewareType} from '#/src/features/app';
import { CorsMiddleware } from './cors';
import { SessionMiddleware } from './session';
import { IttfStaticMiddleware } from './ittfStatic';
import { PackiBrowseMiddleware } from './packiBrowse';
import { BodyParserMiddleware } from './bodyParser';
import { CacheControlMiddleware } from './cacheControl';
import {UserInViewMiddleware} from './userInViews';
import { StaticFilesMiddleware } from './static';
import { DomRoutesMiddleware } from './domRoutes';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { PromiseMiddleware } from './promise';
const appMiddlewaresPre: MiddlewareType[] = [
    CorsMiddleware, 
    SessionMiddleware, 
    IttfStaticMiddleware, 
    PackiBrowseMiddleware, 
    BodyParserMiddleware, 
    CacheControlMiddleware, 
    UserInViewMiddleware, 
    StaticFilesMiddleware, 
    DomRoutesMiddleware, 
    WizziViewEngineMiddleware, 
    PromiseMiddleware
];
const appMiddlewaresPost: MiddlewareType[] = [];
export {appMiddlewaresPre, appMiddlewaresPost};