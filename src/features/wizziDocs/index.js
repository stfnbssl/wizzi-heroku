"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheatsheetApi = exports.wizziDocsControllers = exports.wizziDocsTypes = void 0;
const tslib_1 = require("tslib");
const wizziDocsTypes = tslib_1.__importStar(require("./types"));
exports.wizziDocsTypes = wizziDocsTypes;
const cheatsheetApi = tslib_1.__importStar(require("./api/cheatsheet"));
exports.cheatsheetApi = cheatsheetApi;
const apiv1cheatsheet_1 = require("./controllers/apiv1cheatsheet");
const wizziDocsControllers = [
    new apiv1cheatsheet_1.ApiV1CheatsheetController()
];
exports.wizziDocsControllers = wizziDocsControllers;
//# sourceMappingURL=index.js.map