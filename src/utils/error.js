"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_REGISTERED_YET = exports.CONTEST_NOT_FOUND = exports.SEND_EMAIL_ERROR = exports.OTP_EXPIRED = exports.OTP_INVALID = exports.LOGIN_REQUIRED = exports.SYSTEM_ERROR = exports.USERNAME_EXISTS = exports.EMAIL_EXISTS = exports.LOGOUT_REQUIRED = exports.EMAIL_USERNAME_PASSWORD_INVALID = exports.USER_NOT_FOUND = exports.MISSING_USER_ID = exports.MISSING_FULLNAME = exports.MISSING_EMAIL = exports.MISSING_REQUIRED_FIELDS = exports.FcError = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\utils\error.ts.ittf
*/
const MISSING_REQUIRED_FIELDS = 1000;
exports.MISSING_REQUIRED_FIELDS = MISSING_REQUIRED_FIELDS;
const MISSING_EMAIL = 1002;
exports.MISSING_EMAIL = MISSING_EMAIL;
const MISSING_FULLNAME = 1003;
exports.MISSING_FULLNAME = MISSING_FULLNAME;
const MISSING_USER_ID = 1004;
exports.MISSING_USER_ID = MISSING_USER_ID;
const USER_NOT_FOUND = 2001;
exports.USER_NOT_FOUND = USER_NOT_FOUND;
const LOGIN_REQUIRED = 3001;
exports.LOGIN_REQUIRED = LOGIN_REQUIRED;
const USERNAME_EXISTS = 3002;
exports.USERNAME_EXISTS = USERNAME_EXISTS;
const EMAIL_EXISTS = 3003;
exports.EMAIL_EXISTS = EMAIL_EXISTS;
const EMAIL_USERNAME_PASSWORD_INVALID = 3006;
exports.EMAIL_USERNAME_PASSWORD_INVALID = EMAIL_USERNAME_PASSWORD_INVALID;
const LOGOUT_REQUIRED = 3007;
exports.LOGOUT_REQUIRED = LOGOUT_REQUIRED;
const OTP_INVALID = 3008;
exports.OTP_INVALID = OTP_INVALID;
const OTP_EXPIRED = 3009;
exports.OTP_EXPIRED = OTP_EXPIRED;
const CONTEST_NOT_FOUND = 3103;
exports.CONTEST_NOT_FOUND = CONTEST_NOT_FOUND;
const NOT_REGISTERED_YET = 3201;
exports.NOT_REGISTERED_YET = NOT_REGISTERED_YET;
const SYSTEM_ERROR = 4002;
exports.SYSTEM_ERROR = SYSTEM_ERROR;
const SEND_EMAIL_ERROR = 4003;
exports.SEND_EMAIL_ERROR = SEND_EMAIL_ERROR;
let errorMap = {};
errorMap[MISSING_REQUIRED_FIELDS] = "Missing required field(s)";
errorMap[MISSING_EMAIL] = "Missing email";
errorMap[MISSING_FULLNAME] = "Missing fullname";
errorMap[MISSING_USER_ID] = "Missing user ID";
errorMap[USERNAME_EXISTS] = "Username already exists";
errorMap[EMAIL_EXISTS] = "Email already exists";
errorMap[USER_NOT_FOUND] = "User not found";
errorMap[EMAIL_USERNAME_PASSWORD_INVALID] = "Email/Username or password is invalid";
errorMap[LOGOUT_REQUIRED] = "Logout required";
errorMap[SYSTEM_ERROR] = "System Error";
errorMap[LOGIN_REQUIRED] = "Login required";
errorMap[OTP_INVALID] = "OTP is invalid";
errorMap[OTP_EXPIRED] = "OTP is expired";
errorMap[SEND_EMAIL_ERROR] = "Send email Error";
errorMap[CONTEST_NOT_FOUND] = "Contest not found";
errorMap[NOT_REGISTERED_YET] = "Not registered yet";
class FcError extends Error {
    constructor(errCode, data = null) {
        super(errorMap[errCode]);
        this.code = errCode;
        this.message = errorMap[errCode];
        this.data = data;
    }
}
exports.FcError = FcError;
//# sourceMappingURL=error.js.map