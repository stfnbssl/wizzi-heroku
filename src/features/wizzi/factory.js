"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePackiFilePrefix = exports.extractGeneratedFiles = exports.createJsonFs = exports.createJsonFsAndFactory = exports.createFilesystemFactory = exports.packiFilesToJsonDocuments = void 0;
const tslib_1 = require("tslib");
const wizzi_1 = tslib_1.__importDefault(require("wizzi"));
const wizzi_repo_1 = require("wizzi-repo");
const env_1 = require("../config/env");
const config_1 = require("../config");
const wizziMaps = tslib_1.__importStar(require("./maps"));
const myname = 'features/wizzi/factory';
function packiFilesToJsonDocuments(files) {
    const jsonDocuments = [];
    Object.keys(files).map((value) => {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath,
                content: files[value].contents
            });
        }
    });
    return jsonDocuments;
}
exports.packiFilesToJsonDocuments = packiFilesToJsonDocuments;
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
                    'wizzi-core',
                    'wizzi-js',
                    'wizzi-web'
                ]
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
function createJsonFsAndFactory(files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const plugins = [];
        const jsonDocuments = [];
        Object.keys(files).map((value) => {
            if (files[value].type === 'CODE' && files[value].contents && files[value].contents.length > 0) {
                const filePath = ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath,
                    content: files[value].contents
                });
                const pluginList = wizziMaps.pluginsFor(filePath);
                pluginList.forEach((item) => {
                    if (plugins.indexOf(item) < 0) {
                        plugins.push(item);
                    }
                });
            }
        });
        return new Promise((resolve, reject) => wizzi_repo_1.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
            if (err) {
                return reject(err);
            }
            wizzi_1.default.jsonFactory({
                jsonFs,
                plugins: {
                    items: [
                        'wizzi-core',
                        'wizzi-js',
                        'wizzi-web'
                    ],
                    pluginsBaseFolder: ''
                }
            }, function (err, wf) {
                if (err) {
                    return reject(err);
                }
                resolve({
                    wf,
                    jsonFs
                });
            });
        }));
    });
}
exports.createJsonFsAndFactory = createJsonFsAndFactory;
function createJsonFs(files) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const jsonDocuments = [];
        Object.keys(files).map((value) => {
            if (files[value].type === 'CODE') {
                const filePath = ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath,
                    content: files[value].contents
                });
            }
        });
        return new Promise((resolve, reject) => wizzi_repo_1.JsonComponents.createJsonFs(jsonDocuments, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        }));
    });
}
exports.createJsonFs = createJsonFs;
function extractGeneratedFiles(jsonFs) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const files = {};
        return new Promise((resolve, reject) => jsonFs.toFiles({
            removeRoot: env_1.packiFilePrefix
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            result.forEach((value) => {
                if (value.relPath.endsWith('.ittf') == false) {
                    files[value.relPath] = {
                        type: 'CODE',
                        contents: value.content,
                        generated: true
                    };
                }
            });
            resolve(files);
        }));
    });
}
exports.extractGeneratedFiles = extractGeneratedFiles;
function ensurePackiFilePrefix(filePath) {
    var newFilePath = normalizePath(filePath);
    return newFilePath.startsWith(env_1.packiFilePrefix) ? newFilePath : env_1.packiFilePrefix + newFilePath;
}
exports.ensurePackiFilePrefix = ensurePackiFilePrefix;
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
//# sourceMappingURL=factory.js.map