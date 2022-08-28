"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheatsheetApi = exports.docsControllers = exports.docsTypes = void 0;
const tslib_1 = require("tslib");
const docsTypes = tslib_1.__importStar(require("./types"));
exports.docsTypes = docsTypes;
const cheatsheetApi = tslib_1.__importStar(require("./api/cheatsheet"));
exports.cheatsheetApi = cheatsheetApi;
const apiv1cheatsheet_1 = require("./controllers/apiv1cheatsheet");
const docsControllers = [
    new apiv1cheatsheet_1.ApiV1CheatsheetController()
];
exports.docsControllers = docsControllers;
//# sourceMappingURL=index.js.map