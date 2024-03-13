"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoHomeController = void 0;
const tslib_1 = require("tslib");
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
class DemoHomeController {
    constructor() {
        this.path = '/demo/home';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering DemoHomeController.initialize');
            this.router.get(`/`, this.home);
        };
        this.home = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return response.render('demoHome/index.html.ittf', {
                title: 'Hello demo home'
            });
        });
    }
}
exports.DemoHomeController = DemoHomeController;
//# sourceMappingURL=demoHome.js.map