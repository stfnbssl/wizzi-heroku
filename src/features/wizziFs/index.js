"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizziFsApi = exports.wizziFsControllers = exports.wizziFsTypes = void 0;
const tslib_1 = require("tslib");
const wizziFsTypes = tslib_1.__importStar(require("./types"));
exports.wizziFsTypes = wizziFsTypes;
const apis = tslib_1.__importStar(require("./api/wizziFs"));
const byHash = tslib_1.__importStar(require("./api/byHash"));
const apiv1wizzifs_1 = require("./controllers/apiv1wizzifs");
const wizziFsControllers = [
    new apiv1wizzifs_1.ApiV1WizziFsController()
];
exports.wizziFsControllers = wizziFsControllers;
const wizziFsApi = Object.assign(Object.assign({}, apis), byHash);
exports.wizziFsApi = wizziFsApi;
//# sourceMappingURL=index.js.map