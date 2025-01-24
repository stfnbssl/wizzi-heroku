/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\utils\rest.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {Request, Response} from 'express';
import {verify} from '@wizzi/utils';
import {sendFailure} from './sendResponse';
export const restParamsCheck = (request: Request) => {
    return new ParamsCheck(request);
}
;
class ParamsCheck {
    constructor(request: Request) {
        this.request = request;
        this.errors = [];
    }
    private request: Request;
    public errors: string[];
    notUndefined(qb: string, name: string):  any {
        var value = this.optional(qb, name);
        if (verify.isUndefined(value)) {
            this.error('Parameter: "' + name + '" must have a value.')
        }
        return value;
    }
    notEmpty(qb: string, name: string):  any {
        var value = this.optional(qb, name);
        if (verify.isEmpty(value)) {
            this.error('String parameter: "' + name + '" must have a value.')
        }
        return value;
    }
    notEmptyBody():  any {
        var value = this.optionalBody();
        if (verify.isEmpty(value)) {
            this.error('The body must be not empty.')
        }
        return value;
    }
    optional(qb: string, name: string):  any {
        let value: any = null;
        if (qb === 'query') {
            value = this.request.query[name];
        }
        else if (qb === 'params') {
            value = this.request.params[name];
        }
        else {
            value = this.request.body[name];
        }
        return value;
    }
    optionalBody():  any {
        return this.request.body;
    }
    assert(value: boolean, message: string):  void {
        if (!value) {
            this.error(message)
        }
    }
    error(message: string):  void {
        this.errors.push(message);
    }
    hasErrors():  boolean {
        return this.errors.length > 0;
    }
    sendErrors(response: Response):  void {
        sendFailure(response, {
            err: this.errors
         }, 501)
    }
}