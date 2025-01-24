/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\middlewares\promise.ts.ittf
    utc time: Fri, 24 Jan 2025 13:13:17 GMT
*/
// see https://www.toptal.com/express-js/routes-js-promises-error-handling
import {Application, Request, Response} from 'express';
import {MiddlewareType} from '#/src/features/app/types';
const handleResponse = (res: Response, data: any) => 
    res.status(200).send(data)
;
const handleError = (res: Response, err: any = {}) => 
    res.status(err.status || 500).send({
        error: err.message
     })
;
export const PromiseMiddleware: MiddlewareType = (app: Application) => {
    app.use(promiseMiddleware())
    console.log("[32m%s[0m", 'PromiseMiddleware installed.');
}
;
function promiseMiddleware() {
    return (req: Request, res: Response, next: Function) => {
            (res as any).promise = (p: any) => {
                let promiseToResolve;
                if (p.then && p.catch) {
                    promiseToResolve = p;
                }
                else {
                    if (typeof p === 'function') {
                        promiseToResolve = Promise.resolve().then(() => 
                            p()
                        )
                        ;
                    }
                    else {
                        promiseToResolve = Promise.resolve(p);
                    }
                }
                return promiseToResolve.then((data: any) => 
                        handleResponse(res, data)
                    ).catch((e: any) => 
                        handleError(res, e)
                    )
                ;
            }
            ;
            return next();
        }
    ;
}