"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = exports.accountControllers = exports.accountModelBuilders = exports.accountModelGetters = exports.accountTypes = void 0;
const tslib_1 = require("tslib");
const accountTypes = tslib_1.__importStar(require("./types"));
exports.accountTypes = accountTypes;
const user_1 = require("./mongo/user");
const user_2 = require("./controllers/user");
const apiv1user_1 = require("./controllers/apiv1user");
const userApi = tslib_1.__importStar(require("./api/user"));
exports.userApi = userApi;
const accountModelGetters = {
    GetUserModel: user_1.GetUserModel
};
exports.accountModelGetters = accountModelGetters;
const accountModelBuilders = [
    user_1.UserModelBuilder
];
exports.accountModelBuilders = accountModelBuilders;
const accountControllers = [
    new user_2.UserController(),
    new apiv1user_1.ApiV1UserController()
];
exports.accountControllers = accountControllers;
//# sourceMappingURL=index.js.map