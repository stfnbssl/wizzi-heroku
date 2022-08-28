"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteControllers = void 0;
const home_1 = require("./controllers/home");
const account_1 = require("./controllers/account");
const docs_1 = require("./controllers/docs");
const siteControllers = [
    new home_1.HomeController(),
    new account_1.AccountController(),
    new docs_1.DocsController()
];
exports.siteControllers = siteControllers;
//# sourceMappingURL=index.js.map