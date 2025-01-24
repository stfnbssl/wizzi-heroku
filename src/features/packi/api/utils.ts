/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\api\utils.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import DiffMatchPatch from 'diff-match-patch';
import fs from './fs-extra';
import {spawn, ChildProcess} from 'child_process';
import path from 'node:path';
import {fSystem} from '@wizzi/utils';
import {PackiFiles} from '../types';

const PACKI_META_DEMO_FOLDER = 'C:/My/wizzi/stfnbssl/packi-meta-demo';

export function clonePackiFiles(packiFiles: PackiFiles, filters: string[]) {
    filters = filters || [];
    
    function isOk(filename: string) {
        if (filters.length == 0) {
            return true;
        }
        var i, i_items=filters, i_len=filters.length, filter;
        for (i=0; i<i_len; i++) {
            filter = filters[i];
            if (filter && filename.startsWith(filter)) {
                return true;
            }
        }
        return false;
    }
    
    const retval: PackiFiles = {};
    for (var k in packiFiles) {
        const pf = packiFiles[k];
        if (pf && isOk(k)) {
            retval[k] = pf;
        }
    }
    return retval;
}
export // log "extractPackiFileContent.packiFiles 1", packiFiles
// log "extractPackiFile.filePath", filePath
// 'extractPackiFile.pf", pf
function extractPackiFileContent(packiFiles: PackiFiles, filePath: string, options: any) {
    const pf = extractPackiFile(packiFiles, filePath);
    const retval: { 
        [key: string]: any;
    } = {
        text: (pf && pf.contents) || (options.json ? '{}' : ''), 
        json: null
     };
    if (options.json) {
        try {
            retval.json = pf && JSON.parse(pf.contents) || {};
            // log "extractPackiFile.pf.contents json", retval.json
        } 
        catch (err) {
            console.log("[31m%s[0m", "Error in extractPackiFileContent parsing packiFile contents", err);
            // TODO
            retval.json = {};
        } 
    }
    return retval;
}
export function extractPackiFile(packiFiles: PackiFiles, filePath: string) {
    const pfs = packiFilesToObject(packiFiles);
    return pfs[filePath];
}
export function packiFilesToObject(packiFiles: any) {
    if (typeof packiFiles === "string") {
        try {
            return JSON.parse(packiFiles);
        } 
        catch (err) {
            console.log("[31m%s[0m", "packiFilesToObject", err);
            // TODO
            return {};
        } 
    }
    else {
        return packiFiles;
    }
}
export async function removeFolder(folderPath: string):  Promise<void> {
    return new Promise(async (resolve, reject) => {
            try {
                // Resolve the full path
                const fullPath = path.resolve(folderPath);
                // Check if the folder exists
                const exists = await fs.pathExists(fullPath);
                if (!exists) {
                    console.log(`features.packi.utils.removeFolder-> Folder does not exist: ${fullPath}`)
                    return resolve();
                }
                // Remove the folder and its contents
                await fs.remove(fullPath);
                console.log(`features.packi.utils.removeFolder-> Successfully removed folder: ${fullPath}`)
                return resolve();
            } 
            catch (error) {
                console.error(`features.packi.utils.removeFolder-> Error removing folder: ${error.message}`)
                return reject(error);
            } 
        }
        );
}
export function writePackiFilesToFolder(packiFiles: PackiFiles, folderPath: string):  Promise<void> {
    return new Promise(async (resolve, reject) => {
            for (const [filePath, fileData] of Object.entries(packiFiles)) {
                if (typeof fileData !== 'object' || !fileData.hasOwnProperty('contents')) {
                    console.warn(`features.packi.utils.writePackiFilesToFolder-> Skipping invalid entry for path: ${filePath}`)
                    continue;
                }
                const fullPath = path.resolve(folderPath, filePath);
                const directory = path.dirname(fullPath);
                try {
                    fSystem.file.write(fullPath, fileData.contents)
                    console.log(`features.packi.utils.writePackiFilesToFolder-> Successfully wrote file: ${fullPath}`)
                } 
                catch (error) {
                    console.error(`features.packi.utils.writePackiFilesToFolder-> Error writing file ${fullPath}: ${error.message}`)
                    return reject(error);
                } 
            }
            return resolve();
        }
        );
}
export async function installPackiMetaDemo(packageName: string, packiFiles: PackiFiles):  Promise<void> {
    return new Promise(async (resolve, reject) => {
            const folderPath = path.resolve(PACKI_META_DEMO_FOLDER, 'packages', packageName);
            await removeFolder(folderPath);
            await writePackiFilesToFolder(packiFiles, folderPath);
            return resolve();
        }
        );
}
export function npmInstall(folderPath: string) {
}
export function npmBuild(folderPath: string) {
}
export function npmStart(folderPath: string) {
}
function runNpmCommand(command: string, cwd: string):  Promise<void> {
    return new Promise((resolve, reject) => {
            console.log(`Running 'npm ${command}' in ${cwd}`)
            const npmCmd: string = process.platform === 'win32' ? 'npm.cmd' : 'npm';
            const childProcess: ChildProcess = spawn(npmCmd, [
                command
            ], {
                cwd, 
                stdio: 'inherit'
             });
            childProcess.on('close', (code: number | null) => {
                if (code !== 0) {
                    reject(new Error(`npm ${command} exited with code ${code}`))
                }
                else {
                    resolve();
                }
            }
            )
            childProcess.on('error', (error: Error) => 
                reject(new Error(`Failed to start npm ${command}: ${error.message}`))
            )
        }
        );
}
export async function installAndBuild(projectPath: string):  Promise<void> {
    const absolutePath: string = path.resolve(projectPath);
    try {
        // Run npm install
        await runNpmCommand('install', absolutePath);
        console.log('npm install completed successfully');
        // Run npm run build
        await runNpmCommand('run build', absolutePath);
        console.log('npm run build completed successfully');
        console.log('All commands executed successfully');
    } 
    catch (error) {
        console.error('Error:', (error as Error).message)
    } 
}