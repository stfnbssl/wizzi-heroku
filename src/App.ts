/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\App.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import express from 'express';
import {AppInitializerType} from '#/src/features/app';
import {ConfigType} from '#/src/features/config';

/**
    // 
    // Normalize a port into a number, string, or false.
    // 
*/
function normalizePort(val: any) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


function initializeApp(app: express.Application, initValues: AppInitializerType) {
    
    initValues.middlewaresPre.forEach(middleware => 
        middleware(app)
    )
    
    initValues.apis.forEach((api) => {
        console.log("[33m%s[0m", 'installing api: ', api.name);
        api.initialize(app, initValues)
        initValues.globalApi[api.name] = api;
    }
    )
    
    initValues.controllers.forEach((controller) => {
        console.log("[33m%s[0m", 'installing router on path: ', controller.path);
        controller.initialize(app, initValues)
        app.use(controller.path, controller.router);
    }
    )
    
    initValues.middlewaresPost.forEach(middleware => 
        middleware(app)
    )
}

class App {
    constructor(initValues: AppInitializerType) {
        
        this.config = initValues.config;
        this.port = normalizePort(process.env.PORT || this.config.port) || "3000";
        this.app = express();
        ;
        this.app.set('port', this.port);
        
        initializeApp(this.app, initValues)
        
        
    }
    public app: express.Application;
    public config: ConfigType;
    public port: any;
    public server: any;
    public listen(port?: number) {
        this.server = this.app.listen(this.port, () => 
            console.log(`App listening at http://localhost:${this.port}`)
        )
        ;
    }
    public close(done: Function) {
        console.log(`Server closing. App listening at http://localhost:${this.port}`)
        this.server.close(() => {
            console.log(`Server stopped. App was listening at http://localhost:${this.port}`)
            done();
        }
        )
    }
}
export default App;