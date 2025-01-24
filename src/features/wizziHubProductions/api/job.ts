/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\api\job.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import NodeCache from 'node-cache';
import {ValidateResult, CRUDResult} from '#/src/features/types';
import {packiTypes, packiConstants} from '#/src/features/packi';
import {config} from '#/src/features/config';
import {wizziProds} from '#/src/features/wizziProductions';
import {GetJobProductionModel} from '../mongo/job';
import {IJobProductionModel, PackiProductionObject} from '../types';
import {productionApi} from '../index';
import {mergePackiFiles} from '../utils';

const myname = 'features.wizziHubProductions.api.JobProduction';

const jobProductionCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });
export async function validateJobProduction(owner: string, name: string):  Promise<ValidateResult> {
    const JobProduction = GetJobProductionModel();
    return new Promise((resolve, reject) => {
            let query = { owner: owner, name: name };
            JobProduction.find(query, (err: any, result: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            isValid: false, 
                            message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production already exists'
                         });
                }
                resolve({
                    isValid: true
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getJobProductionList'
        // 'options'
        // options
*/
async function getJobProductionList(options?: any):  Promise<CRUDResult> {
    options = options || {};
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            const query = JobProduction.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getJobProductionList', 'JobProduction.find', 'error', err);
                    return reject(err);
                }
                const resultItem = [];
                var i, i_items=result, i_len=result.length, item;
                for (i=0; i<i_len; i++) {
                    item = result[i];
                    const item_obj = {
                        _id: item._id, 
                        id: item.id, 
                        owner: item.owner, 
                        name: item.name, 
                        description: item.description, 
                        packiFiles: item.packiFiles
                     };
                    resultItem.push(item_obj)
                }
                resolve({
                    oper: 'getJobProductionList', 
                    ok: true, 
                    item: resultItem
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getJobProduction'
        // owner
        // name
*/
async function getJobProduction(owner: string, name: string):  Promise<CRUDResult> {
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            JobProduction.find(query, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getJobProduction', 'JobProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            oper: 'get', 
                            ok: true, 
                            item: result[0]
                         });
                }
                resolve({
                    oper: 'get', 
                    ok: false, 
                    message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production not found'
                 })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'getJobProductionById'
        // id
*/
async function getJobProductionById(id: string):  Promise<CRUDResult> {
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            JobProduction.find({
                _id: id
             }, (err: any, result: IJobProductionModel[]) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getJobProduction', 'JobProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            oper: 'get', 
                            ok: true, 
                            item: result[0]
                         });
                }
                resolve({
                    oper: 'getJobProduction', 
                    ok: false, 
                    message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production not found'
                 })
            }
            )
        }
        );
}

export async function getJobProductionObject(owner: string, name: string, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    return new Promise((resolve, reject) => 
            getJobProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const job: IJobProductionModel = result.item;
                return resolve(_createJobProductionObject(job, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.jobProduction.getJobProductionObject.getJobProduction.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getJobProductionObjectById(id: string, loadPackiConfig?: boolean) {
    return new Promise((resolve, reject) => 
            getJobProductionById(id).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const job: IJobProductionModel = result.item;
                return resolve(_createJobProductionObject(job, loadPackiConfig));
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.jobProduction.getJobProductionObjectById.getJobProductionById.error', err);
                return reject(err);
            }
            )
        
        );
}
async function _createJobProductionObject(job: IJobProductionModel, loadPackiConfig?: boolean):  Promise<PackiProductionObject> {
    
    return new Promise((resolve, reject) => {
            const job_packiFiles_object: packiTypes.PackiFiles = JSON.parse(job.packiFiles);
            const obj = {
                ...job._doc, 
                packiFiles: job_packiFiles_object, 
                _id: job._id.toString(), 
                packiProduction: "JobProduction", 
                configPackiFile: job_packiFiles_object[packiConstants.packiConfigPath], 
                packiConfigJsonObj: null
             };
            
            if (loadPackiConfig) {
                if (!obj.configPackiFile) {
                    return reject({
                            message: 'Missing file ' + packiConstants.packiConfigPath + ' in JobProduction'
                         });
                }
                wizziProds.generateArtifact(packiConstants.packiConfigPath, {
                    [packiConstants.packiConfigPath]: {
                        type: obj.configPackiFile.type, 
                        contents: obj.configPackiFile.contents
                     }
                 }, {}).then((generationResult: any) => {
                    obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
                    return resolve(obj);
                }
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.jobProduction.getJobProductionObject._createJobProductionObject.error', err);
                    return reject(err);
                }
                )
            }
            else {
                return resolve(obj);
            }
        }
        );
}

export /**
    // console.log
        // myname
        // 'createJobProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function createJobProduction(
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            let query = {
                owner: owner, 
                name: name
             };
            
            JobProduction.find(query, // loog myname, 'getJobProduction', 'JobProduction.find', 'result', result
            (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'getJobProduction', 'JobProduction.find', 'error', err);
                    return reject(err);
                }
                if (result.length > 0) {
                    return resolve({
                            oper: 'create', 
                            ok: false, 
                            message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production already exists'
                         });
                }
                const newJobProduction = new JobProduction({
                    owner: owner, 
                    name: name, 
                    description: description, 
                    packiFiles: packiFiles, 
                    created_at: new Date(), 
                    updated_at: new Date()
                 });
                newJobProduction.save(function(err: any, doc: any) {
                    if (err) {
                        console.log("[31m%s[0m", myname, 'createJobProduction', 'newJobProduction.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                            oper: 'createJobProduction', 
                            ok: true, 
                            item: doc._doc, 
                            message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production created'
                         });
                })
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'updateJobProduction'
        // owner
        // name
        // description
        // packiFiles
*/
async function updateJobProduction(
    id?: string, 
    owner?: string, 
    name?: string, 
    description?: string, 
    packiFiles?: string):  Promise<CRUDResult> {
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            var query;
            if (id && id.length > 0) {
                query = {
                    _id: id
                 };
            }
            else {
                query = {
                    owner: owner, 
                    name: name
                 };
            }
            const update: any = {};
            if (typeof owner !== 'undefined') {
                update['owner'] = owner;
            }
            if (typeof name !== 'undefined') {
                update['name'] = name;
            }
            if (typeof description !== 'undefined') {
                update['description'] = description;
            }
            if (typeof packiFiles !== 'undefined') {
                update['packiFiles'] = packiFiles;
            }
            update['updated_at'] = new Date();
            
            JobProduction.findOneAndUpdate(query, update, {}, (err: any, result: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'updateJobProduction', 'JobProduction.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                if (!result) {
                    console.log("[31m%s[0m", myname, 'updateJobProduction', 'JobProduction.findOneAndUpdate', 'error', 'document not found');
                    return reject({
                            oper: 'updateJobProduction', 
                            ok: false, 
                            message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production document not found: ' + id
                         });
                }
                
                return resolve({
                        oper: 'updateJobProduction', 
                        ok: true, 
                        message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production updated'
                     });
            }
            )
        }
        );
}

export /**
    // console.log
        // myname
        // 'deleteJobProduction'
        // owner
        // name
*/
async function deleteJobProduction(id?: string, owner?: string, name?: string):  Promise<CRUDResult> {
    
    
    const JobProduction = GetJobProductionModel();
    
    return new Promise((resolve, reject) => {
            
            var query;
            if (id && id.length > 0) {
                query = {
                    _id: id
                 };
            }
            else {
                query = {
                    owner: owner, 
                    name: name
                 };
            }
            
            JobProduction.deleteOne(query, (err: any) => {
                if (err) {
                    console.log("[31m%s[0m", myname, 'deleteJobProduction', 'JobProduction.deleteOne', 'error', err);
                    return reject(err);
                }
                resolve({
                    oper: 'deleteJobProduction', 
                    ok: true, 
                    message: 'A Job defines a folder template for generating the tasks that execute a Wizzi production'
                 })
            }
            )
        }
        );
}

export async function mergeJobProductionFiles(
    owner: string, 
    name: string, 
    tobeMergedPackiFiles: packiTypes.PackiFiles, 
    options?: any):  Promise<any> {
    return new Promise((resolve, reject) => 
            getJobProductionObject(owner, name, false).then((itemObject: PackiProductionObject) => {
                const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
                updateJobProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(result => 
                    resolve(result)
                ).catch((err: any) => {
                    if (typeof err === 'object' && err !== null) {
                    }
                    console.log("[31m%s[0m", 'features.wizziHubProductions.api.jobProduction.mergeJobProductionFiles.updateJobProduction.error', err);
                    return reject(err);
                }
                )
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'features.wizziHubProductions.api.jobProduction.mergeJobProductionFiles.getJobProductionObject.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getJobProduction_withCache(owner: string, name: string) {
    var cacheKey = owner + '|' + name;
    return new Promise((resolve, reject) => {
            let jpValue = {
                packiFiles: {
                    
                 }
             };
            getJobProduction(owner, name).then((result) => {
                if (!result.ok) {
                    return reject(result);
                }
                const jp: IJobProductionModel = result.item;
                const jp_packiFiles_object: packiTypes.PackiFiles = JSON.parse(jp.packiFiles);
                jpValue = {
                    packiFiles: jp_packiFiles_object
                 };
                return resolve(jpValue);
            }
            ).catch((err: any) => {
                if (typeof err === 'object' && err !== null) {
                }
                console.log("[31m%s[0m", 'getJobProduction_withCache.getJobProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name?: string) {
    var cacheKey = owner + '|' + name;
    jobProductionCache.del(cacheKey);
}