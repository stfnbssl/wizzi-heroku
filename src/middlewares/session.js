"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMiddleware = void 0;
const tslib_1 = require("tslib");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const connect_mongo_1 = tslib_1.__importDefault(require("connect-mongo"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = require("../features/config");
const SessionMiddleware = (app) => {
    const cookieOptions = {
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false,
        httpOnly: true,
        // expires in 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000
    };
    const sessionOptions = {
        name: 'wizzi-heroku.sid',
        secret: config_1.config.sessionSecret,
        store: connect_mongo_1.default.create(
        // save session 14 days
        {
            client: mongoose_1.default.connection.getClient(),
            ttl: 14 * 24 * 60 * 60
        }),
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: false
    };
    app.use((0, express_session_1.default)(sessionOptions));
    console.log("SessionMiddleware installed, using MongoStore", mongoose_1.default.connection.getClient(), __filename);
};
exports.SessionMiddleware = SessionMiddleware;
//# sourceMappingURL=session.js.map