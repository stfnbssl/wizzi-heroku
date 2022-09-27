"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTypeFor = exports.wrapperForSchema = exports.schemaFromFilePath = exports.transformerFor = exports.schemaFromExtension = exports.generatorFor = exports.pluginsFor = exports.ittfRootFromSchema = exports.artifactNameFromFileSchema = exports.parseFilePath = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-heroku\.wizzi\src\features\wizzi\maps.ts.ittf
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
const schemaArtifactMap = {
    css: 'css/document',
    html: 'html/document',
    ittf: 'ittf/document',
    js: 'js/module',
    json: 'json/document',
    jsx: 'js/module',
    md: 'md/document',
    scss: 'scss/document',
    svg: 'svg/document',
    text: 'text/document',
    ts: 'ts/module',
    tsx: 'ts/module',
    vtt: 'vtt/document',
    xml: 'xml/document',
    yaml: 'yaml/document',
    yml: 'yaml/document'
};
function artifactNameFromFileSchema(schema) {
    return schemaArtifactMap[schema];
}
exports.artifactNameFromFileSchema = artifactNameFromFileSchema;
const schemaIttfRootMap = {
    css: 'css',
    html: 'html',
    ittf: 'any',
    js: 'module',
    json: '{',
    jsx: 'module',
    md: 'md',
    scss: 'scss',
    svg: 'svg',
    text: 'text',
    ts: 'module',
    tsx: 'module',
    vtt: 'vtt',
    xml: 'xml',
    yaml: 'yaml'
};
function ittfRootFromSchema(schema) {
    return schemaIttfRootMap[schema];
}
exports.ittfRootFromSchema = ittfRootFromSchema;
const schemaPluginMap = {
    css: [
        'wizzi-web'
    ],
    graphql: [
        'wizzi-web'
    ],
    html: [
        'wizzi-web',
        'wizzi-js',
        'wizzi-core'
    ],
    ittf: [
        'wizzi-core'
    ],
    js: [
        'wizzi-js'
    ],
    json: [
        'wizzi-core'
    ],
    scss: [
        'wizzi-web'
    ],
    text: [
        'wizzi-core'
    ],
    ts: [
        'wizzi-js'
    ],
    vtt: [
        'wizzi-web'
    ],
    vue: [
        'wizzi-web'
    ],
    wfjob: [
        'wizzi-core'
    ],
    wfschema: [
        'wizzi-core'
    ],
    xml: [
        'wizzi-core'
    ],
    yaml: [
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
function generatorFor(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return artifactNameFromFileSchema(pf.schema);
    }
    return undefined;
}
exports.generatorFor = generatorFor;
const extSchemaMap = {
    '.css': 'css',
    '.graphql': 'graphql',
    '.html': 'html',
    '.ittf': 'ittf',
    '.js': 'js',
    '.json': 'json',
    '.jsx': 'js',
    '.md': 'md',
    '.svg': 'svg',
    '.text': 'text',
    '.ts': 'ts',
    '.tsx': 'ts',
    '.vtt': 'vtt',
    '.xml': 'xml',
    '.yaml': 'yaml',
    '.yml': 'yaml'
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
const extContentTypeMap = {
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.ittf': 'text/plain',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.js': 'text/javascript',
    '.jsx': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.scss': 'text/scss',
    '.svg': 'image/svg+xml',
    '.ts': 'text/typescript',
    '.tsx': 'text/typescript',
    '.ttf': 'application/x-font-ttf',
    '.txt': 'text/plain',
    '.vtt': 'text/vtt',
    '.woff': 'application/x-font-woff',
    '.xml': 'text/xml',
    '.yaml': 'text/yanl',
    '.yml': 'text/yanl'
};
function contentTypeFor(filePath) {
    const ittfSchema = schemaFromFilePath(filePath);
    if (ittfSchema) {
        return extContentTypeMap['.' + ittfSchema];
    }
    return undefined;
}
exports.contentTypeFor = contentTypeFor;
//# sourceMappingURL=maps.js.map