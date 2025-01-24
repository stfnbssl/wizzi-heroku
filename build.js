/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\root\build.js.ittf
    utc time: Fri, 24 Jan 2025 15:11:48 GMT
*/
const {
    build
 } = require("esbuild");
const {
    dependencies, 
    peerDependencies
 } = require('./package.json');
const {
    Generator
 } = require('npm-dts');

new Generator({
    entry: 'src/index.ts', 
    output: 'dist/index.d.ts', 
    logLevel: "info"
 }).generate();

const sharedConfig = {
    entryPoints: [
        "src/index.ts"
    ], 
    bundle: true, 
    external: Object.keys(dependencies)
 };
build({
    ...sharedConfig, 
    platform: 'node', 
    
    // for CJS
    outfile: "dist/index.js"
 })
build({
    ...sharedConfig, 
    outfile: "dist/index.esm.js", 
    platform: 'node', 
    
    // for ESM
    format: "esm"
 })