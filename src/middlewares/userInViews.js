"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInViewMiddleware = void 0;
//
const UserInViewMiddleware = (app) => app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});
exports.UserInViewMiddleware = UserInViewMiddleware;
//# sourceMappingURL=userInViews.js.map