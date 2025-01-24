/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\packi\index.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import * as packiTypes from './types';
import packiConstants from './constants';
import {PackiBuilder} from './api/PackiBuilder';
import {clonePackiFiles, extractPackiFileContent, extractPackiFile, packiFilesToObject} from './api/utils';
import {prettify, generate} from './api/packiManager';
import {ControllerType} from '#/src/features/app/types';
import {PackiEditingController} from './controllers/packiEditing';
import {PackiGeneratingController} from './controllers/packiGenerating';
import {ApiV1PackiManagerController} from './controllers/apiv1packiManager';
const packiControllers: ControllerType[] = [
    new PackiEditingController(), 
    new PackiGeneratingController(), 
    new ApiV1PackiManagerController()
];
const packiApi = {
    PackiBuilder, 
    clonePackiFiles, 
    extractPackiFileContent, 
    extractPackiFile, 
    packiFilesToObject, 
    prettify, 
    generate
 };
export {packiTypes, packiConstants, PackiBuilder, packiApi, packiControllers};