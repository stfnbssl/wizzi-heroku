"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSecured = exports.webSecured = exports.appMiddlewaresPost = exports.appMiddlewaresPre = void 0;
const tslib_1 = require("tslib");
const cors_1 = require("./cors");
const session_1 = require("./session");
const ittfStatic_1 = require("./ittfStatic");
const packiBrowse_1 = require("./packiBrowse");
const bodyParser_1 = require("./bodyParser");
const cacheControl_1 = require("./cacheControl");
const userInViews_1 = require("./userInViews");
const static_1 = require("./static");
const wizziViewEngine_1 = require("./wizziViewEngine");
const appMiddlewaresPre = [
    cors_1.CorsMiddleware,
    session_1.SessionMiddleware,
    ittfStatic_1.IttfStaticMiddleware,
    packiBrowse_1.PackiBrowseMiddleware,
    bodyParser_1.BodyParserMiddleware,
    cacheControl_1.CacheControlMiddleware,
    userInViews_1.UserInViewMiddleware,
    static_1.StaticFilesMiddleware,
    wizziViewEngine_1.WizziViewEngineMiddleware
];
exports.appMiddlewaresPre = appMiddlewaresPre;
const appMiddlewaresPost = [];
exports.appMiddlewaresPost = appMiddlewaresPost;
const webSecured_1 = tslib_1.__importDefault(require("./webSecured"));
exports.webSecured = webSecured_1.default;
const apiSecured_1 = tslib_1.__importDefault(require("./apiSecured"));
exports.apiSecured = apiSecured_1.default;
//# sourceMappingURL=index.js.map