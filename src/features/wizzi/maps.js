"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapperForSchema = exports.schemaFromFilePath = exports.transformerFor = exports.schemaFromExtension = exports.generatorFor = exports.pluginsFor = exports.ittfRootFromSchema = exports.artifactNameFromSchema = exports.parseFilePath = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.10
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\src\features\wizzi\maps.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
function parseFilePath(filePath) {
    const nameParts = path_1.default.basename(filePath).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return {
            isIttfDocument: true,
            schema: nameParts[nameParts.length - 2],
            seedname: nameParts.slice(0, -2).join('.')
        };
    }
    else {
        return {
            isIttfDocument: false,
            schema: nameParts[nameParts.length - 1],
            seedname: nameParts.slice(0, -1).join('.')
        };
    }
}
exports.parseFilePath = parseFilePath;
var schemaArtifactMap = {
    js: 'js/module',
    jsx: 'js/module',
    ts: 'ts/module',
    html: 'html/document',
    css: 'css/document',
    scss: 'scss/document',
    svg: 'svg/document',
    vtt: 'vtt/document',
    md: 'md/document',
    json: 'json/document',
    xml: 'xml/document',
    yaml: 'yaml/document',
    text: 'text/document',
    ittf: 'ittf/document'
};
function artifactNameFromSchema(schema) {
    return schemaArtifactMap[schema];
}
exports.artifactNameFromSchema = artifactNameFromSchema;
var schemaIttfRootMap = {
    js: 'module',
    jsx: 'module',
    ts: 'module',
    html: 'html',
    css: 'css',
    scss: 'scss',
    svg: 'svg',
    md: 'vtt',
    vtt: 'vtt',
    json: '{',
    xml: 'xml',
    yaml: 'yaml',
    text: 'any',
    ittf: 'any'
};
function ittfRootFromSchema(schema) {
    return schemaIttfRootMap[schema];
}
exports.ittfRootFromSchema = ittfRootFromSchema;
const schemaPluginMap = {
    wfjob: [
        'wizzi-core'
    ],
    wfschema: [
        'wizzi-core'
    ],
    js: [
        'wizzi-js'
    ],
    ts: [
        'wizzi-js'
    ],
    html: [
        'wizzi-web',
        'wizzi-js',
        'wizzi-core'
    ],
    css: [
        'wizzi-web'
    ],
    scss: [
        'wizzi-web'
    ],
    graphql: [
        'wizzi-web'
    ],
    vml: [
        'wizzi-web'
    ],
    vue: [
        'wizzi-web'
    ],
    json: [
        'wizzi-core'
    ],
    text: [
        'wizzi-core'
    ],
    xml: [
        'wizzi-core'
    ],
    yaml: [
        'wizzi-core'
    ],
    ittf: [
        'wizzi-core'
    ]
};
function pluginsFor(file) {
    const nameParts = path_1.default.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return schemaPluginMap[nameParts[nameParts.length - 2]] || [];
    }
    return [];
}
exports.pluginsFor = pluginsFor;
const schemaModuleMap = {
    css: 'css/document',
    graphql: 'graphql/document',
    ittf: 'ittf/document',
    js: 'js/module',
    json: 'json/document',
    html: 'html/document',
    md: 'md/document',
    scss: 'scss/document',
    svg: 'svg/document',
    text: 'text/document',
    ts: 'ts/module',
    vml: 'vml/document',
    vue: 'vue/document',
    xml: 'xml/document'
};
function generatorFor(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaModuleMap[pf.schema];
    }
    return undefined;
}
exports.generatorFor = generatorFor;
const extSchemaMap = {
    '.js': 'js',
    '.jsx': 'js',
    '.ts': 'ts',
    '.tsx': 'ts',
    '.html': 'html',
    '.css': 'css',
    '.svg': 'svg',
    '.md': 'md',
    '.xml': 'xml',
    '.json': 'json',
    '.graphql': 'graphql'
};
function schemaFromExtension(extension) {
    return extSchemaMap[extension];
}
exports.schemaFromExtension = schemaFromExtension;
const schemaTransformerMap = {
    meta: 'ittf/cheatsheet'
};
function transformerFor(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaTransformerMap[pf.schema];
    }
    return undefined;
}
exports.transformerFor = transformerFor;
function schemaFromFilePath(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return pf.schema;
    }
    return undefined;
}
exports.schemaFromFilePath = schemaFromFilePath;
function wrapperForSchema(schema) {
    if (schema === 'js' || schema === 'jsx') {
        return {
            n: 'module',
            children: [
                {
                    n: 'kind',
                    v: 'react',
                    children: []
                }
            ]
        };
    }
    else if (schema === 'ts') {
        return {
            n: 'module',
            children: []
        };
    }
    else {
        return {
            n: schema,
            children: []
        };
    }
}
exports.wrapperForSchema = wrapperForSchema;
//# sourceMappingURL=maps.js.map