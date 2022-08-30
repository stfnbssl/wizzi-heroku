"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoHomeController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\site\controllers\demoHome.ts.ittf
*/
const express_1 = require("express");
class DemoHomeController {
    constructor() {
        this.path = '/demo/home';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering DemoHomeController.initialize');
            this.router.get(`/`, this.home);
        };
        this.home = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Demo Home controller. Received request', __filename);
            response.render('demoHome/index.html.ittf', {
                title: 'Hello demo home'
            });
        });
    }
}
exports.DemoHomeController = DemoHomeController;
//# sourceMappingURL=demoHome.js.map