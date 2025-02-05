/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\utils\error.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
const MISSING_REQUIRED_FIELDS = 1000;
const MISSING_EMAIL = 1002;
const MISSING_FULLNAME = 1003;
const MISSING_USER_ID = 1004;
const USER_NOT_FOUND = 2001;
const LOGIN_REQUIRED = 3001;
const USERNAME_EXISTS = 3002;
const EMAIL_EXISTS = 3003;
const EMAIL_USERNAME_PASSWORD_INVALID = 3006;
const LOGOUT_REQUIRED = 3007;
const OTP_INVALID = 3008;
const OTP_EXPIRED = 3009;
const CONTEST_NOT_FOUND = 3103;
const NOT_REGISTERED_YET = 3201;
const SYSTEM_ERROR = 4002;
const SEND_EMAIL_ERROR = 4003;
let errorMap: { 
    [k: string]: any;
} = {};
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
    constructor(errCode: number, data: any = null) {
        super(errorMap[errCode]);
        this.code = errCode;
        this.message = errorMap[errCode];
        this.data = data;
    }
    public code: number;
    public message: string;
    public data: any;
}
export {
    FcError, 
    MISSING_REQUIRED_FIELDS, 
    MISSING_EMAIL, 
    MISSING_FULLNAME, 
    MISSING_USER_ID, 
    USER_NOT_FOUND, 
    EMAIL_USERNAME_PASSWORD_INVALID, 
    LOGOUT_REQUIRED, 
    EMAIL_EXISTS, 
    USERNAME_EXISTS, 
    SYSTEM_ERROR, 
    LOGIN_REQUIRED, 
    OTP_INVALID, 
    OTP_EXPIRED, 
    SEND_EMAIL_ERROR, 
    CONTEST_NOT_FOUND, 
    NOT_REGISTERED_YET
 }