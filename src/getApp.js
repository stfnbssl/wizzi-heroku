"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.10
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\getApp.ts.ittf
*/
const express_1 = tslib_1.__importDefault(require("express"));
const index_1 = require("./features/config/index");
const index_2 = require("./site/index");
const index_3 = require("./middlewares/index");
function startServices(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
function getInitValues(config, startedServices) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let middlewaresPre = [
            ...index_3.appMiddlewaresPre
        ];
        let middlewaresPost = [
            ...index_3.appMiddlewaresPost
        ];
        let apis = [];
        let controllers = [
            ...index_2.siteControllers
        ];
        const appInitializer = {
            config,
            middlewaresPre,
            globalApi: {},
            apis,
            controllers,
            middlewaresPost
        };
        return appInitializer;
    });
}
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
function getApp() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const startedServices = yield startServices(index_1.config);
        const initValues = yield getInitValues(index_1.config, startedServices);
        var app = (0, express_1.default)();
        initializeApp(app, initValues);
        return app;
    });
}
module.exports = {
    getApp
};
//# sourceMappingURL=getApp.js.map