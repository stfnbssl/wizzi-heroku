"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiV1CheatsheetController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\docs\controllers\apiv1cheatsheet.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../../utils/sendResponse");
const cheatsheet_1 = require("../api/cheatsheet");
const myname = 'features/docs/controllers/apiv1cheatsheet';
class ApiV1CheatsheetController {
    constructor() {
        this.path = '/api/v1/docs/cheatsheet';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering ApiV1CheatsheetController.initialize');
            this.router.get('/:name', this.getCheatsheet);
        };
        this.getCheatsheet = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getCheatsheet.request.params', request.params, __filename);
            (0, cheatsheet_1.getCheatsheet)(request.params.name).then((result) => (0, sendResponse_1.sendSuccess)(response, result)).catch((err) => {
                console.log('ApiV1Cheatsheet.getCheatsheet.error', err, __filename);
                (0, sendResponse_1.sendFailure)(response, {
                    err: err
                }, 501);
            });
        });
    }
}
exports.ApiV1CheatsheetController = ApiV1CheatsheetController;
//# sourceMappingURL=apiv1cheatsheet.js.map