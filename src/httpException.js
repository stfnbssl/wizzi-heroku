"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\httpException.ts.ittf
    utc time: Tue, 02 Apr 2024 09:22:48 GMT
*/
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpException;
//# sourceMappingURL=httpException.js.map