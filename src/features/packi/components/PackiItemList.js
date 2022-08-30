"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function PackiItemList(props) {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("ul", { children: props.items.map((item, ndx) => {
                return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                            padding: '30px',
                            borderBottom: '1px solid #cecece'
                        } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                                    padding: '5px'
                                } }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: '/~~/stfnbssl/' + item.name }, { children: item.name })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                                    padding: '5px',
                                    fontSize: '0.8em'
                                } }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: '/~~/' + item._id.toString() }, { children: item._id.toString() })) }))] })) }, ndx));
            }) }) }));
}
exports.default = PackiItemList;
//# sourceMappingURL=PackiItemList.js.map