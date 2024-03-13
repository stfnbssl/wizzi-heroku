"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putIttfFileContentByHash = exports.getIttfFileContentByHash = void 0;
const tslib_1 = require("tslib");
const wizzi_utils_1 = require("wizzi-utils");
var fsfile = wizzi_utils_1.fSystem.vfile();
function getIttfFileContentByHash(hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const filePath = wizzi_utils_1.crypto.decrypt(hash);
            if (fsfile.isFile(filePath)) {
                return resolve({
                    content: fsfile.read(filePath)
                });
            }
            else {
                return reject({
                    message: 'Ittf document ' + filePath + ' not found'
                });
            }
        });
    });
}
exports.getIttfFileContentByHash = getIttfFileContentByHash;
function putIttfFileContentByHash(hash, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise(
        // loog 'putIttfFileContentByHash', hash, filePath
        (resolve, reject) => {
            var filePath = wizzi_utils_1.crypto.decrypt(hash);
            try {
                fsfile.write(filePath, content);
                return resolve({
                    message: 'Ittf document written succesfully'
                });
            }
            catch (ex) {
                return reject({
                    message: 'Error writing ittf document ' + filePath + '. Message: ' + ex.message
                });
            }
        });
    });
}
exports.putIttfFileContentByHash = putIttfFileContentByHash;
//# sourceMappingURL=byHash.js.map