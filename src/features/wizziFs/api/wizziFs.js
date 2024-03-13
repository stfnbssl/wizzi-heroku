"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putIttfDocument = exports.getIttfDocument = void 0;
const tslib_1 = require("tslib");
const wizzi_utils_1 = require("wizzi-utils");
const byHash_1 = require("./byHash");
var fsfile = wizzi_utils_1.fSystem.vfile();
function getIttfDocument(hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => (0, byHash_1.getIttfFileContentByHash)(hash).then((ittf) => {
            return resolve({
                content: ittf.content
            });
        }).catch((error) => {
            return reject({
                message: "Error retrieving Ittf Document",
                error
            });
        }));
    });
}
exports.getIttfDocument = getIttfDocument;
function putIttfDocument(hash, content, prettify) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => (0, byHash_1.putIttfFileContentByHash)(hash, content).then((ittf) => {
            if (prettify) {
                wizzi_utils_1.pretty.prettifyIttfHtmlFromString(content, (err, prettified) => {
                    if (err) {
                        return resolve({
                            data: {
                                pretty: null
                            }
                        });
                    }
                    else {
                        return resolve({
                            data: {
                                pretty: prettified
                            },
                            message: 'Ittf Document written'
                        });
                    }
                });
            }
            else {
                resolve({
                    data: {
                        pretty: null
                    },
                    message: 'Ittf Document written'
                });
            }
        }).catch((error) => {
            return reject({
                message: "Error writing Ittf Document",
                error
            });
        }));
    });
}
exports.putIttfDocument = putIttfDocument;
//# sourceMappingURL=wizziFs.js.map