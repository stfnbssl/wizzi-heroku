/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\actions\fsrepo.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import path from 'path';
import {fSystem} from '@wizzi/utils';
import {packiTypes} from '#/src/features/packi';
import {wizziProds} from '#/src/features/wizziProductions';

export function getFilteredPackiFiles(options: any):  Promise<packiTypes.PackiFiles> {
    return new Promise((resolve, reject) => 
            fSystem.vfile().getFiles(options.sourceFolder, {
                deep: true, 
                documentContent: true
             }, (err: any, files: any) => {
                if (err) {
                    return reject(err);
                }
                const result: packiTypes.PackiFiles = {};
                var i, i_items=files, i_len=files.length, file;
                for (i=0; i<i_len; i++) {
                    file = files[i];
                    if (!options.filter || options.filter(file.relPath, file.content)) {
                        result[file.relPath] = {
                            type: "CODE", 
                            contents: file.content
                         };
                    }
                }
                resolve(result);
            }
            )
        );
}
export function getFileContents(options: any):  Promise<string> {
    return new Promise((resolve, reject) => 
            fSystem.vfile().read(options.sourceFile, (err: any, contents: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(contents);
            }
            )
        );
}
export function writePackiToDest(packiFiles: packiTypes.PackiFiles, destFolder: string) {
    for (var k in packiFiles) {
        const pf = packiFiles[k];
        if (pf) {
            fSystem.vfile().write(path.join(destFolder, k), pf.contents)
        }
    }
}
export function getFileJSON(options: any):  Promise<string> {
    return new Promise((resolve, reject) => {
            if (options.sourceFile.endsWith(".ittf")) {
                wizziProds.generateArtifactFs(options.sourceFile).then((contents: any) => 
                    resolve(JSON.parse(contents.artifactContent))
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'fsrepo.getFileJSON.generateArtifactFs.error', err);
                    throw new Error(err);
                }
                )
            }
            else {
                fSystem.vfile().read(options.sourceFile, (err: any, contents: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(contents));
                }
                )
            }
        }
        );
}
export // 
function createPackifilesFromFs(folderPath: string, callback: any) {
    const fsFile = fSystem.vfile();
    fsFile.getFiles(folderPath, {
        deep: true, 
        documentContent: true
     }, (err: any, files: any) => {
        if (err) {
            return callback(err);
        }
        const packiFiles: packiTypes.PackiFiles = {};
        var i, i_items=files, i_len=files.length, file;
        for (i=0; i<i_len; i++) {
            file = files[i];
            packiFiles[file.relPath] = {
                type: 'CODE', 
                contents: file.content
             };
        }
        return callback(null, packiFiles);
    }
    )
}