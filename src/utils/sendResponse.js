"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromiseLikeResult = exports.sendPromiseResult = exports.sendSuccess = exports.sendFailure = exports.sendError = exports.sendHtml = void 0;
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
    res.type('application/json');
    res.send({
        err: error,
        message: error && error.message,
        stack: error && error.stack
    });
};
exports.sendError = sendError;
const sendFailure = (res, error, status) => {
    res.status(error && error.status ? error.status : status);
    res.type('application/json');
    res.send(error);
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
//# sourceMappingURL=sendResponse.js.map