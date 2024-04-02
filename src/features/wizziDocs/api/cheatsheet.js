"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheatsheet = exports.getCheatsheetList = void 0;
const tslib_1 = require("tslib");
const wizzi_1 = require("../../wizzi");
function getCheatsheetList() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => wizzi_1.wizziProds.getCheatsheetList().then((cheatsheets) => {
            return resolve(cheatsheets);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'cheatsheetApi.getCheatsheetList.error', err);
            return reject(err);
        }));
    });
}
exports.getCheatsheetList = getCheatsheetList;
function getCheatsheet(schemaName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => wizzi_1.wizziProds.getCheatsheet(schemaName).then((cheatsheet) => {
            return resolve(cheatsheet);
        }).catch((err) => {
            if (typeof err === 'object' && err !== null) {
            }
            console.log("[31m%s[0m", 'cheatsheetApi.getCheatsheet.error', err);
            return reject(err);
        }));
    });
}
exports.getCheatsheet = getCheatsheet;
//# sourceMappingURL=cheatsheet.js.map