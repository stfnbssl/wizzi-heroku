"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddlewares = exports.commonTypes = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\common\index.ts.ittf
    utc time: Sat, 06 Apr 2024 12:40:00 GMT
*/
const commonTypes = tslib_1.__importStar(require("./types"));
exports.commonTypes = commonTypes;
const body_validation_1 = tslib_1.__importDefault(require("./middlewares/body.validation"));
const commonMiddlewares = {
    BodyValidationMiddleware: body_validation_1.default
};
exports.commonMiddlewares = commonMiddlewares;
//# sourceMappingURL=index.js.map