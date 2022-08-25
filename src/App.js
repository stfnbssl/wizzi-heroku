"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.10
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\App.ts.ittf
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
    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);
    initValues.middlewaresPre.forEach(middleware => middleware(app));
    initValues.apis.forEach((api) => {
        console.log("[33m%s[0m", 'installing api: ', api.name);
        api.initialize(initValues);
        initValues.globalApi[api.name] = api;
    });
    initValues.controllers.forEach((controller) => {
        console.log("[33m%s[0m", 'installing router on path: ', controller.path);
        controller.initialize(initValues);
        app.use(controller.path, controller.router);
    });
    initValues.middlewaresPost.forEach(middleware => middleware(app));
}
class App {
    constructor(initValues) {
        this.config = initValues.config;
        this.port = this.config.port;
        this.app = (0, express_1.default)();
        ;
        initializeApp(this.app, initValues);
    }
    listen(port) {
        this.usedPort = port || this.port;
        this.server = this.app.listen(this.usedPort, () => console.log(`App listening at http://localhost:${this.usedPort}`));
    }
    close(done) {
        console.log(`Server closing. App listening at http://localhost:${this.usedPort}`);
        this.server.close(() => {
            console.log(`Server stopped. App was listening at http://localhost:${this.usedPort}`);
            done();
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map