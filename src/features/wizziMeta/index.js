"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizziMetaApi = exports.wizziMetaControllers = exports.wizziMetaTypes = void 0;
const tslib_1 = require("tslib");
const wizziMetaTypes = tslib_1.__importStar(require("./types"));
exports.wizziMetaTypes = wizziMetaTypes;
const wizziMetaApi = tslib_1.__importStar(require("./api/wizziMeta"));
exports.wizziMetaApi = wizziMetaApi;
const apiv1wizzimeta_1 = require("./controllers/apiv1wizzimeta");
const wizziMetaControllers = [
    new apiv1wizzimeta_1.ApiV1WizziMetaController()
];
exports.wizziMetaControllers = wizziMetaControllers;
//# sourceMappingURL=index.js.map