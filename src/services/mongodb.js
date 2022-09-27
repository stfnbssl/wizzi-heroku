"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.mongodbStart = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
function mongodbStart(config, modelBuilders) {
    let connectUrl;
    const { mongoHost, mongoUser, mongoPassword, mongoPath } = config;
    if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
        connectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
    }
    // example 'mongodb://localhost/test'
    else {
        connectUrl = `${mongoPath}`;
    }
    // TODO (VIA) set mongoose.Promise = global.Promise
    return mongoose_1.default.connect(connectUrl).then(() => {
        console.log("[32m%s[0m", 'Mongodb. Connected to', mongoPath);
        modelBuilders.forEach(builder => builder.buildModel());
        return 'Connected';
    }, (err) => {
        throw new Error('\n\nMongodb. \nCannot connect to \n"' + connectUrl + '". \n\n' + err.message + '\n\n');
    });
}
exports.mongodbStart = mongodbStart;
const close = () => mongoose_1.default.connection.close();
exports.close = close;
//# sourceMappingURL=mongodb.js.map