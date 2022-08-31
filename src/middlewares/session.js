"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMiddleware = void 0;
const tslib_1 = require("tslib");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const connect_mongo_1 = tslib_1.__importDefault(require("connect-mongo"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = require("../features/config");
const SessionMiddleware = (app) => {
    console.log("SessionMiddleware process.env.NODE_ENV: " + process.env.NODE_ENV, __filename);
    const cookieOptions = {
        // serve secure cookies, requires https
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: false,
        sameSite: 'none',
        // expires in 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000
    };
    let connectUrl;
    const { mongoHost, mongoUser, mongoPassword, mongoPath } = config_1.config;
    if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
        connectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
    }
    // example 'mongodb://localhost/test'
    else {
        connectUrl = `${mongoPath}`;
    }
    const sessionOptions = {
        name: 'wizzi-heroku.sid',
        secret: config_1.config.sessionSecret,
        store: connect_mongo_1.default.create(
        // save session 14 days
        {
            mongoUrl: connectUrl,
            dbName: "wizzi",
            stringify: false,
            ttl: 14 * 24 * 60 * 60
        }),
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: false
    };
    if (process.env.NODE_ENV == "production") {
        app.set('trust proxy', 1);
    }
    app.use((0, express_session_1.default)(sessionOptions));
    console.log("SessionMiddleware installed, using MongoStore", connectUrl, __filename);
    console.log("SessionMiddleware installed, mongoose.connection.getClient() was", mongoose_1.default.connection.getClient(), __filename);
};
exports.SessionMiddleware = SessionMiddleware;
//# sourceMappingURL=session.js.map