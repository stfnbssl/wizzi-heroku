"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
exports.default = (request, response, next) => {
    console.log('webSecured called', request.session && request.session.user, __filename);
    if (request.session && request.session.user) {
        return next();
    }
    request.session.returnTo = request.originalUrl;
    response.redirect('/auth/login');
};
//# sourceMappingURL=webSecured.js.map