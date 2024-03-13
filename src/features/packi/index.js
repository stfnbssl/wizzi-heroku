"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packiControllers = exports.PackiBuilder = exports.packiTypes = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\packi\index.ts.ittf
    utc time: Wed, 13 Mar 2024 06:11:37 GMT
*/
const packiTypes = tslib_1.__importStar(require("./types"));
exports.packiTypes = packiTypes;
const PackiBuilder_1 = require("./api/PackiBuilder");
Object.defineProperty(exports, "PackiBuilder", { enumerable: true, get: function () { return PackiBuilder_1.PackiBuilder; } });
const packiEditing_1 = require("./controllers/packiEditing");
const packiGenerating_1 = require("./controllers/packiGenerating");
const productions_1 = require("./controllers/productions");
const packiControllers = [
    new packiEditing_1.PackiEditingController(),
    new packiGenerating_1.PackiGeneratingController(),
    new productions_1.ProductionsController()
];
exports.packiControllers = packiControllers;
//# sourceMappingURL=index.js.map