"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilesystemFactory = void 0;
const tslib_1 = require("tslib");
const wizzi_1 = tslib_1.__importDefault(require("wizzi"));
const config_1 = require("../config");
const myname = 'features/wizzi/factory';
function createFilesystemFactory(globalContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const gc = {};
        if (config_1.config.isWizziDev) {
            gc['isWizziStudio'] = true;
        }
        return new Promise((resolve, reject) => wizzi_1.default.fsFactory({
            repo: {
                storeKind: "filesystem"
            },
            plugins: {
                items: [
                    './wizzi-core/index.js',
                    './wizzi-js/index.js',
                    './wizzi-web/index.js',
                    './wizzi-meta/index.js'
                ],
                pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages'
            },
            globalContext: Object.assign({}, gc, globalContext || {})
        }, function (err, wf) {
            if (err) {
                return reject(err);
            }
            resolve(wf);
        }));
    });
}
exports.createFilesystemFactory = createFilesystemFactory;
//# sourceMappingURL=factory.js.map