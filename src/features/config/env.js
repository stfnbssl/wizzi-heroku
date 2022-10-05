"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packiConfigPath = exports.packiFilePrefixExtract = exports.packiFilePrefix = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\config\env.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const envalid_1 = require("envalid");
// see https://devcenter.heroku.com/articles/node-best-practices#be-environmentally-aware
function validateEnv() {
    dotenv_1.default.config();
    let checkedEnv = (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)(),
        SESSION_SECRET: (0, envalid_1.str)(),
        NO_CACHE: (0, envalid_1.bool)(),
        CORS_CLIENT_ORIGIN: (0, envalid_1.str)(),
        MONGO_HOST: (0, envalid_1.str)(),
        MONGO_USER: (0, envalid_1.str)(),
        MONGO_PASSWORD: (0, envalid_1.str)(),
        MONGO_PATH: (0, envalid_1.str)(),
        GITHUB_CLIENT_ID: (0, envalid_1.str)(),
        GITHUB_CLIENT_SECRET: (0, envalid_1.str)(),
        GITHUB_CALLBACK_URL: (0, envalid_1.str)(),
        GOOGLE_CLIENT_ID: (0, envalid_1.str)(),
        GOOGLE_CLIENT_SECRET: (0, envalid_1.str)(),
        GOOGLE_CALLBACK_URL: (0, envalid_1.str)(),
        GITHUB_ACCESS_TOKEN: (0, envalid_1.str)(),
        IS_WIZZI_DEV: (0, envalid_1.bool)(),
        WIZZI_BASE_PATH: (0, envalid_1.str)()
    });
    return checkedEnv;
}
exports.packiFilePrefix = 'json:/';
exports.packiFilePrefixExtract = 'json:/';
exports.packiConfigPath = '.packi/config.json.ittf';
let config;
function create() {
    if (config == null) {
        const checkedEnv = validateEnv();
        const __rootPath = path_1.default.join(__dirname, '..', '..', '..');
        const __ittfPath = path_1.default.join(__rootPath, 'ittf');
        const __dataPath = path_1.default.join(__rootPath, 'data');
        config = {
            port: checkedEnv.PORT,
            sessionSecret: checkedEnv.SESSION_SECRET,
            noCache: checkedEnv.NO_CACHE,
            corsClientOrigin: checkedEnv.CORS_CLIENT_ORIGIN,
            mongoHost: checkedEnv.MONGO_HOST,
            mongoUser: checkedEnv.MONGO_USER,
            mongoPassword: checkedEnv.MONGO_PASSWORD,
            mongoPath: checkedEnv.MONGO_PATH,
            mongoConnectUrl: "",
            githubClientId: checkedEnv.GITHUB_CLIENT_ID,
            githubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET,
            githubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL,
            googleClientId: checkedEnv.GOOGLE_CLIENT_ID,
            googleClientSecret: checkedEnv.GOOGLE_CLIENT_SECRET,
            googleCallbackURL: checkedEnv.GOOGLE_CALLBACK_URL,
            githubAccessToken: checkedEnv.GITHUB_ACCESS_TOKEN,
            isWizziDev: checkedEnv.IS_WIZZI_DEV,
            wizziBasePath: checkedEnv.WIZZI_BASE_PATH,
            ittfPath: __ittfPath,
            dataPath: __dataPath,
            metaHtmlIttfPath: path_1.default.join(__ittfPath, 'meta', 'html', 'index.html.ittf'),
            metaFolderIttfPath: path_1.default.join(__ittfPath, 'meta', 'folder', 'index.html.ittf'),
            metaHtmlTextPath: path_1.default.join(__ittfPath, 'meta', 'text', 'index.html.ittf')
        };
        const { mongoHost, mongoUser, mongoPassword, mongoPath } = config;
        if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
            config.mongoConnectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
        }
        // example 'mongodb://localhost/test'
        else {
            config.mongoConnectUrl = `${mongoPath}`;
        }
        Object.keys(config).forEach((element) => {
            if (element.indexOf("Pass") < 0 && element.indexOf("Secr") < 0) {
                console.log('Created config', element, config[element]);
            }
        });
    }
    return config;
}
exports.default = create;
//# sourceMappingURL=env.js.map