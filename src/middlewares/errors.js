"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsMiddleware = void 0;
const tslib_1 = require("tslib");
const httpException_1 = tslib_1.__importDefault(require("../httpException"));
const ErrorsMiddleware = (app) => {
    app.use(// catch 404 and forward to error handler
    function (request, res, next) {
        var err = new httpException_1.default(404, 'Not Found');
        next(err);
    });
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, request, res, next) {
            res.status(err.status || 500);
            res.render('error.html.ittf', {
                message: err.message,
                error: err
            });
        });
    }
    // production error handler
    // no stacktraces leaked to user
    else {
        app.use(function (err, request, res, next) {
            res.status(err.status || 500);
            res.render('error.html.ittf', {
                message: err.message,
                error: err
            });
        });
    }
    console.log("[32m%s[0m", 'ErrorsMiddleware installed');
};
exports.ErrorsMiddleware = ErrorsMiddleware;
//# sourceMappingURL=errors.js.map