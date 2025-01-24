/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\api\packiManager.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
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
                './wizzi.plugin.css/index.js', 
                './wizzi.plugin.html/index.js', 
                './wizzi.plugin.ittf/index.js', 
                './wizzi.plugin.js/index.js', 
                './wizzi.plugin.json/index.js', 
                './wizzi.plugin.logbot/index.js', 
                './wizzi.plugin.md/index.js', 
                './wizzi.plugin.svg/index.js', 
                './wizzi.plugin.text/index.js', 
                './wizzi.plugin.ts/index.js', 
                './wizzi.plugin.wzjob/index.js', 
                './wizzi.plugin.wzschema/index.js', 
                './wizzi.plugin.xml/index.js', 
                './wizzi.plugin.yaml/index.js'
            ], 
            pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi.plugins/packages'
         };
}