"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteControllers = void 0;
const home_1 = require("./controllers/home");
const account_1 = require("./controllers/account");
const auth_1 = require("./controllers/auth");
const docs_1 = require("./controllers/docs");
const productions_1 = require("./controllers/productions");
const siteControllers = [
    new home_1.HomeController(),
    new account_1.AccountController(),
    new auth_1.AuthController(),
    new docs_1.DocsController(),
    new productions_1.ProductionsController()
];
exports.siteControllers = siteControllers;
//# sourceMappingURL=index.js.map