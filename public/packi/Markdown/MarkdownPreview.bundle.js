(self["webpackChunkwizzi_editor"] = self["webpackChunkwizzi_editor"] || []).push([["Markdown/MarkdownPreview"],{

/***/ "./src/components/Editor/themes/colors-dark.tsx":
/*!******************************************************!*\
  !*** ./src/components/Editor/themes/colors-dark.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syntax": () => (/* binding */ syntax),
/* harmony export */   "ui": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.editor\.wizzi\src\components\Editor\themes\colors-dark.tsx.ittf
    utc time: Fri, 09 Aug 2024 15:52:24 GMT
*/

const syntax = {
  text: '#d9d7ce',
  variable: '#d9d7ce',
  invalid: '#ff3333',
  constant: '#ff9d45',
  comment: '#5c6773',
  regexp: '#95e6cb',
  annotation: '#5ccfe6',
  tag: '#80d4ff',
  number: '#ff9d45',
  string: '#bae67e',
  property: '#5ccfe6',
  value: '#bae67e',
  keyword: '#ffae57',
  operator: '#778899',
  predefined: '#ff00ff'
};
const ui = {
  background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('background', 'dark'),
  text: '#d9d7ce',
  selection: '#aaaaaa',
  indent: {
    active: '#393b41',
    inactive: '#494b51'
  }
};

/***/ }),

/***/ "./src/components/Editor/themes/colors-light.tsx":
/*!*******************************************************!*\
  !*** ./src/components/Editor/themes/colors-light.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syntax": () => (/* binding */ syntax),
/* harmony export */   "ui": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.editor\.wizzi\src\components\Editor\themes\colors-light.tsx.ittf
    utc time: Fri, 09 Aug 2024 15:52:24 GMT
*/

const syntax = {
  text: '#5c6773',
  variable: '#5c6773',
  invalid: '#ff3333',
  constant: '#f08c36',
  comment: '#abb0b6',
  regexp: '#4dbf99',
  annotation: '#41a6d9',
  tag: '#e7c547',
  number: '#f08c36',
  string: '#86b300',
  property: '#41a6d9',
  value: '#0451a5',
  keyword: '#f2590c',
  operator: '#778899',
  predefined: '#FF00FF'
};
const ui = {
  background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('background', 'light'),
  text: '#5c6773',
  selection: '#cccccc',
  indent: {
    active: '#e0e0e0',
    inactive: '#ecebec'
  }
};
;
;

/***/ }),

/***/ "./src/components/Editor/themes/simple-editor.tsx":
/*!********************************************************!*\
  !*** ./src/components/Editor/themes/simple-editor.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "light": () => (/* binding */ light),
/* harmony export */   "dark": () => (/* binding */ dark)
/* harmony export */ });
/* harmony import */ var _colors_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors-dark */ "./src/components/Editor/themes/colors-dark.tsx");
/* harmony import */ var _colors_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors-light */ "./src/components/Editor/themes/colors-light.tsx");
var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.editor\.wizzi\src\components\Editor\themes\simple-editor.tsx.ittf
    utc time: Fri, 09 Aug 2024 15:52:24 GMT
*/


const css = String.raw;

const theme = ({
  ui,
  syntax
}) => css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .prism-code {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  .prism-code ::selection {\n    background: ", ";\n  }\n\n  .prism-code ::-moz-selection {\n    background: ", ";\n  }\n\n  .prism-code textarea {\n    outline: 0;\n  }\n\n  .prism-code .token.tag,\n  .prism-code .token.property {\n    color: ", ";\n  }\n\n  .prism-code .token.function {\n    color: ", ";\n  }\n\n  .prism-code .token.entity {\n    color: ", ";\n  }\n\n  .prism-code .token.string,\n  .prism-code .token.selector,\n  .prism-code .token.char,\n  .prism-code .token.builtin,\n  .prism-code .token.inserted {\n    color: ", ";\n  }\n\n  .prism-code .token.regexp,\n  .prism-code .token.variable {\n    color: ", ";\n  }\n\n  .prism-code .token.keyword,\n  .prism-code .token.atrule,\n  .prism-code .token.tag > .token.punctuation,\n  .prism-code .token.important {\n    color: ", ";\n  }\n\n  .prism-code .token.attr-name {\n    color: ", ";\n  }\n\n  .prism-code .token.attr-value {\n    color: ", ";\n  }\n\n  .prism-code .token.markup,\n  .prism-code .token.special {\n    color: ", ";\n  }\n\n  .prism-code .token.comment,\n  .prism-code .token.prolog,\n  .prism-code .token.doctype,\n  .prism-code .token.cdata {\n    color: ", ";\n  }\n\n  .prism-code .token.number {\n    color: ", ";\n  }\n\n  .prism-code .token.constant,\n  .prism-code .token.boolean,\n  .prism-code .token.constant,\n  .prism-code .token.symbol,\n  .prism-code .token.deleted {\n    color: ", ";\n  }\n\n  .prism-code .token.operator,\n  .prism-code .token.entity,\n  .prism-code .token.url,\n  .prism-code .language-css .token.string,\n  .prism-code .style .token.string {\n    color: ", ";\n  }\n\n  .prism-code .token.punctuation {\n    color: ", ";\n  }\n"])), ui.background, ui.text, ui.selection, ui.selection, syntax.property, syntax.constant, syntax.property, syntax.string, syntax.regexp, syntax.keyword, syntax.number, syntax.string, syntax.predefined, syntax.comment, syntax.number, syntax.constant, syntax.operator, syntax.comment);

const light = theme(_colors_light__WEBPACK_IMPORTED_MODULE_1__);
const dark = theme(_colors_dark__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "./src/components/Markdown/MarkdownPreview.tsx":
/*!*****************************************************!*\
  !*** ./src/components/Markdown/MarkdownPreview.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js");
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(escape_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/components/prism-core */ "./node_modules/prismjs/components/prism-core.js");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! sanitize-html */ "./node_modules/sanitize-html/index.js");
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(sanitize_html__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prismjs/components/prism-clike */ "./node_modules/prismjs/components/prism-clike.js");
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prismjs/components/prism-javascript */ "./node_modules/prismjs/components/prism-javascript.js");
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prismjs/components/prism-typescript */ "./node_modules/prismjs/components/prism-typescript.js");
/* harmony import */ var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prismjs/components/prism-markup */ "./node_modules/prismjs/components/prism-markup.js");
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prismjs_components_prism_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prismjs/components/prism-jsx */ "./node_modules/prismjs/components/prism-jsx.js");
/* harmony import */ var prismjs_components_prism_jsx__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_jsx__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prismjs/components/prism-json */ "./node_modules/prismjs/components/prism-json.js");
/* harmony import */ var prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_json__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prismjs/components/prism-bash */ "./node_modules/prismjs/components/prism-bash.js");
/* harmony import */ var prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_bash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var prismjs_components_prism_swift__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prismjs/components/prism-swift */ "./node_modules/prismjs/components/prism-swift.js");
/* harmony import */ var prismjs_components_prism_swift__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_swift__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prismjs/components/prism-java */ "./node_modules/prismjs/components/prism-java.js");
/* harmony import */ var prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prismjs/components/prism-diff */ "./node_modules/prismjs/components/prism-diff.js");
/* harmony import */ var prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_diff__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _markdown_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./markdown.css */ "./src/components/Markdown/markdown.css");
/* harmony import */ var _Editor_themes_simple_editor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Editor/themes/simple-editor */ "./src/components/Editor/themes/simple-editor.tsx");
/* harmony import */ var _features_preferences_index__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../features/preferences/index */ "./src/features/preferences/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.editor\.wizzi\src\components\Markdown\MarkdownPreview.tsx.ittf
    utc time: Fri, 09 Aug 2024 15:52:24 GMT
*/





















// use a custom renderer to customize the `a` tag and add `target='_blank'`
const renderer = new (marked__WEBPACK_IMPORTED_MODULE_3___default().Renderer)();

renderer.link = function (args) {
  return marked__WEBPACK_IMPORTED_MODULE_3___default().Renderer.prototype.link.apply(this, args).replace(/^<a/, '<a target="_blank"');
};

let MarkdownPreview = /*#__PURE__*/function (_React$Component) {
  _inherits(MarkdownPreview, _React$Component);

  var _super = _createSuper(MarkdownPreview);

  function MarkdownPreview() {
    _classCallCheck(this, MarkdownPreview);

    return _super.apply(this, arguments);
  }

  _createClass(MarkdownPreview, [{
    key: "render",
    value: function render() {
      const {
        source,
        theme
      } = this.props;
      let html = marked__WEBPACK_IMPORTED_MODULE_3___default()(source, {
        renderer,
        gfm: true,
        silent: true,
        highlight: (code, lang) => {
          const grammar = lang === 'js' ? prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4__.languages.jsx : prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4__.languages[lang];
          const language = lang === 'js' ? 'jsx' : lang;
          return grammar ? (0,prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_4__.highlight)(code, grammar, language) : escape_html__WEBPACK_IMPORTED_MODULE_2___default()(code);
        }
      });
      html = sanitize_html__WEBPACK_IMPORTED_MODULE_20___default()(html, __webpack_require__(/*! ./santize-config.json */ "./src/components/Markdown/santize-config.json"));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: html
        },
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.content), 'markdown-body', 'prism-code')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: theme === 'dark' ? _Editor_themes_simple_editor__WEBPACK_IMPORTED_MODULE_17__.dark : _Editor_themes_simple_editor__WEBPACK_IMPORTED_MODULE_17__.light
        }
      }));
    }
  }]);

  return MarkdownPreview;
}(react__WEBPACK_IMPORTED_MODULE_5__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences_index__WEBPACK_IMPORTED_MODULE_18__.withThemeName)(MarkdownPreview));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  content: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__.c)('content'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__.c)('text'),
    padding: 40,
    '--border-color': (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__.c)('border'),
    '--blockquote-text-color': (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__.c)('text'),
    '--code-background-color': (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__.c)('hover')
  }
});

/***/ }),

/***/ "./src/components/Markdown/markdown.css":
/*!**********************************************!*\
  !*** ./src/components/Markdown/markdown.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/Markdown/santize-config.json":
/*!*****************************************************!*\
  !*** ./src/components/Markdown/santize-config.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"allowedTags":["h1","h2","h3","h4","h5","h6","h7","h8","br","b","i","strong","em","a","pre","code","img","tt","div","ins","del","sup","sub","p","ol","ul","table","thead","tbody","tfoot","blockquote","dl","dt","dd","kbd","q","samp","var","hr","ruby","rt","rp","li","tr","td","th","s","strike","summary","details","span"],"allowedAttributes":{"a":["href","target"],"img":["src","longDesc"],"div":["itemScope","itemType"],"blockquote":["cite"],"del":["cite"],"ins":["cite"],"q":["cite"],"*":["abbr","accept","acceptCharset","accessKey","action","align","alt","axis","border","cellPadding","cellSpacing","char","charoff","charSet","checked","clear","cols","colSpan","color","compact","coords","dateTime","dir","disabled","encType","htmlFor","frame","headers","height","hrefLang","hspace","isMap","id","label","lang","maxLength","media","method","multiple","name","nohref","noshade","nowrap","open","prompt","readOnly","rel","rev","rows","rowSpan","rules","scope","selected","shape","size","span","start","summary","tabIndex","target","title","type","useMap","valign","value","vspace","width","itemProp","class"]},"selfClosing":["img","br","hr","area","base","basefont","input","link","meta"],"allowedSchemes":["http","https"],"allowedSchemesByTag":{"a":["http","https","mailto"]},"allowedSchemesAppliedToAttributes":["href","src","cite"],"allowProtocolRelative":true,"allowedIframeHostnames":["www.youtube.com","player.vimeo.com"]}');

/***/ }),

/***/ "?5580":
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?51ca":
/*!***************************!*\
  !*** colorette (ignored) ***!
  \***************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?03fb":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6197":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?b8cb":
/*!*******************************!*\
  !*** source-map-js (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c717":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=MarkdownPreview.bundle.js.map