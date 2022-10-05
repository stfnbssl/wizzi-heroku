"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoWizziController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\demoWizzi.ts.ittf
*/
const express_1 = require("express");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils");
function makeHandlerAwareOfAsyncErrors(handler) {
    return function (request, response, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(request, response, next);
            }
            catch (error) {
                if (error instanceof error_1.FcError) {
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: error.code,
                        message: error.message,
                        data: error.data || {}
                    });
                }
                else {
                    const fcError = new error_1.FcError(error_1.SYSTEM_ERROR);
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: fcError.code,
                        message: error.message,
                        data: fcError.data || {}
                    });
                }
            }
        });
    };
}
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