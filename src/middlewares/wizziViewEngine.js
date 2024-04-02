"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizziViewEngineMiddleware = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\middlewares\wizziViewEngine.ts.ittf
    utc time: Tue, 02 Apr 2024 11:01:54 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const wizzi_1 = require("../features/wizzi");
const json_stringify_safe_1 = tslib_1.__importDefault(require("json-stringify-safe"));
const WizziViewEngineMiddleware = (app) => {
    app.engine('ittf', function (filePath, options, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const twinJsonContext = yield wizzi_1.wizziProds.inferAndLoadContextFs(filePath, 'wzCtx');
                var optionsLocals = Object.assign({}, options._locals);
                const context = Object.assign(Object.assign(Object.assign(Object.assign({}, options), { locals: optionsLocals }), twinJsonContext), { isWizziStudio: true });
                const siteCtx = yield wizzi_1.wizziProds.loadSiteJsonModel('sitectx.json.ittf', context);
                context.siteCtx = siteCtx;
                console.log('WizziViewEngineMiddleware.filePath', filePath);
                console.log('WizziViewEngineMiddleware.options', Object.keys(options));
                wizzi_1.wizziProds.generateArtifactFs(filePath, context).then((generated) => {
                    return callback(null, generated.artifactContent);
                }).catch((err) => {
                    console.log("[31m%s[0m", 'WizziViewEngineMiddleware. wizziProds.generateArtifactFs error', err);
                    return callback((0, json_stringify_safe_1.default)(err, null, 4));
                });
            }
            catch (ex) {
                console.log("[31m%s[0m", 'WizziViewEngineMiddleware. Exception', ex);
                callback(ex);
            }
        });
    });
    const viewsFolder = path_1.default.resolve(__dirname, '..', 'site', 'views');
    // specify the views directory
    app.set('views', viewsFolder);
    // register the template engine
    app.set('view engine', 'ittf');
    console.log('WizziViewEngineMiddleware installed, on folder', viewsFolder);
};
exports.WizziViewEngineMiddleware = WizziViewEngineMiddleware;
//# sourceMappingURL=wizziViewEngine.js.map