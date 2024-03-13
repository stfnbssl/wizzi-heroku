"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInViewMiddleware = void 0;
const config_1 = require("../features/config");
//
const UserInViewMiddleware = (app) => app.use((request, response, next) => {
    request.session.user = {
        id: 'local_' + config_1.config.userUserName,
        username: config_1.config.userUserName,
        displayName: config_1.config.userDisplayName,
        picture: config_1.config.userAvatarUrl
    };
    response.locals.user = request.session.user;
    next();
});
exports.UserInViewMiddleware = UserInViewMiddleware;
//# sourceMappingURL=userInViews.js.map