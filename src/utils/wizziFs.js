"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFsItem = exports.duplicateFsItem = exports.deleteFsItem = exports.writeJsonObject = exports.writeFsItem = exports.readJsonObject = exports.readFsItem = exports.fsItemExists = exports.getIttfFilesOfSchema = exports.getFolderFiles = exports.fileInfoByPath = exports.joinPathFromArray = exports.normalize = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\utils\wizziFs.ts.ittf
    utc time: Wed, 13 Mar 2024 05:51:46 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("@wizzi/utils");
const functionWrappers_1 = require("./functionWrappers");
const normalize = (filepath) => {
    return utils_1.verify.replaceAll(filepath, '\\', '/');
};
exports.normalize = normalize;
const file = utils_1.fSystem.vfile();
const promiseFileExists = (0, functionWrappers_1.promisify)(file.exists, file);
const promiseFileRead = (0, functionWrappers_1.promisify)(file.read, file);
const promiseFileWrite = (0, functionWrappers_1.promisify)(file.write, file);
// TODO const promiseFileRename = promisify(file.rename, file)
const promiseFileDelete = (0, functionWrappers_1.promisify)(file.unlink, file);
const promiseFileDuplicate = (0, functionWrappers_1.promisify)(file.copyFile, file);
const joinPathFromArray = (segments) => {
    var ret = segments[0];
    for (var i = 1; i < segments.length; i++) {
        ret = path_1.default.join(ret, segments[i]);
    }
    return ret;
};
exports.joinPathFromArray = joinPathFromArray;
const fileInfoByPath = (filePath, baseFolder, baseUri) => {
    filePath = (0, exports.normalize)(filePath);
    baseFolder = (0, exports.normalize)(baseFolder);
    var basename = path_1.default.basename(filePath);
    var dirname = path_1.default.dirname(filePath);
    var relFolder = path_1.default.dirname(filePath).length > baseFolder.length ? path_1.default.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr(baseFolder.length);
    var ss = basename.split('.');
    if (ss[ss.length - 1] === 'ittf') {
        return {
            uri: (baseUri || '') + fileUri,
            name: ss.slice(0, ss.length - 2).join('.'),
            basename: basename,
            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename),
            isIttfDocument: true,
            isFragment: filePath.indexOf('/t/') > -1,
            schema: ss[ss.length - 2],
            mime: ss[ss.length - 2],
            relFolder: relFolder,
            fullPath: filePath,
            hash: utils_1.crypto.encrypt(filePath),
            content: undefined
        };
    }
    else {
        return {
            uri: fileUri,
            name: ss.slice(0, ss.length - 1).join('.'),
            basename: basename,
            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename),
            isIttfDocument: false,
            schema: null,
            mime: ss[ss.length - 1],
            relFolder: relFolder,
            fullPath: filePath,
            hash: utils_1.crypto.encrypt(filePath),
            content: undefined
        };
    }
};
exports.fileInfoByPath = fileInfoByPath;
function getFolderFiles(folderPath, baseFolderPath, baseUri) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'wizzi-studio.apis.gists.getFolderFiles', glob, files
        (resolve, reject) => {
            if (typeof baseUri === 'undefined') {
                baseUri = '';
            }
            var glob = (0, exports.normalize)(folderPath) + '/*.*';
            var files = file.glob(glob);
            var ret = [];
            var i, i_items = files, i_len = files.length, item;
            for (i = 0; i < i_len; i++) {
                item = files[i];
                ret.push((0, exports.fileInfoByPath)(item, baseFolderPath, baseUri));
            }
            return resolve({
                data: {
                    items: ret
                },
                message: "Got folder files"
            });
        });
    });
}
exports.getFolderFiles = getFolderFiles;
function getIttfFilesOfSchema(folderPath, schemaName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'getFolderIttfFiles', glob, schemaName, files
        (resolve, reject) => {
            var suffix = '.' + schemaName + '.ittf';
            var glob = (0, exports.normalize)(folderPath) + '/*.' + schemaName + '.ittf';
            var files = file.glob(glob);
            var ret = [];
            var i, i_items = files, i_len = files.length, item;
            for (i = 0; i < i_len; i++) {
                item = files[i];
                var dirName = path_1.default.dirname(item);
                var baseName = path_1.default.basename(item);
                var name = baseName.substring(0, baseName.length - suffix.length);
                ret.push({
                    name: name,
                    baseName: baseName,
                    dirName: dirName,
                    fullPath: (0, exports.normalize)(path_1.default.join(dirName, path_1.default.basename(item)))
                });
            }
            return resolve(ret);
        });
    });
}
exports.getIttfFilesOfSchema = getIttfFilesOfSchema;
function fsItemExists(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileExists(filePath);
    });
}
exports.fsItemExists = fsItemExists;
function readFsItem(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileRead(filePath);
    });
}
exports.readFsItem = readFsItem;
function readJsonObject(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => promiseFileRead(filePath).then((content) => {
            return resolve(JSON.parse(content));
        }));
    });
}
exports.readJsonObject = readJsonObject;
function writeFsItem(filePath, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileWrite(filePath, content);
    });
}
exports.writeFsItem = writeFsItem;
function writeJsonObject(filePath, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileWrite(filePath, JSON.stringify(content, null, 2));
    });
}
exports.writeJsonObject = writeJsonObject;
function deleteFsItem(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileDelete(filePath);
    });
}
exports.deleteFsItem = deleteFsItem;
function duplicateFsItem(itemPath, newPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promiseFileDuplicate(itemPath, newPath);
    });
}
exports.duplicateFsItem = duplicateFsItem;
function renameFsItem(oldPath, newPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw new Error("wizziFs.renameFsItem not implemented");
    });
}
exports.renameFsItem = renameFsItem;
//# sourceMappingURL=wizziFs.js.map