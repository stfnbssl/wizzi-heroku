"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizziControllers = exports.wizziMaps = exports.WizziFactory = exports.wizziProds = exports.wizziTypes = void 0;
const tslib_1 = require("tslib");
const wizziTypes = tslib_1.__importStar(require("./types"));
exports.wizziTypes = wizziTypes;
const WizziFactory = tslib_1.__importStar(require("./factory"));
exports.WizziFactory = WizziFactory;
const wizziProds = tslib_1.__importStar(require("./productions"));
exports.wizziProds = wizziProds;
const wizziMaps = tslib_1.__importStar(require("./maps"));
exports.wizziMaps = wizziMaps;
const production_1 = require("./controllers/production");
const wizziControllers = [
    new production_1.ProductionController()
];
exports.wizziControllers = wizziControllers;
//# sourceMappingURL=index.js.map