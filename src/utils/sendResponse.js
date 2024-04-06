"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromiseLikeResult = exports.sendPromiseResult = exports.sendSuccess = exports.sendFailure = exports.sendError = exports.sendHtml = void 0;
const tslib_1 = require("tslib");
const json_stringify_safe_1 = tslib_1.__importDefault(require("json-stringify-safe"));
const utils_1 = require("@wizzi/utils");
function sendContent(res, contentType, content) {
    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': content ? content.length : 0
    });
    res.end(content);
}
const sendHtml = (res, content) => sendContent(res, 'text/html', content);
exports.sendHtml = sendHtml;
const sendError = (res, error) => {
    res.status(200);
    res.type('text');
    res.send(prettifyError(error));
};
exports.sendError = sendError;
const sendFailure = 
// _ res.type('application/json')
// _ res.send(error)
(res, error, status) => {
    res.status(error && error.status ? error.status : status);
    res.type('text');
    res.send(prettifyError(error));
};
exports.sendFailure = sendFailure;
const sendSuccess = (res, message) => {
    res.status(200);
    res.type('application/json');
    res.send(message);
};
exports.sendSuccess = sendSuccess;
function sendPromiseResult(res, message) {
    message.then((result) => 
    // console.log('sendPromiseResult.ok', result);
    (0, exports.sendSuccess)(res, result)).catch((err) => {
        console.log("[31m%s[0m", 'sendPromiseResult.err', err);
        (0, exports.sendFailure)(res, err, 500);
    });
}
exports.sendPromiseResult = sendPromiseResult;
function sendPromiseLikeResult(res, message) {
    message.then((result) => (0, exports.sendSuccess)(res, result));
}
exports.sendPromiseLikeResult = sendPromiseLikeResult;
function prettifyError(error) {
    var hint = error.hint;
    if (!hint && error.data && error.data.inner) {
        hint = error.data.inner.hint;
    }
    if (hint) {
        return utils_1.verify.htmlEscape((0, json_stringify_safe_1.default)({
            errorName: error.errorName,
            message: error.message,
            hint: hint
        }, null, 2));
    }
    else {
        return utils_1.verify.htmlEscape((0, json_stringify_safe_1.default)(error, null, 2));
    }
}
//# sourceMappingURL=sendResponse.js.map