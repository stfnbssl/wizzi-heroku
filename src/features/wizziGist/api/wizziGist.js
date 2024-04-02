"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGist = exports.renameGist = exports.duplicateGist = exports.deleteGist = exports.updateGist = exports.createGist = exports.getGistList = exports.getGist = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\wizziGist\api\wizziGist.ts.ittf
    utc time: Tue, 02 Apr 2024 11:34:36 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("@wizzi/utils");
const gistFs = tslib_1.__importStar(require("./gistFs"));
const wizziFs = tslib_1.__importStar(require("../../../utils/wizziFs"));
const scriptManager = tslib_1.__importStar(require("../../../utils/scripts/scriptManager"));
const wizzi_1 = require("../../wizzi");
var fsfile = utils_1.fSystem.vfile();
var GIST_KINDS = ['gist', 'fragment', 'context'];
function isGistKind(kind) {
    return GIST_KINDS.indexOf(kind) > -1;
}
function getGistList(kind) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'wizziGist.api.getGistList.kind', kind
        (resolve, reject) => gistFs.getGistFiles(kind).then((result) => {
            var dummy = '';
            if (isGistKind(kind)) {
                return resolve({
                    message: 'Got ' + kind + ' files',
                    data: {
                        gists: result.data.gists,
                        fragments: result.data.fragments,
                        contexts: result.data.contexts
                    }
                });
            }
            else {
                return resolve({
                    message: "Got snippet files",
                    data: {
                        snippets: result.data.items
                    }
                });
            }
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'wizziGist.getGistList.gistFs.getGistFiles.error', err);
            return reject(err);
        }));
    });
}
exports.getGistList = getGistList;
function createGist(kind, name, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var fullName = name;
            var content = '';
            if (schema) {
                if (isGistKind(kind)) {
                    fullName = name + '.' + schema + '.ittf';
                }
                else {
                    fullName = name + '.' + schema;
                }
                if (schema === 'js') {
                    if (isGistKind(kind)) {
                        if (kind === 'gist' || kind === 'context') {
                            content = [
                                'module',
                                '\tkind jsfile',
                                '\t_ go',
                                '\t\t@ "stefi"',
                                '\tfunction go',
                                '\t\tparam p1',
                                '\t\tlog "Hello " + p1'
                            ].join('\n');
                        }
                        else {
                            content = [
                                '$group',
                                '\t$params p1, p2|@@null',
                                '\t'
                            ].join('\n');
                        }
                    }
                    else {
                        content = [
                            'go("stefi")',
                            'function go(p1) {',
                            '\tconsole.log("Hello " + p1);',
                            '}'
                        ].join('\n');
                    }
                }
            }
            gistFs.gistFileExists(kind, fullName).then((result) => {
                if (result) {
                    return reject(kind + ' ' + fullName + ' already exists');
                }
                gistFs.putGistFile(kind, fullName, content).then((putResult) => getGistList(kind).then((result) => {
                    if (isGistKind(kind)) {
                        return resolve({
                            message: kind + ' created',
                            data: {
                                gists: result.data.gists,
                                gist: putResult.data.gist
                            }
                        });
                    }
                    // BEWARE! putGistFile result.data contains 'gist' property
                    else {
                        return resolve({
                            message: 'Snippet created',
                            data: {
                                snippets: result.data.snippets,
                                snippet: putResult.data.gist
                            }
                        });
                    }
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'wizziGist.createGist.getGistList.error', err);
                    return reject(err);
                })).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'wizziGist.createGist.putGistFile.error', err);
                    return reject(err);
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.createGist.gistFileExists.error', err);
                return reject(err);
            });
        });
    });
}
exports.createGist = createGist;
function updateGist(hash, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var name = path_1.default.basename(filePath);
            var kind = gistFs.gistKindFromFilePath(filePath);
            console.log('updateGist.kind', kind, 'name', name, 'filePath', filePath, __filename);
            gistFs.putGistFile(kind, name, content).then((result) => {
                return resolve({
                    message: kind + ' updated',
                    data: {
                        gist: result
                    }
                });
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.updateGist.gistFs.putFile.error', err);
                return reject(err);
            });
        });
    });
}
exports.updateGist = updateGist;
function deleteGist(hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var kind = gistFs.gistKindFromFilePath(filePath);
            wizziFs.deleteFsItem(filePath).then((result) => getGistList(kind).then((result) => {
                if (isGistKind(kind)) {
                    return resolve({
                        message: kind + ' deleted',
                        data: {
                            gists: result.data.gists
                        }
                    });
                }
                else {
                    return resolve({
                        message: 'Snippet deleted',
                        data: {
                            gists: result.data.snippets
                        }
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.deleteGist.getGistList.error', err);
                return reject(err);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.deleteGist.gistFs.deleteFile.error', err);
                return reject(err);
            });
        });
    });
}
exports.deleteGist = deleteGist;
function duplicateGist(hash, newname) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var kind = gistFs.gistKindFromFilePath(filePath);
            wizziFs.duplicateFsItem(filePath, path_1.default.join(path_1.default.dirname(filePath), newname)).then((result) => getGistList(kind).then((result) => {
                if (isGistKind(kind)) {
                    return resolve({
                        message: kind + ' duplicated',
                        data: {
                            gists: result.data.gists
                        }
                    });
                }
                else {
                    return resolve({
                        message: 'Snippet duplicated',
                        data: {
                            gists: result.data.snippets
                        }
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.duplicateGist.getGistList.error', err);
                return reject(err);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.duplicateGist.wizziFs.duplicateFsItem.error', err);
                return reject(err);
            });
        });
    });
}
exports.duplicateGist = duplicateGist;
function renameGist(hash, newname) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var kind = gistFs.gistKindFromFilePath(filePath);
            wizziFs.renameFsItem(filePath, path_1.default.join(path_1.default.dirname(filePath), newname)).then((result) => getGistList(kind).then((result) => {
                if (isGistKind(kind)) {
                    return resolve({
                        message: kind + ' renamed',
                        data: {
                            gists: result.data.gists
                        }
                    });
                }
                else {
                    return resolve({
                        message: 'Snippet renamed',
                        data: {
                            snippets: result.data.snippets
                        }
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.renameGist.getGistList.error', err);
                return reject(err);
            })).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'wizziGist.renameGist.wizziFs.renameFsItem.error', err);
                return reject(err);
            });
        });
    });
}
exports.renameGist = renameGist;
function getGist(hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var kind = gistFs.gistKindFromFilePath(filePath);
            var gist = gistFs.gistInfoByPath(filePath);
            wizziFs.readFsItem(filePath).then((result) => {
                gist.content = result;
                if (isGistKind(kind)) {
                    return resolve({
                        data: {
                            gist: gist
                        }
                    });
                }
                else {
                    return resolve({
                        data: {
                            snippet: gist
                        }
                    });
                }
            }).catch((err) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'gistFs.getGist.wizziFs.getFile.error', err);
                return reject(err);
            });
        });
    });
}
exports.getGist = getGist;
function executeGist(hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var filePath = utils_1.crypto.decrypt(hash);
            var kind = gistFs.gistKindFromFilePath(filePath);
            var fileInfo = gistFs.gistInfoByPath(filePath);
            if (fileInfo.isIttfDocument && fileInfo.schema === 'js') {
                var sessionData = {};
                var modelContext = {};
                var artifactContext = {};
                var that = this;
                wizzi_1.wizziProds.generateArtifactFs(filePath, modelContext, {
                    generator: 'js/module',
                    artifactContext
                }).then((result) => {
                    console.log('wizziProds.generateArtifactFs.result', result, __filename);
                    gistFs.putGistExecutable(kind, filePath, result.artifactContent).then((result) => executeNodeJsGist(hash, result.executablePath).then((result) => {
                        return resolve(result);
                    }).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'gistFs.executeGist.executeNodeJsGist.error', err);
                        return reject(err);
                    })).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'gistFs.executeGist.gistFs.putGistExecutable.error', err);
                        return reject(err);
                    });
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'gistFs.executeGist.wizziProds.generateArtifactFs.error', err);
                    return reject(err);
                });
            }
            else if (fileInfo.mime === 'js') {
                executeNodeJsGist(hash, filePath).then((result) => {
                    return resolve(result);
                }).catch((err) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'gistFs.executeGist.executeNodeJsGist.error', err);
                    return reject(err);
                });
            }
            else {
                return reject({
                    message: 'Mime not managed ' + fileInfo.mime
                });
            }
        });
    });
}
exports.executeGist = executeGist;
function executeNodeJsGist(hash, executablePath, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (response) {
                try {
                    console.log('execute nodeJsExecToEventStream', __filename);
                    scriptManager.nodeJsExecToEventStream({
                        scriptPath: executablePath,
                        args: []
                    }, response).then((result) => {
                        return resolve(result);
                    }).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'gistFs.executeNodeJsGist.scriptManager.nodeJsExecToEventStream.error', err);
                        return reject(err);
                    });
                }
                catch (ex) {
                    return reject(ex);
                }
            }
            else {
                console.log('execute nodeJsExec', __filename);
                try {
                    scriptManager.nodeJsExec({
                        scriptPath: executablePath,
                        args: []
                    }).then((result) => {
                        return resolve({
                            data: result,
                            message: 'NodeJs script executed'
                        });
                    }).catch((err) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'gistFs.executeNodeJsGist.scriptManager.nodeJsExec.error', err);
                        return reject(err);
                    });
                }
                catch (ex) {
                    return reject(ex);
                }
            }
        });
    });
}
//# sourceMappingURL=wizziGist.js.map