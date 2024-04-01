"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeJsExecToEventStream = exports.nodeJsExec = exports.spawnExecToEventStream = exports.spawnExec = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\utils\scripts\scriptManager.ts.ittf
    utc time: Mon, 01 Apr 2024 13:37:59 GMT
*/
const path_1 = tslib_1.__importDefault(require("path"));
const cp = tslib_1.__importStar(require("child_process"));
// var npm = require('npm')
var babelParser = null;
var babelCore = null;
var prettier = null;
var webpack = null;
var MemoryFS = null;
var memoryFS = null;
const DEFAULT_PRETTIER_CONFIG = {
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: "babylon",
    printWidth: 80,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "none",
    useTabs: false
};
function spawnExec(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var response = options.__response;
        if (response) {
            response.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-control": "no-cache"
            });
        }
        var temp, str = "", stdout = [], responseEnded = false, sentCallback = false;
        return new Promise((resolve, reject) => {
            try {
                var spw = cp.spawn(options.command, options.args, {
                    cwd: options.cwd,
                    env: {},
                    argv0: undefined,
                    stdio: undefined,
                    detached: false,
                    shell: options.shell || true,
                    windowsVerbatimArguments: false,
                    windowsHide: false
                });
                spw.stdout.on('data', function (data) {
                    temp = data.toString();
                    console.log(temp, __filename);
                    stdout.push(temp);
                    if (response && !responseEnded) {
                        str += temp;
                        var lines = str.split("\n");
                        for (var i = 0; i < lines.length; i++) {
                            if (i == lines.length - 1) {
                                str = lines[i];
                            }
                            // Note: The double-newline is *required*
                            else {
                                response.write('data: ' + lines[i] + "\n\n");
                            }
                        }
                    }
                });
                spw.on('close', function (code) {
                    console.log("close", code, __filename);
                    if (response && !responseEnded) {
                        response.write('data: ***___CLOSE___***\n\n');
                        response.end(str);
                        responseEnded = true;
                    }
                    if (sentCallback == false) {
                        sentCallback = true;
                        return resolve({
                            error: false,
                            stdout: stdout
                        });
                    }
                });
                spw.stderr.on('data', function (data) {
                    temp = data.toString();
                    console.log("stderr:", temp, __filename);
                    if (response && !responseEnded) {
                        str += temp;
                        var lines = str.split("\n");
                        for (var i = 0; i < lines.length; i++) {
                            if (i == lines.length - 1) {
                                str = lines[i];
                            }
                            // Note: The double-newline is *required*
                            // TODO _ response.end('stderr: ' + temp)
                            else {
                                response.write('data: ' + lines[i] + "\n\n");
                            }
                        }
                        response.write('data: ***___CLOSE___***\n\n');
                        response.end(str);
                        responseEnded = true;
                    }
                    if (sentCallback == false) {
                        sentCallback = true;
                        return resolve({
                            error: true,
                            stderr: temp
                        });
                    }
                });
            }
            catch (ex) {
                return reject(ex);
            }
        });
    });
}
exports.spawnExec = spawnExec;
function spawnExecToEventStream(options, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options.__response = response;
        return spawnExec(options);
    });
}
exports.spawnExecToEventStream = spawnExecToEventStream;
function nodeJsExec(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var scriptPath = options.scriptPath;
        var scriptArgs = options.args;
        var args = [path_1.default.basename(scriptPath)];
        if (scriptArgs && scriptArgs.length > 0) {
            args = args.concat(scriptArgs);
        }
        return spawnExec({
            command: 'node',
            cwd: path_1.default.dirname(scriptPath),
            args: args
        });
    });
}
exports.nodeJsExec = nodeJsExec;
function nodeJsExecToEventStream(options, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var scriptPath = options.scriptPath;
        var scriptArgs = options.args;
        var args = [path_1.default.basename(scriptPath)];
        if (scriptArgs && scriptArgs.length > 0) {
            args = args.concat(scriptArgs);
        }
        spawnExecToEventStream({
            command: 'node',
            cwd: path_1.default.dirname(scriptPath),
            args: args
        }, response);
    });
}
exports.nodeJsExecToEventStream = nodeJsExecToEventStream;
//# sourceMappingURL=scriptManager.js.map