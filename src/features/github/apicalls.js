"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContents = exports.getCommits = exports.updateBranch = exports.cloneBranch = exports.createBranch = exports.getBranches = exports.getRevisions = exports.createRepository = exports.getPackiTemplateRepositories = exports.getRepository = exports.getRepositories = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\github\apicalls.ts.ittf
*/
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const path_1 = tslib_1.__importDefault(require("path"));
const isomorphic_git_1 = tslib_1.__importDefault(require("isomorphic-git"));
const node_1 = tslib_1.__importDefault(require("isomorphic-git/http/node"));
const memfs_1 = require("memfs");
const wizzi_utils_1 = require("wizzi-utils");
const volume = new memfs_1.Volume();
const fs = (0, memfs_1.createFsFromVolume)(volume);
fs.kind = 'filesystem';
const wizzifs = wizzi_utils_1.fSystem.vfile(fs);
function getRepositories(accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/user/repos`, getOptions(accessToken)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.getRepositories = getRepositories;
// const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
function getRepository(owner, repo, accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}`, getOptions(accessToken)).then(response => response.json()).then((responseData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            responseData._revisions = yield getRevisions(owner, repo, accessToken);
            ;
            responseData._commits = yield getCommits(owner, repo, accessToken);
            ;
            responseData._contents = yield getContents(owner, repo, accessToken);
            ;
            return responseData;
        }));
    });
}
exports.getRepository = getRepository;
function getPackiTemplateRepositories() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/users/stfnbssl/repos`, getOptions()).then(response => response.json()).then((responseData) => {
            return responseData.filter(value => value.name.startsWith('packi-template-'));
        });
    });
}
exports.getPackiTemplateRepositories = getPackiTemplateRepositories;
function createRepository(accessToken, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/user/repos`, postOptions(accessToken, options)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.createRepository = createRepository;
function getRevisions(owner, repo, accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads`, getOptions(accessToken)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.getRevisions = getRevisions;
function getBranches(owner, repo, accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/branches`, getOptions(accessToken)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.getBranches = getBranches;
function createBranch(accessToken, owner, repo, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/git/refs`, postOptions(accessToken, {
            ref: `refs/heads/${options.name}>`,
            sha: options.revisionFromHash
        })).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.createBranch = createBranch;
function cloneBranch(repo, branch = 'master', kind = 'all') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        volume.reset();
        const dir = '/' + repo.name;
        return new Promise((resolve, reject) => fs.mkdir(dir, (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (err) {
                return reject(err);
            }
            yield isomorphic_git_1.default.clone({
                fs,
                http: node_1.default,
                dir,
                url: `https://github.com/${repo.owner}/${repo.name}`,
                ref: `${branch}`,
                singleBranch: true,
                depth: 10,
                onAuth: (url) => {
                    return;
                    // oauth2format 'github'
                    {
                        password: repo.token;
                    }
                    ;
                }
            });
            let files = wizzifs.getFiles(dir, {
                deep: true,
                documentContent: true
            });
            const packies = {};
            files.forEach((file) => {
                if (file.relPath.startsWith('.git/') == false) {
                    if (kind === 'all' || kind === 'ittf' && file.relPath.endsWith('.ittf') == true) {
                        packies[file.relPath] = {
                            type: "CODE",
                            contents: file.content
                        };
                    }
                }
            });
            const log = yield isomorphic_git_1.default.log({
                fs,
                dir
            });
            resolve({
                owner: repo.owner,
                name: repo.name,
                description: '',
                branch,
                files: packies,
                commitHistory: log
            });
        })));
    });
}
exports.cloneBranch = cloneBranch;
function updateBranch(packiFiles, repo, branch = 'master') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        volume.reset();
        const dir = '/' + repo.name;
        fs.mkdir(dir, (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield isomorphic_git_1.default.clone({
                fs,
                http: node_1.default,
                dir,
                url: `https://github.com/${repo.owner}/${repo.name}`,
                ref: `${branch}`,
                singleBranch: true,
                depth: 10
            });
            /**
                *
                * Object.keys(packiFiles).forEach(filePath=> {
                * if (packiFiles[filePath].type === "CODE") {
                * fs.writeFileSync(path.join(dir, filePath), packiFiles[filePath].contents);
                * }
                * })
                *
            */
            // let msg = await git.log({fs, dir});
            // console.log(msg);
            let files = fs.readdirSync(dir);
            /**
                //
                // Object.keys(packiFiles).forEach(filePath=> {
                // if (packiFiles[filePath].type === "CODE") {
                // fs.writeFileSync(path.join(dir, filePath), packiFiles[filePath].contents);
                // }
                // })
                //
            */
            // let msg = await git.log({fs, dir});
            // console.log(msg);
            filesDiff(dir, packiFiles, (err, result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    Object.keys(result).forEach((entryName) => {
                        if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                            // fs.writeFileSync(path.join(dir, entryName), (result[entryName].b as FileDiffItem).content);
                            wizzifs.write(path_1.default.join(dir, entryName), result[entryName].b.content);
                        }
                        else {
                            if (([
                                '.gitignore',
                                'LICENSE',
                                'README.md'
                            ].indexOf(entryName)) < 0) {
                                fs.unlinkSync(path_1.default.join(dir, entryName));
                            }
                        }
                    });
                    yield printStatus(dir);
                    Object.keys(result).forEach((entryName) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                            yield isomorphic_git_1.default.add({
                                fs,
                                dir,
                                filepath: entryName
                            });
                        }
                        else {
                            if (([
                                '.gitignore',
                                'LICENSE',
                                'README.md'
                            ].indexOf(entryName)) < 0) {
                                yield isomorphic_git_1.default.remove({
                                    fs,
                                    dir,
                                    filepath: entryName
                                });
                            }
                        }
                    }));
                    yield printStatus(dir);
                    let msg = yield isomorphic_git_1.default.commit({
                        fs,
                        dir,
                        message: 'Packi git export ' + new Date().toDateString(),
                        author: {
                            name: 'packi',
                            email: 'packi@gmail.com'
                        }
                    });
                    // let msg = await git.listFiles({fs, dir});
                    // let msg = await git.listFiles({fs, dir});
                    yield printStatus(dir);
                    let pushResponse = yield isomorphic_git_1.default.push({
                        fs,
                        http: node_1.default,
                        dir,
                        remote: 'origin',
                        ref: `${branch}`,
                        onAuth: (url) => {
                            return;
                            // oauth2format 'github'
                            // username: repo.owner,
                            // password: repo.password,
                            // username: 'stfnbssl',
                            // password: 'gi++++01',
                            {
                                password: repo.token;
                            }
                            ;
                        }
                    });
                }
                catch (ex) {
                    console.log("[31m%s[0m", 'updateBranch.push. err', ex);
                }
            }));
        }));
    });
}
exports.updateBranch = updateBranch;
function getCommits(owner, repo, accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/commits`, getOptions(accessToken)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.getCommits = getCommits;
function getContents(owner, repo, accessToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/contents`, getOptions(accessToken)).then(response => response.json()).then((responseData) => {
            return responseData;
        });
    });
}
exports.getContents = getContents;
function filesDiff(dir, packiFiles, callback) {
    wizzifs.getFiles(dir, {
        deep: true,
        documentContent: true
    }, (err, result) => {
        const diff = {};
        result.forEach((entry) => {
            if (entry.relPath.startsWith('.git/') == false) {
                diff[entry.relPath] = {
                    kind: '-',
                    a: {
                        path: entry.relPath,
                        content: entry.content
                    }
                };
            }
        });
        Object.keys(packiFiles).forEach((entryName) => {
            if (diff[entryName]) {
                if (diff[entryName].a && (diff[entryName].a.content) === packiFiles[entryName].contents) {
                    delete diff[entryName];
                }
                else {
                    diff[entryName].kind = '<>';
                    diff[entryName].b = {
                        path: entryName,
                        content: packiFiles[entryName].contents
                    };
                }
            }
            else {
                diff[entryName] = {
                    kind: '+',
                    b: {
                        path: entryName,
                        content: packiFiles[entryName].contents
                    }
                };
            }
        });
        callback(null, diff);
    });
}
function printStatus(dir) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => wizzifs.getFiles(dir, {
            deep: true,
            documentContent: false
        }, (err, files) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (err) {
                return reject(err);
            }
            for (let file of files) {
                if (file.relPath.startsWith('.git/') == false) {
                    let msg = yield isomorphic_git_1.default.status({
                        fs,
                        dir,
                        filepath: file.relPath
                    });
                }
            }
            resolve();
        })));
    });
}
function getOptions(accessToken) {
    return {
        method: 'GET',
        headers: headers(accessToken)
    };
}
function postOptions(accessToken, body) {
    return {
        method: 'POST',
        headers: headers(accessToken),
        body: JSON.stringify(body)
    };
}
function headers(accessToken) {
    const ret = {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };
    if (accessToken) {
        ret['Authorization'] = 'token ' + accessToken;
    }
    return ret;
}
//# sourceMappingURL=apicalls.js.map