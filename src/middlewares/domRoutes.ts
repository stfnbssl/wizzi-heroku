/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\domRoutes.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import path from 'path';
import {Application} from 'express';
import {MiddlewareType} from '#/src/features/app/types';

export const DomRoutesMiddleware: MiddlewareType = (app: Application) => {
    app.get("/public/play/*", (req, res) => 
        res.sendFile(path.join(__dirname, '..', 'public/play/index.html'))
    )
    console.log("[32m%s[0m", 'DomRoutesMiddleware installed');
}
;