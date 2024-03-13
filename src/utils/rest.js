"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restParamsCheck = void 0;
const wizzi_utils_1 = require("wizzi-utils");
const sendResponse_1 = require("./sendResponse");
const restParamsCheck = (request) => {
    return new ParamsCheck(request);
};
exports.restParamsCheck = restParamsCheck;
class ParamsCheck {
    constructor(request) {
        this.request = request;
        this.errors = [];
    }
    notUndefined(qb, name) {
        var value = this.optional(qb, name);
        if (wizzi_utils_1.verify.isUndefined(value)) {
            this.error('Parameter: "' + name + '" must have a value.');
        }
        return value;
    }
    notEmpty(qb, name) {
        var value = this.optional(qb, name);
        if (wizzi_utils_1.verify.isEmpty(value)) {
            this.error('String parameter: "' + name + '" must have a value.');
        }
        return value;
    }
    notEmptyBody() {
        var value = this.optionalBody();
        if (wizzi_utils_1.verify.isEmpty(value)) {
            this.error('The body must be not empty.');
        }
        return value;
    }
    optional(qb, name) {
        var value;
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
    optionalBody() {
        return this.request.body;
    }
    error(message) {
        this.errors.push(message);
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    sendErrors(response) {
        (0, sendResponse_1.sendFailure)(response, {
            err: this.errors
        }, 501);
    }
}
//# sourceMappingURL=rest.js.map