"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackiManager = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi-override\src\features\packi\api\PackiManager.ts.ittf
*/
const diff_match_patch_1 = tslib_1.__importDefault(require("diff-match-patch"));
class PackiManager {
    constructor(packiFiles) {
        this.packiFiles = {};
        this.dmp = null;
        this.packiFiles = packiFiles;
        this.dmp = new diff_match_patch_1.default();
    }
    getFileContent(filePath) {
        const file = this.packiFiles[filePath];
        return file ? file.contents : null;
    }
    putFile(filePath, type, contents) {
        this.packiFiles[filePath] = {
            type: type,
            contents: contents
        };
    }
    putCodeFile(filePath, contents) {
        this.putFile(filePath, 'CODE', contents);
    }
    deleteFile(filePath) {
        delete this.packiFiles[filePath];
    }
    getFileDiffs(filePath, newContent) {
        const diffs = this._diffLineMode(this.packiFiles[filePath].contents, newContent);
        return diffs;
    }
    applyFileDiffs(filePath, diffs) {
        const textToPatch = this.packiFiles[filePath].contents;
        const patches = this.dmp.patch_make(textToPatch, diffs);
        const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
        this.packiFiles[filePath].contents = patchedText;
    }
    getPackiFilesDiffs(packiFiles) {
        const matches = {};
        var i, i_items = Object.keys(packiFiles), i_len = Object.keys(packiFiles).length, key;
        for (i = 0; i < i_len; i++) {
            key = Object.keys(packiFiles)[i];
            if (this.packiFiles[key]) {
                matches[key] = {
                    d: 0,
                    diffs: this._diffLineMode(this.packiFiles[key].contents, packiFiles[key].contents)
                };
            }
            else {
                matches[key] = {
                    d: 1,
                    type: packiFiles[key].type,
                    contents: packiFiles[key].contents
                };
            }
        }
        var i, i_items = Object.keys(this.packiFiles), i_len = Object.keys(this.packiFiles).length, key;
        for (i = 0; i < i_len; i++) {
            key = Object.keys(this.packiFiles)[i];
            if (!packiFiles[key]) {
                matches[key] = {
                    d: -1
                };
            }
        }
        return matches;
    }
    applyPatch(packiDiffs) {
        const patchedFiles = {};
        var i, i_items = Object.keys(packiDiffs), i_len = Object.keys(packiDiffs).length, key;
        for (i = 0; i < i_len; i++) {
            key = Object.keys(packiDiffs)[i];
            if (packiDiffs[key].d == 1) {
                patchedFiles[key] = {
                    type: packiDiffs[key].type,
                    contents: packiDiffs[key].contents
                };
            }
            else if (packiDiffs[key].d == 0) {
                const textToPatch = this.packiFiles[key].contents;
                const patches = this.dmp.patch_make(textToPatch, packiDiffs[key].diffs);
                const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
                patchedFiles[key] = {
                    type: this.packiFiles[key].type,
                    contents: patchedText
                };
            }
        }
        this.packiFiles = patchedFiles;
    }
    equals(packiFiles) {
        var i, i_items = Object.keys(packiFiles), i_len = Object.keys(packiFiles).length, key;
        for (i = 0; i < i_len; i++) {
            key = Object.keys(packiFiles)[i];
            if (this.packiFiles[key]) {
                if (this.packiFiles[key].type != packiFiles[key].type) {
                    return false;
                }
                if (this.packiFiles[key].contents != packiFiles[key].contents) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        var i, i_items = Object.keys(this.packiFiles), i_len = Object.keys(this.packiFiles).length, key;
        for (i = 0; i < i_len; i++) {
            key = Object.keys(this.packiFiles)[i];
            if (!packiFiles[key]) {
                return false;
            }
        }
        return true;
    }
    _diffLineMode(text1, text2) {
        var a = this.dmp.diff_linesToChars_(text1, text2);
        var lineText1 = a.chars1;
        var lineText2 = a.chars2;
        var lineArray = a.lineArray;
        var diffs = this.dmp.diff_main(lineText1, lineText2, false);
        this.dmp.diff_charsToLines_(diffs, lineArray);
        return diffs;
    }
}
exports.PackiManager = PackiManager;
//# sourceMappingURL=PackiManager.js.map