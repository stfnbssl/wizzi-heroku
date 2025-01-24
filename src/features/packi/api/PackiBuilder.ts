/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\api\PackiBuilder.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import DiffMatchPatch from 'diff-match-patch';
import {PackiFiles} from '../types';
export class PackiBuilder {
    constructor(packiFiles: PackiFiles) {
        this.packiFiles = packiFiles || {};
        this.dmp = new DiffMatchPatch();
        console.log('PackiBuilder.ctor.packiFiles', packiFiles, __filename);
    }
    packiFiles: PackiFiles = {};
    dmp: InstanceType<typeof DiffMatchPatch>;
    getFileContent(filePath: string) {
        const file = this.packiFiles[filePath];
        return file ? file.contents : null;
    }
    putFile(filePath: string, type: "CODE", contents: string) {
        this.packiFiles[filePath] = {
            type: type, 
            contents: contents
         };
    }
    putCodeFile(filePath: string, contents: string) {
        this.putFile(filePath, 'CODE', contents)
    }
    deleteFile(filePath: string) {
        delete this.packiFiles[filePath]
    }
    getFileDiffs(filePath: string, newContent: string) {
        const tpf = this.packiFiles[filePath];
        if (tpf) {
            return this._diffLineMode(tpf.contents, newContent);
        }
        else {
            throw new Error("Filepath not found " + filePath);
        }
    }
    // loog 'applyFileDiffs.filePath', filePath
    // loog 'applyFileDiffs.diffs', diffs
    // loog 'applyFileDiffs.this.packiFiles[filePath]', this.packiFiles[filePath]
    applyFileDiffs(filePath: string, diffs: string) {
        const tpf = this.packiFiles[filePath];
        if (tpf) {
            const textToPatch = tpf.contents;
            const patches = this.dmp.patch_make(textToPatch, diffs);
            const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
            tpf.contents = patchedText;
        }
        else {
            throw new Error("Filepath not found " + filePath);
        }
    }
    getPackiFilesDiffs(packiFiles: PackiFiles) {
        const matches: { 
            [k: string]: any;
        } = {};
        for (var key in packiFiles) {
            const pf = packiFiles[key];
            const tpf = this.packiFiles[key];
            if (pf) {
                if (tpf) {
                    matches[key] = {
                        d: 0, 
                        diffs: this._diffLineMode(tpf.contents, pf.contents)
                     };
                }
                else {
                    matches[key] = {
                        d: 1, 
                        type: pf.type, 
                        contents: pf.contents
                     };
                }
            }
        }
        for (var key in this.packiFiles) {
            if (!packiFiles[key]) {
                matches[key] = {
                    d: -1
                 };
            }
        }
        return matches;
    }
    applyPatch(packiDiffs: any) {
        const patchedFiles: { 
            [k: string]: any;
        } = {};
        for (var key in packiDiffs) {
            const pd = packiDiffs[key];
            if (pd) {
                if (pd.d == 1) {
                    patchedFiles[key] = {
                        type: pd.type, 
                        contents: pd.contents
                     };
                }
                else if (pd.d == 0) {
                    const tpf = this.packiFiles[key];
                    if (tpf) {
                        const textToPatch = tpf.contents;
                        const patches = this.dmp.patch_make(textToPatch, pd.diffs);
                        const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
                        patchedFiles[key] = {
                            type: tpf.type, 
                            contents: patchedText
                         };
                    }
                }
            }
        }
        this.packiFiles = patchedFiles;
    }
    applyPatch_ChangesOnly(packiChanges: any) {
        for (var key in packiChanges) {
            const pc = packiChanges[key];
            const tpf = this.packiFiles[key];
            if (pc) {
                if (pc.d == 1) {
                    this.putCodeFile(key, pc.contents)
                }
                else if (pc.d == 0) {
                    if (tpf) {
                        const textToPatch = tpf.contents;
                        const patches = this.dmp.patch_make(textToPatch, pc.diffs);
                        const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
                        this.putCodeFile(key, patchedText)
                    }
                    else {
                        throw new Error("Filepath not found " + key);
                    }
                }
                else if (pc.d == -1) {
                    this.deleteFile(key)
                }
            }
        }
    }
    equals(packiFiles: PackiFiles) {
        for (var key in packiFiles) {
            const pf = packiFiles[key];
            const tpf = this.packiFiles[key];
            if (pf && tpf) {
                if (tpf.type != pf.type) {
                    return false;
                }
                if (tpf.contents != pf.contents) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        for (var key in this.packiFiles) {
            if (!packiFiles[key]) {
                return false;
            }
        }
        return true;
    }
    _diffLineMode(text1: string, text2: string) {
        var a = this.dmp.diff_linesToChars_(text1, text2);
        var lineText1 = a.chars1;
        var lineText2 = a.chars2;
        var lineArray = a.lineArray;
        var diffs = this.dmp.diff_main(lineText1, lineText2, false);
        this.dmp.diff_charsToLines_(diffs, lineArray);
        return diffs;
    }
}
