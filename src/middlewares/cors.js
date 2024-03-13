"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const CorsMiddleware = (app) => {
    app.options('*', (0, cors_1.default)());
    app.use((0, cors_1.default)());
    console.log("[32m%s[0m", 'CorsMiddleware installed.');
};
exports.CorsMiddleware = CorsMiddleware;
//# sourceMappingURL=cors.js.map