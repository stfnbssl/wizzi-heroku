"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsController = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const sendResponse_1 = require("../../utils/sendResponse");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils");
const wizziDocs_1 = require("../../features/wizziDocs");
function makeHandlerAwareOfAsyncErrors(handler) {
    return function (request, response, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(request, response, next);
            }
            catch (error) {
                if (error instanceof error_1.FcError) {
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: error.code,
                        message: error.message,
                        data: error.data || {}
                    });
                }
                else {
                    const fcError = new error_1.FcError(error_1.SYSTEM_ERROR);
                    response.status(utils_1.statusCode.BAD_REQUEST).send({
                        code: fcError.code,
                        message: error.message,
                        data: fcError.data || {}
                    });
                }
            }
        });
    };
}
class DocsController {
    constructor() {
        this.path = '/wizzi/docs';
        this.router = (0, express_1.Router)();
        this.initialize = (app, initValues) => {
            console.log("[33m%s[0m", 'Entering DocsController.initialize');
            this.router.get("/cheatsheet/:name", makeHandlerAwareOfAsyncErrors(this.cheatsheet));
        };
        this.cheatsheet = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return wizziDocs_1.cheatsheetApi.getCheatsheet(request.params.name).then(result => response.render('wizzi/docs/cheatsheet.html.ittf', {
                cs: result
            })).catch((err) => {
                console.log("[31m%s[0m", 'docs.cheatsheet.error', err);
                var content = err;
                if (typeof err === 'object' && err !== null) {
                    content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
                }
                (0, sendResponse_1.sendHtml)(response, content);
            });
        });
    }
}
exports.DocsController = DocsController;
//# sourceMappingURL=wizziDocs.js.map