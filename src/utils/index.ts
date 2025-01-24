/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\utils\index.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Request} from 'express';
// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req: Request) {
    const id = req.params.id;
    if (id && /^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }
    throw new TypeError(`Invalid ':id' param: "${id}"`);
}
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const statusCode = {
    SUCCESS: 200, 
    BAD_REQUEST: 400, 
    FORBIDDEN: 403, 
    NOT_FOUND: 404
 };
// ms
const expiredAfter = "600000";
export {
    getIdParam, 
    statusCode, 
    expiredAfter, 
    emailRegex
 }