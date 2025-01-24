/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\index.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import {ApiType, ControllerType, AppInitializerType, MiddlewareType} from '#/src/features/app/types';
import {ModelBuilderType} from '#/src/features/app';
import {config} from '#/src/features/config/index';
import { mongodbStart } from '#/src/services/mongodb';
import {siteControllers} from './site/index';
import {wizziProductionsControllers} from '#/src/features/wizziProductions/index';
import {wizziMetaControllers} from '#/src/features/wizziMeta/index';
import {wizziHubProductionsControllers, wizziHubProductionsModelBuilders} from '#/src/features/wizziHubProductions/index';
import {wizziDocsControllers} from '#/src/features/wizziDocs/index';
import {packiControllers} from '#/src/features/packi/index';
import {appMiddlewaresPre, appMiddlewaresPost} from '#/src/middlewares/index';
import App from './App';
var app: any = {
    instance: null
 };
async function start() {
    let modelBuilders: ModelBuilderType[] = [
        ...wizziHubProductionsModelBuilders
    ];
    await mongodbStart(config, modelBuilders);
    
    let middlewaresPre: MiddlewareType[] = [
        ...appMiddlewaresPre
    ];
    let middlewaresPost: MiddlewareType[] = [
        ...appMiddlewaresPost
    ];
    let apis: ApiType[] = [];
    let controllers: ControllerType[] = [
        ...siteControllers, 
        ...wizziProductionsControllers, 
        ...wizziMetaControllers, 
        ...wizziHubProductionsControllers, 
        ...wizziDocsControllers, 
        ...packiControllers
    ];
    console.log("[33m%s[0m", 'Starting app. Config:', config);
    const appInitializer: AppInitializerType = {
        config, 
        middlewaresPre, 
        globalApi: {
            
         }, 
        apis, 
        controllers, 
        middlewaresPost
     };
    app.instance = new App(appInitializer);
    app.instance.listen();
}
try {
    start();
} 
catch (ex) {
    console.log("[31m%s[0m", ex);
} 
export function close(done: any) {
    try {
        console.log(`Index closing.`)
        console.log(`app.instance.close:${app.instance.close}`)
        app.instance.close(() => 
            done()
        )
    } 
    catch (ex) {
        console.log("[31m%s[0m", 'index.close. Exception:', ex);
        done();
    } 
}