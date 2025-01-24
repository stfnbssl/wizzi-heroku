/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\helmet.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Application} from 'express';
import helmet from 'helmet';
import {MiddlewareType} from '#/src/features/app/types';

export const HelmetMiddleware: MiddlewareType = (app: Application) => {
    app.use(helmet())
    console.log("[32m%s[0m", 'HelmetMiddleware installed');
}
;