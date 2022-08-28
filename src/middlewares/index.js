"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0Secured = exports.appMiddlewaresPost = exports.appMiddlewaresPre = void 0;
const tslib_1 = require("tslib");
const cors_1 = require("./cors");
const session_1 = require("./session");
const ittfStatic_1 = require("./ittfStatic");
const bodyParser_1 = require("./bodyParser");
const cacheControl_1 = require("./cacheControl");
const userInViews_1 = require("./userInViews");
const static_1 = require("./static");
const wizziViewEngine_1 = require("./wizziViewEngine");
const appMiddlewaresPre = [
    cors_1.CorsMiddleware,
    session_1.SessionMiddleware,
    ittfStatic_1.IttfStaticMiddleware,
    bodyParser_1.BodyParserMiddleware,
    cacheControl_1.CacheControlMiddleware,
    userInViews_1.UserInViewMiddleware,
    static_1.StaticFilesMiddleware,
    wizziViewEngine_1.WizziViewEngineMiddleware
];
exports.appMiddlewaresPre = appMiddlewaresPre;
const appMiddlewaresPost = [];
exports.appMiddlewaresPost = appMiddlewaresPost;
const auth0Secured_1 = tslib_1.__importDefault(require("./auth0Secured"));
exports.auth0Secured = auth0Secured_1.default;
//# sourceMappingURL=index.js.map