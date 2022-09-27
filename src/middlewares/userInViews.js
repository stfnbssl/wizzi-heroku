"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInViewMiddleware = void 0;
//
const UserInViewMiddleware = (app) => app.use((request, response, next) => {
    response.locals.user = request.session.user;
    next();
});
exports.UserInViewMiddleware = UserInViewMiddleware;
//# sourceMappingURL=userInViews.js.map