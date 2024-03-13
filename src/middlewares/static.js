"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticFilesMiddleware = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\middlewares\static.ts.ittf
    utc time: Wed, 13 Mar 2024 06:11:37 GMT
*/
const path = tslib_1.__importStar(require("path"));
const express_1 = require("express");
const StaticFilesMiddleware = (app) => {
    console.log("[32m%s[0m", 'StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'public'));
    app.use('/public', (0, express_1.static)(path.resolve(__dirname, '..', '..', 'public')));
    console.log("[32m%s[0m", 'StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'ittf'));
    // simply browse ittfs when IttfDocumentsMiddleware is not used
    app.use('/ittf', (0, express_1.static)(path.resolve(__dirname, '..', '..', 'ittf')));
};
exports.StaticFilesMiddleware = StaticFilesMiddleware;
//# sourceMappingURL=static.js.map