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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebSocketProvider: () => (/* binding */ WebSocketProvider),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// components/WebSocketContext.tsx\n\n\nconst WebSocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)([]);\nconst WebSocketProvider = ({ children })=>{\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const socket = new WebSocket(\"ws://localhost:3001\"); // Update the URL if needed\n        socket.onopen = ()=>{\n            console.log(\"WebSocket connection established\");\n        };\n        socket.onmessage = (event)=>{\n            console.log(\"Received WebSocket message:\", event.data);\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    event.data\n                ]);\n        };\n        socket.onerror = (error)=>{\n            console.error(\"WebSocket error:\", error);\n        };\n        socket.onclose = ()=>{\n            console.log(\"WebSocket connection closed\");\n        };\n        return ()=>{\n            socket.close();\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WebSocketContext.Provider, {\n        value: messages,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/anishpalakurthi/supersearch/frontend/src/components/WebSocketContext.js\",\n        lineNumber: 35,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebSocketContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9XZWJTb2NrZXRDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGtDQUFrQzs7QUFDZ0M7QUFFbEUsTUFBTUksaUNBQW1CSCxvREFBYUEsQ0FBQyxFQUFFO0FBRWxDLE1BQU1JLG9CQUFvQixDQUFDLEVBQUVDLFFBQVEsRUFBRTtJQUM1QyxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR0wsK0NBQVFBLENBQUMsRUFBRTtJQUUzQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNTyxTQUFTLElBQUlDLFVBQVUsd0JBQXdCLDJCQUEyQjtRQUVoRkQsT0FBT0UsTUFBTSxHQUFHO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQztRQUNkO1FBRUFKLE9BQU9LLFNBQVMsR0FBRyxDQUFDQztZQUNsQkgsUUFBUUMsR0FBRyxDQUFDLCtCQUErQkUsTUFBTUMsSUFBSTtZQUNyRFIsWUFBWSxDQUFDUyxlQUFpQjt1QkFBSUE7b0JBQWNGLE1BQU1DLElBQUk7aUJBQUM7UUFDN0Q7UUFFQVAsT0FBT1MsT0FBTyxHQUFHLENBQUNDO1lBQ2hCUCxRQUFRTyxLQUFLLENBQUMsb0JBQW9CQTtRQUNwQztRQUVBVixPQUFPVyxPQUFPLEdBQUc7WUFDZlIsUUFBUUMsR0FBRyxDQUFDO1FBQ2Q7UUFFQSxPQUFPO1lBQ0xKLE9BQU9ZLEtBQUs7UUFDZDtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDakIsaUJBQWlCa0IsUUFBUTtRQUFDQyxPQUFPaEI7a0JBQy9CRDs7Ozs7O0FBR1AsRUFBRTtBQUVGLGlFQUFlRixnQkFBZ0JBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9zcmMvY29tcG9uZW50cy9XZWJTb2NrZXRDb250ZXh0LmpzP2UyYTgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50cy9XZWJTb2NrZXRDb250ZXh0LnRzeFxuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFdlYlNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0KFtdKTtcblxuZXhwb3J0IGNvbnN0IFdlYlNvY2tldFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTsgLy8gVXBkYXRlIHRoZSBVUkwgaWYgbmVlZGVkXG5cbiAgICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIGVzdGFibGlzaGVkJyk7XG4gICAgfTtcblxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBXZWJTb2NrZXQgbWVzc2FnZTonLCBldmVudC5kYXRhKTtcbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXMpID0+IFsuLi5wcmV2TWVzc2FnZXMsIGV2ZW50LmRhdGFdKTtcbiAgICB9O1xuXG4gICAgc29ja2V0Lm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1dlYlNvY2tldCBlcnJvcjonLCBlcnJvcik7XG4gICAgfTtcblxuICAgIHNvY2tldC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIGNsb3NlZCcpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPFdlYlNvY2tldENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e21lc3NhZ2VzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1dlYlNvY2tldENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXZWJTb2NrZXRDb250ZXh0O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiV2ViU29ja2V0Q29udGV4dCIsIldlYlNvY2tldFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJtZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwic29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwiY29uc29sZSIsImxvZyIsIm9ubWVzc2FnZSIsImV2ZW50IiwiZGF0YSIsInByZXZNZXNzYWdlcyIsIm9uZXJyb3IiLCJlcnJvciIsIm9uY2xvc2UiLCJjbG9zZSIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/WebSocketContext.js\n");

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