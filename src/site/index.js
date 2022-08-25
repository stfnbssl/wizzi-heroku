"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteControllers = void 0;
const home_1 = require("./controllers/home");
const demoHome_1 = require("./controllers/demoHome");
const demoWizzi_1 = require("./controllers/demoWizzi");
const siteControllers = [
    new home_1.HomeController(),
    new demoHome_1.DemoHomeController(),
    new demoWizzi_1.DemoWizziController()
];
exports.siteControllers = siteControllers;
//# sourceMappingURL=index.js.map