"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizziViewEngineMiddleware = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\middlewares\wizziViewEngine.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const config_1 = require("../features/config");
const wizzi_1 = require("../features/wizzi");
const WizziViewEngineMiddleware = (app) => {
    app.engine('ittf', function (filePath, options, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const twinJsonContext = yield wizzi_1.wizziProds.inferAndLoadContextFs(filePath, 'wzCtx');
                const siteCtx = yield loadJsonIttfModel('sitectx.json.ittf');
                const context = Object.assign(Object.assign(Object.assign({}, options), { locals: options._locals, siteCtx }), twinJsonContext);
                console.log('WizziViewEngineMiddleware.filePath', filePath, __filename);
                console.log('WizziViewEngineMiddleware.options', JSON.stringify(options, null, 2), __filename);
                wizzi_1.wizziProds.generateArtifactFs(filePath, context).then((generated) => {
                    return callback(null, generated.artifactContent);
                }).catch((err) => {
                    console.log("[31m%s[0m", 'WizziViewEngineMiddleware. wizziProds.generateArtifactFs error', err);
                    return callback(err);
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
    console.log('WizziViewEngineMiddleware installed, on folder', viewsFolder, __filename);
};
exports.WizziViewEngineMiddleware = WizziViewEngineMiddleware;
function loadJsonIttfModel(relPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => wizzi_1.wizziProds.loadModelFs(path_1.default.join(config_1.config.ittfPath, 'models', relPath), {}).then(
        // log 'loadJsonIttfModel', model
        model => resolve(model)).catch(err => reject(err)));
    });
}
//# sourceMappingURL=wizziViewEngine.js.map