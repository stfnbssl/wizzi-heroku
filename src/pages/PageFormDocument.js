"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\pages\PageFormDocument.tsx.ittf
    utc time: Mon, 01 Apr 2024 15:04:25 GMT
*/
const jsesc_1 = tslib_1.__importDefault(require("jsesc"));
const css = String.raw;
const PageCss = css `
              :root {
                --font-normal: -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                --font-monospace: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
                  monospace;
              }

              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: auto;
              }


              body {
                font-family: var(--font-normal);
                font-size: 14px;
                line-height: 1.42857143;
                overscroll-behavior: none;
              }

              div {
                scrollbar-width: thin;
                scrollbar-color: var(--color-disabled) var(--color-background);
              }

              @media (hover) {
                ::-webkit-scrollbar {
                  width: 12px;
                  height: 12px;
                  background: var(--color-background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--color-disabled);
                  border-radius: 10px;
                  border: 3px var(--color-background) solid;
                }
              }

              button,
              input,
              select,
              textarea {
                font: inherit;
                color: inherit;
                line-height: inherit;
              }

              button {
                cursor: pointer;
              }

              button[disabled] {
                cursor: default;
              }

              a {
                color: #4099ff;
              }
            `;
function PageFormDocument(props) {
    const { data, queryParams, content } = props;
    return ((0, jsx_runtime_1.jsxs)("html", { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("meta", { charSet: "utf-8" }), (0, jsx_runtime_1.jsx)("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width,minimum-scale=1,initial-scale=1" }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600" }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "/ittf/css/main.css.ittf" }), (0, jsx_runtime_1.jsx)("script", { src: "https://bundle.run/buffer@6.0.3" }), (0, jsx_runtime_1.jsx)("style", { type: "text/css", dangerouslySetInnerHTML: {
                            __html: PageCss
                        } }), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                            __html: `  window.__INITIAL_DATA__ = ${(0, jsesc_1.default)({
                                data,
                                queryParams
                            }, {
                                quotes: 'double',
                                isScriptContext: true
                            })}`
                        } })] }), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-row space-between bg-color-header color-header align-items-center", id: "__main_navbar" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex-row" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "color-header font-x font-w-s", href: "/" }, { children: (0, jsx_runtime_1.jsx)("div", { style: { width: "80px", marginTop: "5px", marginLeft: "20px" } }) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-row" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/starter.html.ittf" }, { children: "Starter" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/lab.html.ittf" }, { children: "Lab" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "m-s p-s color-header-inverse bg-color-header-inverse font-l font-w-xxl" }, { children: "Productions" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/project.html.ittf" }, { children: "Project" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex-row" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/docs.html.ittf" }, { children: "Docs" })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-row m-r-x" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/profile" }, { children: "Profile" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "m-s color-header font-l font-w-xxl", href: "/logout" }, { children: "Log Out" }))] }))] })), (0, jsx_runtime_1.jsx)("section", { id: "root" }), (0, jsx_runtime_1.jsx)("script", { src: "/public/pageforms/main.bundle.js" })] })] }));
}
exports.default = PageFormDocument;
//# sourceMappingURL=PageFormDocument.js.map