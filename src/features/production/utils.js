"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackiConfigContents = exports.createInitialPackiFiles = void 0;
function createInitialPackiFiles(contexts, tfolders, wizziSchema, mainIttf) {
    const packiFiles = {};
    if (wizziSchema && mainIttf) {
        packiFiles[mainIttf] = {
            type: 'CODE',
            contents: wizziSchema
        };
    }
    packiFiles['.packi/config.json.ittf'] = {
        type: 'CODE',
        contents: createPackiConfigContents(contexts, tfolders)
    };
    return packiFiles;
}
exports.createInitialPackiFiles = createInitialPackiFiles;
function createPackiConfigContents(contexts, tfolders) {
    const tfoldersObj = JSON.parse(tfolders || '[]');
    const contextsObj = JSON.parse(contexts || '[]');
    const sb = [];
    sb.push('{');
    sb.push('\t[ tfolders');
    var i, i_items = tfoldersObj, i_len = tfoldersObj.length, tf;
    for (i = 0; i < i_len; i++) {
        tf = tfoldersObj[i];
        sb.push('\t\t{');
        sb.push('\t\t\tname "' + tf.name + '"');
    }
    sb.push('\t[ contexts');
    var i, i_items = contextsObj, i_len = contextsObj.length, ctx;
    for (i = 0; i < i_len; i++) {
        ctx = contextsObj[i];
        sb.push('\t\t{');
        sb.push('\t\t\tname "' + ctx.name + '"');
    }
    return sb.join('\n');
}
exports.createPackiConfigContents = createPackiConfigContents;
//# sourceMappingURL=utils.js.map