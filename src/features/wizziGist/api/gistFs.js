"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putGistExecutable = exports.putGistFile = exports.getGistFile = exports.gistFileExists = exports.getGistFiles = exports.gistInfoByPath = exports.gistKindFromFilePath = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\wizziGist\api\gistFs.ts.ittf
    utc time: Wed, 03 Apr 2024 04:12:19 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("@wizzi/utils");
const config_1 = require("../../config");
const wizziFs = tslib_1.__importStar(require("../../../utils/wizziFs"));
var GIST_KINDS = ['gist', 'fragment', 'context'];
function isGistKind(kind) {
    return GIST_KINDS.indexOf(kind) > -1;
}
function normalize(filepath) {
    return utils_1.verify.replaceAll(filepath, '\\', '/');
}
const gistFolderNameFromKind = function (kind) {
    if (kind === 'gist') {
        return 'gists';
    }
    else if (kind === 'fragment') {
        return 'gists';
    }
    else if (kind === 'context') {
        return 'contexts';
    }
    else {
        return 'snippets';
    }
};
const gistKindFromFolderPath = function (folderParts) {
    console.log('gistKindFromFolderPath.folderParts', folderParts, __filename);
    if (folderParts.length == 3) {
        return 'fragment';
    }
    else {
        if (folderParts[0] === 'gists') {
            return 'gist';
        }
        else if (folderParts[0] === 'contexts') {
            return 'context';
        }
        else {
            return 'snippet';
        }
    }
};
const gistKindFromFilePath = function (filePath) {
    var dirname = path_1.default.dirname(filePath);
    var relFolder = normalize(dirname.substr(config_1.config.jobsBasePath.length + 1));
    console.log('gistKindFromFilePath.relFolder', relFolder, __filename);
    return gistKindFromFolderPath(relFolder.split('/'));
};
exports.gistKindFromFilePath = gistKindFromFilePath;
const gistsFolderPath = function (kind) {
    return path_1.default.join(config_1.config.jobsBasePath, gistFolderNameFromKind(kind));
};
const gistExecutablesFolderPath = function (kind) {
    return path_1.default.join(config_1.config.jobsBasePath, gistFolderNameFromKind(kind) + '_executables');
};
const gistFilePath = function (kind, name) {
    return path_1.default.join(gistsFolderPath(kind), name);
};
const gistExecutableFilePath = function (kind, name) {
    return path_1.default.join(gistExecutablesFolderPath(kind), name);
};
const gistInfoByPath = function (filePath) {
    return wizziFs.fileInfoByPath(filePath, gistsFolderPath("gist"));
};
exports.gistInfoByPath = gistInfoByPath;
function getGistFiles(kind) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (kind === 'snippet') {
            return new Promise((resolve, reject) => wizziFs.getFolderFiles(gistsFolderPath(kind), gistsFolderPath(kind), '/wizzi/' + kind + 's').then((snippets) => {
                return resolve({
                    data: {
                        snippets: snippets
                    }
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'gistFs.getGistFiles.getFolderFiles.snippets.error', err);
                return reject(err);
            }));
        }
        else {
            return new Promise((resolve, reject) => {
                var that = this;
                wizziFs.getFolderFiles(gistsFolderPath('gist'), gistsFolderPath('gist'), '/wizzi/gists').then((gists) => wizziFs.getFolderFiles(gistsFolderPath('fragment'), gistsFolderPath('fragment'), '/wizzi/fragments').then((fragments) => wizziFs.getFolderFiles(gistsFolderPath('context'), gistsFolderPath('context'), '/wizzi/contexts').then((contexts) => {
                    return resolve({
                        data: {
                            gists: gists.data.items,
                            fragments: fragments.data.items,
                            contexts: contexts.data.items
                        }
                    });
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'gistFs.getGistFiles.getFolderFiles.context.error', err);
                    return reject(err);
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'gistFs.getGistFiles.getFolderFiles.fragments.error', err);
                    return reject(err);
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'gistFs.getGistFiles.getFolderFiles.gists.error', err);
                    return reject(err);
                });
            });
        }
    });
}
exports.getGistFiles = getGistFiles;
function gistFileExists(kind, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return wizziFs.fsItemExists(gistFilePath(kind, name));
    });
}
exports.gistFileExists = gistFileExists;
function getGistFile(kind, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return wizziFs.readFsItem(gistFilePath(kind, name));
    });
}
exports.getGistFile = getGistFile;
function putGistFile(kind, name, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = gistFilePath(kind, name);
            wizziFs.writeFsItem(filePath, content).then(() => {
                var gist = gistInfoByPath(filePath);
                gist.content = content;
                return resolve({
                    data: {
                        gist: gist
                    }
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'gistFs.putGistFile.wizziFs.writeFsItem.error', err);
                return reject(err);
            });
        });
    });
}
exports.putGistFile = putGistFile;
function putGistExecutable(kind, filePath, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var name = path_1.default.basename(filePath);
            var executablePath = gistExecutableFilePath(kind, name);
            wizziFs.writeFsItem(executablePath, content).then((notUsed) => {
                return resolve({
                    executablePath: executablePath
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'gistFs.putGistExecutable.wizziFs.writeFsItem.error', err);
                return reject(err);
            });
        });
    });
}
exports.putGistExecutable = putGistExecutable;
//# sourceMappingURL=gistFs.js.map