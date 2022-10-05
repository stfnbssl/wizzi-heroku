"use strict";
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\github\index.ts.ittf
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubControllers = exports.githubUtils = exports.githubApiCalls = exports.githubTypes = void 0;
const tslib_1 = require("tslib");
const apiv1repo_1 = require("./controllers/apiv1repo");
const githubTypes = tslib_1.__importStar(require("./types"));
exports.githubTypes = githubTypes;
const githubUtils = tslib_1.__importStar(require("./utils"));
exports.githubUtils = githubUtils;
const githubApiCalls = tslib_1.__importStar(require("./api/repo"));
exports.githubApiCalls = githubApiCalls;
const githubControllers = [
    new apiv1repo_1.ApiV1RepoController()
];
exports.githubControllers = githubControllers;
//# sourceMappingURL=index.js.map