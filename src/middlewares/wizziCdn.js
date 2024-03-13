"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizziCdnMiddleware = void 0;
const tslib_1 = require("tslib");
const parseurl_1 = tslib_1.__importDefault(require("parseurl"));
const wizziCdn_1 = require("../features/wizziCdn");
const sendResponse_1 = require("../utils/sendResponse");
const myname = 'express.middleware.wizziCdn';
const cdnPath = '/cdn/v1';
const WizziCdnMiddleware = (app) => app.use(cdnPath, cdnMiddleware());
exports.WizziCdnMiddleware = WizziCdnMiddleware;
function cdnMiddleware() {
    return (request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            return next();
        }
        const parsedUrl = (0, parseurl_1.default)(request);
        if (!parsedUrl || !parsedUrl.pathname) {
            return next();
        }
        const pathname = decodeURIComponent(parsedUrl.pathname);
        const parts = pathname.split('/');
        let owner, cdnName;
        owner = parts[1];
        cdnName = parts.slice(2).join('/');
        _renderCdn(owner, cdnName, request, response);
    });
}
function _renderCdn(owner, cdnName, request, response) {
    wizziCdn_1.resourceApi.getWizziCdnResource(owner, cdnName).then((result) => {
        response.status(200);
        response.set('Content-Type', getContentType(cdnName));
        response.set('Content-Length', result.item.contents.length);
        response.send(result.item.contents);
    }).catch((err) => {
        console.log("[31m%s[0m", '' + myname + '_renderCdn.resourceApi.getWizziCdnResource.error', err);
        var content = err;
        if (typeof err === 'object' && err !== null) {
            content = '<html><body><pre><code>' + JSON.stringify(err, null, 4) + '</code></pre></body></html>';
        }
        (0, sendResponse_1.sendHtml)(response, content);
    });
}
function getContentType(name) {
    if (name.endsWith('.js')) {
        return 'application/x-javascript';
    }
    else if (name.endsWith('.css')) {
        return 'text/css';
    }
    else if (name.endsWith('.svg')) {
        return 'image/svg+xml';
    }
    else if (name.endsWith('.json')) {
        return 'application/json';
    }
    else {
        return 'text/plain';
    }
}
//# sourceMappingURL=wizziCdn.js.map