"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMiddleware = void 0;
const tslib_1 = require("tslib");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const config_1 = require("../features/config");
const SessionMiddleware = (app) => {
    console.log("SessionMiddleware process.env.NODE_ENV: " + process.env.NODE_ENV);
    const cookieOptions = {
        // serve secure cookies, requires https
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: false,
        sameSite: 'none',
        // expires in 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000
    };
    const sessionOptions = {
        name: 'wizzi.heroku-1010.sid',
        secret: config_1.config.sessionSecret,
        resave: false,
        saveUninitialized: false
    };
    if (process.env.NODE_ENV == "production") {
        app.set('trust proxy', 1);
    }
    app.use((0, express_session_1.default)(sessionOptions));
    console.log("SessionMiddleware installed");
};
exports.SessionMiddleware = SessionMiddleware;
//# sourceMappingURL=session.js.map