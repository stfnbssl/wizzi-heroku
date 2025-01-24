/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziProductions\api\context.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
import path from 'path';
import {file} from '@wizzi/factory';
import {config} from '#/src/features/config';
import * as wizziProds from '../productions';
import {packiTypes} from '#/src/features/packi';
import {ArtifactRequest, MetaContext} from '../types';
const myname = 'features.wizzi.api.context';
export async function resolveContexts(contextItems: MetaContext[]) {
    return new Promise((resolve, reject) => {
            if (contextItems.length == 0) {
                return resolve({});
            }
            const promises: Promise<any>[] = [];
            contextItems.map(contextItem => 
                promises.push(new Promise((resolve, reject) => 
                    resolveContext(contextItem).then((context: any) => 
                        resolve({
                            name: contextItem.name, 
                            value: context
                         })
                    ).catch((err: any) => {
                        if (typeof err === 'object' && err !== null) {
                        }
                        console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContexts.resolveContext.error', err);
                        return reject(err);
                    }
                    )
                
                ))
            )
            Promise.all(promises).then((items) => {
                var context: any = {};
                items.map((value: any) => {
                    if (value.name && value.name.length > 0) {
                        context[value.name] = value.value;
                    }
                    else {
                        context = Object.assign({}, context, value.value)
                        ;
                    }
                }
                )
                resolve(context)
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContexts.Promise.all.error', err);
                return reject(err);
            }
            )
        }
        );
}
function resolveContext(contextItem: MetaContext) {
    if (contextItem.source == 'json-fsIttf') {
        return new Promise(// TODO check contextItem.path.endsWith('.json.ittf')
            (resolve, reject) => 
                wizziProds.generateArtifactFs(path.join(config.ittfPath, contextItem.path as string)).then((value: any) => 
                    resolve(value)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.generateArtifactFs.error', err);
                    return reject(err);
                }
                )
            
            );
    }
    else if (contextItem.source == 'json-packiIttf') {
        return new Promise((resolve, reject) => 
                wizziProds.generateArtifact(contextItem.mainIttf as string, contextItem.packiFiles as packiTypes.PackiFiles).then((value: any) => 
                    resolve(value)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.generateArtifact.error', err);
                    return reject(err);
                }
                )
            
            );
    }
    else if (contextItem.source == 'json-dbIttf') {
        throw new Error('ContextItem source not yet implemented: ' + contextItem.source);
    }
    else if (contextItem.source == 'json-fsFile') {
        return new Promise((resolve, reject) => {
                const json = file.readJSON(contextItem.path as string);
                resolve(json);
            }
            );
    }
    else if (contextItem.source == 'json-value') {
        return new Promise(resolve => 
                resolve(contextItem.value)
            );
    }
    else if (contextItem.source == 'model-fsIttf') {
        return new Promise((resolve, reject) => 
                wizziProds.loadModelFs(path.join(config.ittfPath, contextItem.path as string), {}).then((value: any) => 
                    resolve(value)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.loadModelFs.error', err);
                    return reject(err);
                }
                )
            
            );
    }
    else if (contextItem.source == 'model-packiIttf') {
        return new Promise((resolve, reject) => 
                wizziProds.loadModel(contextItem.mainIttf as string, contextItem.packiFiles as packiTypes.PackiFiles).then((value: any) => 
                    resolve(value)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizzi.api.context.resolveContext.wizziProds.loadModel.error', err);
                    return reject(err);
                }
                )
            
            );
    }
    else if (contextItem.source == 'model-dbIttf') {
        throw new Error('ContextItem source not yet implemented: ' + contextItem.source);
    }
    else {
        throw new Error('Invalid contextItem source: ' + contextItem.source);
    }
}