"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMetaProduction = void 0;
const tslib_1 = require("tslib");
const wizzi_utils_1 = require("wizzi-utils");
const wizzi_1 = require("../../wizzi");
const file = wizzi_utils_1.fSystem.vfile();
function executeMetaProduction(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            console.log('wizziMeta.executeMetaProduction.options', options, __filename);
            createMetaCtx(options).then((metaCtx) => {
                console.log('wizziMeta.createWizziPackage.metaCtx', metaCtx, __filename);
                var pluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.plugins/packages';
                var metaPluginsBaseFolder = 'C:/My/wizzi/stfnbssl/wizzi.metas/packages';
                var globalContext = {};
                wizzi_1.wizziProds.metaGenerate(metaCtx, {
                    items: [
                        '@wizzi/plugin.ittf',
                        '@wizzi/plugin.json'
                    ],
                    pluginsBaseFolder: ""
                }, {
                    items: [
                        '@wizzi/meta.cloud',
                        '@wizzi/meta.commons',
                        '@wizzi/meta.docs',
                        '@wizzi/meta.js',
                        '@wizzi/meta.ts',
                        '@wizzi/meta.ts.express',
                        '@wizzi/meta.ts.db',
                        '@wizzi/meta.web',
                        '@wizzi/meta.wizzi'
                    ],
                    metaPluginsBaseFolder: ""
                }, globalContext).then((packiFiles) => {
                    return persistPackageFiles(packiFiles, options);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.persistPackageFiles.error', err);
                    return reject(err);
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziMeta.executeMetaProduction.createMetaCtx.error', err);
                return reject(err);
            });
        });
    });
}
exports.executeMetaProduction = executeMetaProduction;
function createMetaCtx(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (options.metaCtx) {
                return resolve(options.metaCtx);
            }
            if (wizzi_utils_1.verify.isEmpty(options.metaCtxFilepath)) {
                return reject('wizziMeta.createMetaCtx. Missing both metaCtx and metaCtxFilepath: ' + options.metaCtxFilepath);
            }
            console.log('createMetaCtx.options.metaCtxFilepath', options.metaCtxFilepath, __filename);
            wizzi_1.wizziProds.loadModelFs(options.metaCtxFilepath, {
                metaCtx: {
                    pkgName: options.outputPackageName,
                    description: options.description || options.outputPackageName
                }
            }).then((metaCtx) => {
                return resolve(metaCtx);
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziMeta.createMetaCtx.error', err);
                return reject(err);
            });
        });
    });
}
function persistPackageFiles(packiFiles, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (options.persist) {
                // TODO
                if (options.persist.type == 'filesystem') {
                    return resolve(packiFiles);
                }
                else {
                    return reject('wizziMeta.persistPackageFiles. Unknown persist type: ' + options.persist.type);
                }
            }
            else {
                return resolve(packiFiles);
            }
        });
    });
}
//# sourceMappingURL=wizziMeta.js.map