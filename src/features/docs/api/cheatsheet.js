"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheatsheet = void 0;
const tslib_1 = require("tslib");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\src\features\docs\api\cheatsheet.ts.ittf
*/
const path_1 = tslib_1.__importDefault(require("path"));
const wizzi_utils_1 = require("wizzi-utils");
const wizzi_1 = require("../../wizzi");
function getCheatsheet(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var csPath = path_1.default.join(__dirname, '..', '..', '..', '..', 'ittf', 'models', 'cheatsheets', name, 'index.ittf.ittf');
            wizzi_1.wizziProds.mTreeFs(csPath, {}).then(
            // items are ittf fragments that will be ittf/prettified and generated
            // the resulting cheatsheet context object that will be returned when built
            (result) => {
                const mTree = result.mTree;
                var _all_items = [];
                var result = {
                    name: name,
                    elements: []
                };
                var i, i_items = mTree.nodes[0].children, i_len = mTree.nodes[0].children.length, itemTop;
                for (i = 0; i < i_len; i++) {
                    itemTop = mTree.nodes[0].children[i];
                    // set properties of result
                    if (itemTop.n !== 'element') {
                        result[itemTop.n] = itemTop.v;
                    }
                }
                var i, i_items = mTree.nodes[0].children, i_len = mTree.nodes[0].children.length, itemTop;
                for (i = 0; i < i_len; i++) {
                    itemTop = mTree.nodes[0].children[i];
                    // log itemTop.n, itemTop.v
                    if (itemTop.n === 'element') {
                        var elementResult = {
                            name: itemTop.v,
                            items: []
                        };
                        var j, j_items = itemTop.children, j_len = itemTop.children.length, itemEl;
                        for (j = 0; j < j_len; j++) {
                            itemEl = itemTop.children[j];
                            // ittf fragment
                            if (itemEl.n === 'item') {
                                var itemResult = {
                                    schema: result.schema,
                                    render: 'artifact'
                                };
                                var k, k_items = itemEl.children, k_len = itemEl.children.length, item;
                                for (k = 0; k < k_len; k++) {
                                    item = itemEl.children[k];
                                    // log item.n, mTree.toIttf(item.children[0])
                                    if (item.n === 'ittf') {
                                        if (item.children.length == 1) {
                                            // is already ok, has the correct root
                                            if ((result.schema === 'json' && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === wizzi_1.wizziMaps.ittfRootFromSchema(result.schema) || wizzi_1.wizziMaps.ittfRootFromSchema(result.schema) === 'any') {
                                                itemResult[item.n] = mTree.toIttf(item.children[0]);
                                                itemResult[item.n + 'Wrapped'] = itemResult[item.n];
                                            }
                                            // wrap it
                                            else {
                                                var ittfNode = wrapperForSchema(result.schema);
                                                var l, l_items = item.children, l_len = item.children.length, node;
                                                for (l = 0; l < l_len; l++) {
                                                    node = item.children[l];
                                                    ittfNode.children.push(node);
                                                }
                                                itemResult[item.n] = mTree.toIttf(item.children[0]);
                                                itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                            }
                                        }
                                        // wrap them
                                        else {
                                            var ittfNode = wrapperForSchema(result.schema);
                                            var l, l_items = item.children, l_len = item.children.length, node;
                                            for (l = 0; l < l_len; l++) {
                                                node = item.children[l];
                                                ittfNode.children.push(node);
                                            }
                                            itemResult[item.n] = mTree.toIttf(item.children[0]);
                                            itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                        }
                                    }
                                    else if (item.n === 'expected') {
                                        itemResult[item.n] = buildExpected(item).trim();
                                    }
                                    // log item.n, item.v
                                    else {
                                        itemResult[item.n] = item.v;
                                    }
                                }
                                elementResult.items.push(itemResult);
                                _all_items.push(itemResult);
                            }
                            else {
                                elementResult[itemEl.n] = itemEl.v;
                            }
                        }
                        result.elements.push(elementResult);
                    }
                }
                var item_count = 0;
                // log 'contextLoader.prettify', JSON.stringify(item.ittf, null, 2)
                (function next() {
                    var item = _all_items[item_count++];
                    if (!item) {
                        return resolve(result);
                    }
                    wizzi_utils_1.pretty.prettifyIttfHtmlFromString(item.ittf, function (err, pretty) {
                        if (err) {
                            item.ittfPretty = JSON.stringify(err, null, 4);
                        }
                        else {
                            item.ittfPretty = pretty;
                        }
                        if (item.render === 'script') {
                            wizzi_1.wizziProds.mTreeBuildupScript('index.ittf.ittf', {
                                ['index.ittf.ittf']: {
                                    type: 'CODE',
                                    contents: item.ittfWrapped
                                }
                            }, {}).then((mTreeBuildupScript) => {
                                if (mTreeBuildupScript.__is_error) {
                                    item.generated = wizzi_utils_1.verify.htmlEscape(JSON.stringify(mTreeBuildupScript, null, 2));
                                }
                                else {
                                    item.generated = wizzi_utils_1.verify.htmlEscape(mTreeBuildupScript);
                                }
                                item.generated = item.generated ? item.generated.trim() : 'No result. Something went wrong!';
                                next();
                            });
                        }
                        else {
                            const mainIttf = 'index.' + item.schema + '.ittf';
                            wizzi_1.wizziProds.generateArtifact(mainIttf, {
                                [mainIttf]: {
                                    type: 'CODE',
                                    contents: item.ittfWrapped
                                }
                            }, {
                                artifactContext: {
                                    noUseStrict: true,
                                    noGeneratorComments: true
                                }
                            }).then((result) => {
                                const artifactText = wizzi_utils_1.verify.htmlEscape(result.artifactContent);
                                item.generated = artifactText ? artifactText.trim() : 'No result. Something went wrong!';
                                next();
                            }).catch((err) => {
                                console.log('getCheatsheet.generateArtifact.error', err, __filename);
                                return reject(err);
                            });
                        }
                    });
                })();
            }).catch((err) => {
                console.log('cheatsheetApi.getCheatsheet.error', err, __filename);
                return reject(err);
            });
        });
    });
}
exports.getCheatsheet = getCheatsheet;
function wrapperForSchema(schema) {
    if (schema === 'js' || schema === 'jsx') {
        return {
            n: 'module',
            children: [
                {
                    n: 'kind',
                    v: 'react',
                    children: []
                }
            ]
        };
    }
    else if (schema === 'ts') {
        return {
            n: 'module',
            children: []
        };
    }
    else {
        return {
            n: schema,
            children: []
        };
    }
}
function buildExpected(ittf, sb, indent) {
    if (typeof sb === 'undefined') {
        sb = [];
        var i, i_items = ittf.children, i_len = ittf.children.length, item;
        for (i = 0; i < i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, 0);
        }
        return wizzi_utils_1.verify.htmlEscape(sb.join(''));
    }
    // to avoid ts error
    else {
        sb.push(new Array(indent).join(' '));
        sb.push(ittf.v + '\n');
        var i, i_items = ittf.children, i_len = ittf.children.length, item;
        for (i = 0; i < i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, (indent || 0) + 4);
        }
        return '';
    }
}
//# sourceMappingURL=cheatsheet.js.map