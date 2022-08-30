"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsController = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\site\controllers\docs.ts.ittf
*/
const express_1 = require("express");
const sendResponse_1 = require("../../utils/sendResponse");
const docs_1 = require("../../features/docs");
class DocsController {
    constructor() {
        this.path = '/docs';
        this.router = (0, express_1.Router)();
        this.initialize = (initValues) => {
            console.log("[33m%s[0m", 'Entering DocsController.initialize');
            this.router.get('/cheatsheet/:name', this.cheatsheet);
        };
        this.cheatsheet = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return docs_1.cheatsheetApi.getCheatsheet(request.params.name).then(result => response.render('wizzi/docs/cheatsheet.html.ittf', {
                cs: result
            })).catch((err) => {
                console.log('docs.cheatsheet.error', err, __filename);
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
//# sourceMappingURL=docs.js.map