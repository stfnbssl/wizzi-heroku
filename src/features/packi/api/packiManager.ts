/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\api\packiManager.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import wizzi from '@wizzi/factory';
import {installPackiMetaDemo} from './utils';
import {PackiFiles, PackiInstallContext} from '../types';

export function prettify(packiFiles: PackiFiles):  Promise<PackiFiles> {
    return new Promise((resolve, reject) => 
            wizzi.packiManager({}, (err: any, packiManager: wizzi.PackiManager) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return reject(err);
                }
                packiManager.prettify(packiFiles, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return reject(err);
                    }
                    console.log('api.PackiManager.prettify.result', result);
                    resolve(result)
                }
                )
            }
            )
        );
}

export function generate(packiFiles: PackiFiles, plugins: null | { 
    items: string[];
    pluginsBaseFolder: string;
}, options: { 
    modelRequestContext?: { 
    };
    artifactRequestContext?: { 
    };
    globalContext?: { 
    };
}):  Promise<PackiFiles> {
    return new Promise((resolve, reject) => 
            wizzi.packiManager({}, (err: any, packiManager: wizzi.PackiManager) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return reject(err);
                }
                packiManager.generate(packiFiles, plugins ? plugins : getWzCtxFactoryPlugins(), {
                    modelRequestContext: options.modelRequestContext || {}, 
                    artifactRequestContext: options.artifactRequestContext || {}, 
                    globalContext: options.globalContext || {}
                 }, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return reject(err);
                    }
                    console.log('api.PackiManager.Generate.result', result);
                    resolve(result)
                }
                )
            }
            )
        );
}


export function installDemoPackage(packiFiles: PackiFiles, context: PackiInstallContext):  Promise<void> {
    return installPackiMetaDemo(context.name, packiFiles);
}

function getWzCtxFactoryPlugins() {
    return {
            items: [
                '@wizzi/plugin.ai', 
                '@wizzi/plugin.css', 
                '@wizzi/plugin.html', 
                '@wizzi/plugin.ittf', 
                '@wizzi/plugin.js', 
                '@wizzi/plugin.json', 
                '@wizzi/plugin.logbot', 
                '@wizzi/plugin.md', 
                '@wizzi/plugin.svg', 
                '@wizzi/plugin.text', 
                '@wizzi/plugin.ts', 
                '@wizzi/plugin.wzjob', 
                '@wizzi/plugin.wzschema', 
                '@wizzi/plugin.xml', 
                '@wizzi/plugin.yaml'
            ]
         };
}