"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\App.ts.ittf
    utc time: Wed, 13 Mar 2024 05:41:15 GMT
*/
const express_1 = tslib_1.__importDefault(require("express"));
/**
    //
    // Normalize a port into a number, string, or false.
    //
*/
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function initializeApp(app, initValues) {
    initValues.middlewaresPre.forEach(middleware => middleware(app));
    initValues.apis.forEach((api) => {
        console.log("[33m%s[0m", 'installing api: ', api.name);
        api.initialize(app, initValues);
        initValues.globalApi[api.name] = api;
    });
    initValues.controllers.forEach((controller) => {
        console.log("[33m%s[0m", 'installing router on path: ', controller.path);
        controller.initialize(app, initValues);
        app.use(controller.path, controller.router);
    });
    initValues.middlewaresPost.forEach(middleware => middleware(app));
}
class App {
    constructor(initValues) {
        this.config = initValues.config;
        this.port = normalizePort(process.env.PORT || this.config.port) || "3000";
        this.app = (0, express_1.default)();
        ;
        this.app.set('port', this.port);
        initializeApp(this.app, initValues);
    }
    listen(port) {
        this.server = this.app.listen(this.port, () => console.log(`App listening at https://www.wizzihub.com:${this.port}`));
    }
    close(done) {
        console.log(`Server closing. App listening at https://www.wizzihub.com:${this.port}`);
        this.server.close(() => {
            console.log(`Server stopped. App was listening at https://www.wizzihub.com:${this.port}`);
            done();
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map