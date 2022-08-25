"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParserMiddleware = void 0;
const tslib_1 = require("tslib");
const bodyParser = tslib_1.__importStar(require("body-parser"));
// Node.js request body parsing middleware which parses the incoming request body before your handlers,
// and make it available under req.body property. It simplifies the incoming request.
const BodyParserMiddleware = (app) => {
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    console.log("[32m%s[0m", 'BodyParserMiddleware installed');
};
exports.BodyParserMiddleware = BodyParserMiddleware;
//# sourceMappingURL=bodyParser.js.map