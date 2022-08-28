"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
function getSecured() {
    return function secured(req, res, next) {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/account/login');
    };
}
exports.default = getSecured;
//# sourceMappingURL=auth0Secured.js.map