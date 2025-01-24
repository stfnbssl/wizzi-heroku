/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziProductions\factory.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import path from 'path';
import wizzi, {constants} from '@wizzi/factory';
import {fSystem} from '@wizzi/utils';
import {JsonComponents, JsonDocumentDto, JsonFs} from '@wizzi/repo';
import {packiTypes} from '../packi';
import {config as appConfig} from '../config';
import {JsonWizziFactory, FilesystemWizziFactory} from './types';

const myname = 'features/wizzi/factory';

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

function getWzCtxMetaPlugins() {
    return {
            items: [
                './wizzi.meta.cloud/index', 
                './wizzi.meta.commons/index', 
                './wizzi.meta.demo/index', 
                './wizzi.meta.docs/index', 
                './wizzi.meta.documents/index', 
                './wizzi.meta.js/index', 
                './wizzi.meta.js.db/index', 
                './wizzi.meta.js.node/index', 
                './wizzi.meta.js.vanilla/index', 
                './wizzi.meta.js.react/index', 
                './wizzi.meta.starter/index', 
                './wizzi.meta.ts/index', 
                './wizzi.meta.ts.express/index', 
                './wizzi.meta.ts.react/index', 
                './wizzi.meta.ts.db/index', 
                './wizzi.meta.web/index', 
                './wizzi.meta.wizzi/index', 
                './wizzi.meta.wizzi.dev/index'
            ], 
            metaPluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi.metas/packages'
         };
}

export async function createFilesystemFactoryWithParameters(pluginsBaseFolder: string, plugins: string[], globalContext?: { 
    [k: string]: any;
}):  Promise<wizzi.WizziFactory> {
    return new Promise((resolve, reject) => 
            wizzi.fsFactory({
                repo: {
                    storeKind: "filesystem"
                 }, 
                plugins: {
                    items: plugins, 
                    pluginsBaseFolder: pluginsBaseFolder
                 }, 
                globalContext: globalContext
             }, function(err: any, wf: wizzi.WizziFactory) {
                if (err) {
                    return reject(err);
                }
                return resolve(wf);
            })
        );
}

export async function createFilesystemFactory(factoryPlugins?: any, metaPlugins?: any, globalContext?: { 
    [k: string]: any;
}):  Promise<wizzi.WizziFactory> {
    const gc: { 
        [k: string]: any;
    } = {};
    if (appConfig.isWizziDev) {
        gc['isWizziStudio'] = true;
    }
    return new Promise((resolve, reject) => 
            wizzi.fsFactory({
                repo: {
                    storeKind: "filesystem"
                 }, 
                plugins: factoryPlugins ? factoryPlugins : getWzCtxFactoryPlugins(), 
                metaPlugins: metaPlugins ? metaPlugins : getWzCtxMetaPlugins(), 
                globalContext: Object.assign({}, gc, globalContext || {})
             }, function(err: any, wf: wizzi.WizziFactory) {
                if (err) {
                    return reject(err);
                }
                resolve(wf);
            })
        );
}


export function packiFilesToJsonDocuments(files: packiTypes.PackiFiles):  JsonDocumentDto[] {
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
        const file = files[value];
        if (file && file.type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: file.contents
             })
        }
    }
    )
    return jsonDocuments;
}

export async function createJsonFsAndFactory(
    files: packiTypes.PackiFiles, 
    factoryPlugins?: any, 
    metaPlugins?: any, 
    globalContext?: { 
        [k: string]: any;
    }):  Promise<JsonWizziFactory> {
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
        const file = files[value];
        if (file) {
            if (file.type === 'CODE' && file.contents && file.contents.length > 0) {
                const filePath = ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath, 
                    content: file.contents
                 })
            }
        }
    }
    )
    const metaPluginsDef = Object.assign({}, getWzCtxMetaPlugins(), metaPlugins || {});
    return new Promise((resolve, reject) => 
            JsonComponents.createJsonFs(jsonDocuments, // error myname, 'factoryPlugins', factoryPlugins, getWzCtxFactoryPlugins()
            // error myname, 'metaPlugins', metaPlugins
            (err, jsonFs) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'createJsonFsAndFactory.createJsonFs', err);
                    return reject(err);
                }
                wizzi.jsonFactory({
                    jsonFs, 
                    plugins: factoryPlugins ? factoryPlugins : getWzCtxFactoryPlugins(), 
                    metaPlugins: metaPluginsDef, 
                    globalContext: Object.assign({}, globalContext || {})
                 }, function(err: any, wf: wizzi.WizziFactory) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createJsonFsAndFactory.jsonFactory', err);
                        return reject(err);
                    }
                    resolve({
                        wf, 
                        jsonFs
                     })
                })
            }
            )
        );
}


export async function createJsonFs(files: packiTypes.PackiFiles):  Promise<JsonFs> {
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
        const file = files[value];
        if (file && file.type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: file.contents
             })
        }
    }
    )
    return new Promise((resolve, reject) => 
            JsonComponents.createJsonFs(jsonDocuments, (err: any, result: JsonFs) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
            )
        );
}

export async function extractGeneratedFiles(jsonFs: JsonFs):  Promise<packiTypes.PackiFiles> {
    const files: packiTypes.PackiFiles = {};
    return new Promise((resolve, reject) => 
            jsonFs.toFiles({
                removeRoot: constants.packiFilePrefix
             }, (err: any, result: fSystem.FileDef[]) => {
                if (err) {
                    reject(err);
                }
                result.forEach((value) => {
                    if (value.relPath.endsWith('.ittf') == false) {
                        files[value.relPath] = {
                            type: 'CODE', 
                            contents: value.content as string, 
                            generated: true
                         };
                    }
                }
                )
                resolve(files);
            }
            )
        );
}

export function ensurePackiFilePrefix(filePath: string) {
    var newFilePath = normalizePath(filePath);
    return newFilePath.startsWith(constants.packiFilePrefix) ? newFilePath : constants.packiFilePrefix + newFilePath;
}
function normalizePath(filePath: string) {
    return filePath.replace(/\\/g, '/');
}