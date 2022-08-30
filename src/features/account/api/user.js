"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserFromSignup = exports.validateUserNotUsed = exports.getUserByEmail = exports.validateUsername = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\account\api\user.tsx.ittf
*/
const user_1 = require("../mongo/user");
const myname = 'features.account.api.user';
function validateUsername(chosenUsername) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const User = (0, user_1.GetUserModel)();
        return new Promise((resolve, reject) => {
            let query = { username: chosenUsername };
            User.find(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'username already in use'
                    });
                }
                resolve({
                    isValid: true
                });
            });
        });
    });
}
exports.validateUsername = validateUsername;
function getUserByEmail(email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const User = (0, user_1.GetUserModel)();
        var query = {
            email: {
                $exists: true,
                $eq: email
            }
        };
        return new Promise((resolve, reject) => User.find(query, function (err, result) {
            if (err) {
                console.log(myname, 'getUserByEmail', 'User.find', 'error', err, __filename);
                return reject(err);
            }
            if (result.length == 1) {
                return resolve({
                    found: true,
                    user: result[0]._doc
                });
            }
            return resolve({
                found: false
            });
        }));
    });
}
exports.getUserByEmail = getUserByEmail;
function validateUserNotUsed(chosenUsername, email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const User = (0, user_1.GetUserModel)();
        return new Promise((resolve, reject) => {
            let query = {
                username: {
                    $exists: true,
                    $eq: chosenUsername
                }
            };
            User.find(query, function (err, result) {
                if (err) {
                    console.log(myname, 'validateUserNotUsed', 'User.find', 'error', err, __filename);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                        isValid: false,
                        message: 'username already in use'
                    });
                }
                let query = {
                    email: {
                        $exists: true,
                        $eq: email
                    }
                };
                User.find(query, function (err, result) {
                    if (err) {
                        console.log(myname, 'validateUserNotUsed', 'User.find', 'error', err, __filename);
                        return reject(err);
                    }
                    if (result.length == 1) {
                        return resolve({
                            isValid: false,
                            message: 'email already in use'
                        });
                    }
                    resolve({
                        isValid: true
                    });
                });
            });
        });
    });
}
exports.validateUserNotUsed = validateUserNotUsed;
function createUserFromSignup(signupData) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const User = (0, user_1.GetUserModel)();
        return new Promise((resolve, reject) => validateUserNotUsed(signupData.wizziUserName, signupData.email).then((result) => {
            if (result.isValid) {
                const newUser = new User({
                    username: signupData.wizziUserName,
                    email: signupData.email,
                    openid_provider: signupData.openidProvider,
                    name: signupData.name,
                    avatar_url: signupData.avatarUrl,
                    created_at: new Date(),
                    updated_at: new Date(),
                    last_access_at: new Date()
                });
                newUser.save(function (err, doc) {
                    if (err) {
                        console.log(myname, 'createUserFromSignup', 'newUser.save', newUser, 'error', err, __filename);
                        return reject(err);
                    }
                    return resolve({
                        created: true,
                        user: doc._doc,
                        message: 'user created'
                    });
                });
            }
            else {
                resolve({
                    created: false,
                    message: result.message
                });
            }
        }).catch(err => reject(err)));
    });
}
exports.createUserFromSignup = createUserFromSignup;
//# sourceMappingURL=user.js.map