"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/components/WebSocketContext.js":
/*!********************************************!*\
  !*** ./src/components/WebSocketContext.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebSocketProvider: () => (/* binding */ WebSocketProvider),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst WebSocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst WebSocketProvider = ({ children })=>{\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (window.electron) {\n            window.electron.onWebSocketMessage((message)=>{\n                setMessages((prevMessages)=>[\n                        ...prevMessages,\n                        message\n                    ]);\n            });\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WebSocketContext.Provider, {\n        value: messages,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/anishpalakurthi/supersearch/frontend/src/components/WebSocketContext.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebSocketContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9XZWJTb2NrZXRDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBa0U7QUFFbEUsTUFBTUksaUNBQW1CSCxvREFBYUE7QUFFL0IsTUFBTUksb0JBQW9CLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQzVDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQyxFQUFFO0lBRTNDRCxnREFBU0EsQ0FBQztRQUNSLElBQUlPLE9BQU9DLFFBQVEsRUFBRTtZQUNuQkQsT0FBT0MsUUFBUSxDQUFDQyxrQkFBa0IsQ0FBQyxDQUFDQztnQkFDbENKLFlBQVksQ0FBQ0ssZUFBaUI7MkJBQUlBO3dCQUFjRDtxQkFBUTtZQUMxRDtRQUNGO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNSLGlCQUFpQlUsUUFBUTtRQUFDQyxPQUFPUjtrQkFDL0JEOzs7Ozs7QUFHUCxFQUFFO0FBRUYsaUVBQWVGLGdCQUFnQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL3NyYy9jb21wb25lbnRzL1dlYlNvY2tldENvbnRleHQuanM/ZTJhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgV2ViU29ja2V0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGNvbnN0IFdlYlNvY2tldFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuZWxlY3Ryb24pIHtcbiAgICAgIHdpbmRvdy5lbGVjdHJvbi5vbldlYlNvY2tldE1lc3NhZ2UoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgc2V0TWVzc2FnZXMoKHByZXZNZXNzYWdlcykgPT4gWy4uLnByZXZNZXNzYWdlcywgbWVzc2FnZV0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8V2ViU29ja2V0Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17bWVzc2FnZXN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2ViU29ja2V0Q29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlNvY2tldENvbnRleHQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJXZWJTb2NrZXRDb250ZXh0IiwiV2ViU29ja2V0UHJvdmlkZXIiLCJjaGlsZHJlbiIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJ3aW5kb3ciLCJlbGVjdHJvbiIsIm9uV2ViU29ja2V0TWVzc2FnZSIsIm1lc3NhZ2UiLCJwcmV2TWVzc2FnZXMiLCJQcm92aWRlciIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/WebSocketContext.js\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_WebSocketContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/WebSocketContext */ \"./src/components/WebSocketContext.js\");\n\n\n\nconst MyApp = ({ Component, pageProps })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_WebSocketContext__WEBPACK_IMPORTED_MODULE_2__.WebSocketProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/anishpalakurthi/supersearch/frontend/src/pages/_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/anishpalakurthi/supersearch/frontend/src/pages/_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEwQjtBQUV5QztBQUVuRSxNQUFNRSxRQUFRLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDL0MscUJBQ0UsOERBQUNILDJFQUFpQkE7a0JBQ2hCLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IFdlYlNvY2tldFByb3ZpZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9XZWJTb2NrZXRDb250ZXh0JztcblxuY29uc3QgTXlBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxXZWJTb2NrZXRQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L1dlYlNvY2tldFByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJXZWJTb2NrZXRQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();