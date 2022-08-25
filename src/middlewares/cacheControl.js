"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheControlMiddleware = void 0;
const index_1 = require("../features/config/index");
const CacheControlMiddleware = (app) => {
    if (index_1.config.noCache) {
        app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store');
            next();
        });
        console.log("[32m%s[0m", 'CacheControlMiddleware installed');
    }
};
exports.CacheControlMiddleware = CacheControlMiddleware;
//# sourceMappingURL=cacheControl.js.map