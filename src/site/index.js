"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteControllers = void 0;
const home_1 = require("./controllers/home");
const demoHome_1 = require("./controllers/demoHome");
const wizziDocs_1 = require("./controllers/wizziDocs");
const siteControllers = [
    new home_1.HomeController(),
    new demoHome_1.DemoHomeController(),
    new wizziDocs_1.DocsController()
];
exports.siteControllers = siteControllers;
//# sourceMappingURL=index.js.map