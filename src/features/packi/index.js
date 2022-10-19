"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packiControllers = exports.packiTypes = exports.PackiBuilder = void 0;
const tslib_1 = require("tslib");
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