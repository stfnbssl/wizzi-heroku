"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;
const tslib_1 = require("tslib");
const index_1 = require("./features/config/index");
const mongodb_1 = require("./services/mongodb");
const index_2 = require("./site/index");
const index_3 = require("./features/blog/index");
const index_4 = require("./middlewares/index");
const App_1 = tslib_1.__importDefault(require("./App"));
var app = {
    instance: null
};
function start() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let modelBuilders = [
            ...index_3.blogModelBuilders
        ];
        yield (0, mongodb_1.mongodbStart)(index_1.config, modelBuilders);
        let middlewaresPre = [
            ...index_4.appMiddlewaresPre
        ];
        let middlewaresPost = [
            ...index_4.appMiddlewaresPost
        ];
        let apis = [];
        let controllers = [
            ...index_2.siteControllers,
            ...index_3.blogControllers
        ];
        console.log("[33m%s[0m", 'Starting app. Config:', index_1.config);
        const appInitializer = {
            config: index_1.config,
            middlewaresPre,
            globalApi: {},
            apis,
            controllers,
            middlewaresPost
        };
        app.instance = new App_1.default(appInitializer);
        app.instance.listen();
    });
}
try {
    start();
}
catch (ex) {
    console.log(ex, __filename);
}
function close(done) {
    try {
        console.log(`Index closing.`);
        console.log(`app.instance.close:${app.instance.close}`);
        app.instance.close(() => done());
    }
    catch (ex) {
        console.log("[31m%s[0m", 'index.close. Exception:', ex);
        done();
    }
}
exports.close = close;
//# sourceMappingURL=index.js.map