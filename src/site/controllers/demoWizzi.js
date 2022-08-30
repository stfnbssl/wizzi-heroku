"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoWizziController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\site\controllers\demoWizzi.ts.ittf
*/
const express_1 = require("express");
class DemoWizziController {
    constructor() {
        this.path = '/demo/wizzi';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering DemoWizziController.initialize');
            this.router.get(`/`, this.index);
            this.router.post(`${this.path}/alpha/:id`, this.test);
        };
        this.index = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('demoWizzi/index.html.ittf', {
                title: 'Hello demo wizzi'
            });
        });
        this.test = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('demoWizzi/index.html.ittf', {
                title: 'Wizzi section: ' + request.params.id
            });
        });
    }
}
exports.DemoWizziController = DemoWizziController;
//# sourceMappingURL=demoWizzi.js.map