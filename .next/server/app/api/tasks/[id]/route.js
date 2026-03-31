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
exports.id = "app/api/tasks/[id]/route";
exports.ids = ["app/api/tasks/[id]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_J24023_Desktop_GA_job_hunt_tracker_src_app_api_tasks_id_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/tasks/[id]/route.js */ \"(rsc)/./src/app/api/tasks/[id]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/tasks/[id]/route\",\n        pathname: \"/api/tasks/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/tasks/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\J24023\\\\Desktop\\\\_GA\\\\job-hunt-tracker\\\\src\\\\app\\\\api\\\\tasks\\\\[id]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_J24023_Desktop_GA_job_hunt_tracker_src_app_api_tasks_id_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/tasks/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ0YXNrcyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0YXNrcyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdGFza3MlMkYlNUJpZCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNKMjQwMjMlNUNEZXNrdG9wJTVDX0dBJTVDam9iLWh1bnQtdHJhY2tlciU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSjI0MDIzJTVDRGVza3RvcCU1Q19HQSU1Q2pvYi1odW50LXRyYWNrZXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VDO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vam9iLWh1bnQtdHJhY2tlci8/MWE4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxKMjQwMjNcXFxcRGVza3RvcFxcXFxfR0FcXFxcam9iLWh1bnQtdHJhY2tlclxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx0YXNrc1xcXFxbaWRdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS90YXNrcy9baWRdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdGFza3MvW2lkXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdGFza3MvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEoyNDAyM1xcXFxEZXNrdG9wXFxcXF9HQVxcXFxqb2ItaHVudC10cmFja2VyXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHRhc2tzXFxcXFtpZF1cXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3Rhc2tzL1tpZF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst dynamic = \"force-dynamic\";\n// PrismaClient is attached to the `global` object in development to prevent\n// exhausting your database connection limit.\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(prisma),\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async session ({ session, user }) {\n            if (session.user) {\n                session.user.id = user.id;\n            }\n            return session;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFnQztBQUN1QjtBQUNFO0FBQ1o7QUFFdEMsTUFBTUksVUFBVSxnQkFBZ0I7QUFFdkMsNEVBQTRFO0FBQzVFLDZDQUE2QztBQUM3QyxNQUFNQyxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlKLHdEQUFZQTtBQUV6RCxJQUFJSyxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFN0QsTUFBTUUsY0FBYztJQUN6QkMsU0FBU1Isd0VBQWFBLENBQUNLO0lBQ3ZCSSxXQUFXO1FBQ1RWLHNFQUFjQSxDQUFDO1lBQ2JXLFVBQVVKLFFBQVFLLEdBQUcsQ0FBQ0MsZ0JBQWdCO1lBQ3RDQyxjQUFjUCxRQUFRSyxHQUFHLENBQUNHLG9CQUFvQjtRQUNoRDtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUMsSUFBSSxFQUFFO1lBQzdCLElBQUlELFFBQVFDLElBQUksRUFBRTtnQkFDaEJELFFBQVFDLElBQUksQ0FBQ0MsRUFBRSxHQUFHRCxLQUFLQyxFQUFFO1lBQzNCO1lBQ0EsT0FBT0Y7UUFDVDtJQUNGO0FBQ0YsRUFBQztBQUVELE1BQU1HLFVBQVVyQixnREFBUUEsQ0FBQ1M7QUFFaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qb2ItaHVudC10cmFja2VyLy4vc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLmpzPzIzMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXJcIlxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcblxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2UtZHluYW1pYyc7XG5cbi8vIFByaXNtYUNsaWVudCBpcyBhdHRhY2hlZCB0byB0aGUgYGdsb2JhbGAgb2JqZWN0IGluIGRldmVsb3BtZW50IHRvIHByZXZlbnRcbi8vIGV4aGF1c3RpbmcgeW91ciBkYXRhYmFzZSBjb25uZWN0aW9uIGxpbWl0LlxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsXG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIHByb3ZpZGVyczogW1xuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHVzZXIgfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB1c2VyLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkdvb2dsZVByb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsIlByaXNtYUNsaWVudCIsImR5bmFtaWMiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJwcm9jZXNzIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJjYWxsYmFja3MiLCJzZXNzaW9uIiwidXNlciIsImlkIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/app/api/tasks/[id]/route.js":
/*!*****************************************!*\
  !*** ./src/app/api/tasks/[id]/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.js\");\n\n\n\n\n// Only pick fields that exist in the Prisma Task schema\nfunction sanitizeTaskData(data) {\n    const allowed = [\n        \"title\",\n        \"category\",\n        \"companyName\",\n        \"date\",\n        \"time\",\n        \"endTime\",\n        \"duration\",\n        \"location\",\n        \"zoomLink\",\n        \"applySite\",\n        \"dressCode\",\n        \"belongings\",\n        \"deadline\",\n        \"todoList\",\n        \"links\",\n        \"memo\",\n        \"color\",\n        \"calendarName\",\n        \"icon\",\n        \"displayFormat\",\n        \"zoomId\",\n        \"zoomPassword\",\n        \"repeatGroupId\"\n    ];\n    const clean = {};\n    for (const key of allowed){\n        if (key in data) {\n            clean[key] = data[key];\n        }\n    }\n    // Type coercions - only if the field was actually in the request\n    if (\"date\" in clean) {\n        if (clean.date) {\n            const d = new Date(clean.date);\n            clean.date = isNaN(d.getTime()) ? null : d;\n        } else {\n            clean.date = null;\n        }\n    }\n    if (\"deadline\" in clean) {\n        if (clean.deadline) {\n            const d = new Date(clean.deadline);\n            clean.deadline = isNaN(d.getTime()) ? null : d;\n        } else {\n            clean.deadline = null;\n        }\n    }\n    // duration must be Int or null\n    if (\"duration\" in clean) {\n        const n = parseInt(clean.duration);\n        clean.duration = isNaN(n) ? null : n;\n    }\n    return clean;\n}\nasync function PUT(request, { params }) {\n    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    try {\n        const raw = await request.json();\n        const id = params.id;\n        // Verify ownership\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].task.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!existing || existing.userId !== session.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Not found or forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        const data = sanitizeTaskData(raw);\n        const updatedTask = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].task.update({\n            where: {\n                id\n            },\n            data\n        });\n        console.log(\"Task updated successfully:\", updatedTask.id);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(updatedTask);\n    } catch (error) {\n        console.error(\"API PUT Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update task\",\n            detail: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    try {\n        const id = params.id;\n        // Verify ownership\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].task.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!existing || existing.userId !== session.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Not found or forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].task.delete({\n            where: {\n                id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"API DELETE Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to delete task\",\n            detail: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS90YXNrcy9baWRdL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUNPO0FBQ2U7QUFDL0I7QUFFbEMsd0RBQXdEO0FBQ3hELFNBQVNJLGlCQUFpQkMsSUFBSTtJQUM1QixNQUFNQyxVQUFVO1FBQ2Q7UUFBUztRQUFZO1FBQWU7UUFBUTtRQUFRO1FBQ3BEO1FBQVk7UUFBWTtRQUFZO1FBQWE7UUFDakQ7UUFBYztRQUFZO1FBQVk7UUFBUztRQUFRO1FBQ3ZEO1FBQWdCO1FBQVE7UUFBaUI7UUFBVTtRQUNuRDtLQUNEO0lBRUQsTUFBTUMsUUFBUSxDQUFDO0lBQ2YsS0FBSyxNQUFNQyxPQUFPRixRQUFTO1FBQ3pCLElBQUlFLE9BQU9ILE1BQU07WUFDZkUsS0FBSyxDQUFDQyxJQUFJLEdBQUdILElBQUksQ0FBQ0csSUFBSTtRQUN4QjtJQUNGO0lBRUEsaUVBQWlFO0lBQ2pFLElBQUksVUFBVUQsT0FBTztRQUNuQixJQUFJQSxNQUFNRSxJQUFJLEVBQUU7WUFDZCxNQUFNQyxJQUFJLElBQUlDLEtBQUtKLE1BQU1FLElBQUk7WUFDN0JGLE1BQU1FLElBQUksR0FBR0csTUFBTUYsRUFBRUcsT0FBTyxNQUFNLE9BQU9IO1FBQzNDLE9BQU87WUFDTEgsTUFBTUUsSUFBSSxHQUFHO1FBQ2Y7SUFDRjtJQUVBLElBQUksY0FBY0YsT0FBTztRQUN2QixJQUFJQSxNQUFNTyxRQUFRLEVBQUU7WUFDbEIsTUFBTUosSUFBSSxJQUFJQyxLQUFLSixNQUFNTyxRQUFRO1lBQ2pDUCxNQUFNTyxRQUFRLEdBQUdGLE1BQU1GLEVBQUVHLE9BQU8sTUFBTSxPQUFPSDtRQUMvQyxPQUFPO1lBQ0xILE1BQU1PLFFBQVEsR0FBRztRQUNuQjtJQUNGO0lBRUEsK0JBQStCO0lBQy9CLElBQUksY0FBY1AsT0FBTztRQUN2QixNQUFNUSxJQUFJQyxTQUFTVCxNQUFNVSxRQUFRO1FBQ2pDVixNQUFNVSxRQUFRLEdBQUdMLE1BQU1HLEtBQUssT0FBT0E7SUFDckM7SUFFQSxPQUFPUjtBQUNUO0FBRU8sZUFBZVcsSUFBSUMsT0FBTyxFQUFFLEVBQUVDLE1BQU0sRUFBRTtJQUMzQyxNQUFNQyxVQUFVLE1BQU1wQixnRUFBZ0JBLENBQUNDLHFFQUFXQTtJQUNsRCxJQUFJLENBQUNtQixTQUFTLE9BQU9yQixxREFBWUEsQ0FBQ3NCLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWUsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFFaEYsSUFBSTtRQUNGLE1BQU1DLE1BQU0sTUFBTU4sUUFBUUcsSUFBSTtRQUM5QixNQUFNSSxLQUFLTixPQUFPTSxFQUFFO1FBRXBCLG1CQUFtQjtRQUNuQixNQUFNQyxXQUFXLE1BQU14QixtREFBTUEsQ0FBQ3lCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVKO1lBQUc7UUFBRTtRQUM5RCxJQUFJLENBQUNDLFlBQVlBLFNBQVNJLE1BQU0sS0FBS1YsUUFBUVcsSUFBSSxDQUFDTixFQUFFLEVBQUU7WUFDcEQsT0FBTzFCLHFEQUFZQSxDQUFDc0IsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM5RTtRQUVBLE1BQU1uQixPQUFPRCxpQkFBaUJxQjtRQUU5QixNQUFNUSxjQUFjLE1BQU05QixtREFBTUEsQ0FBQ3lCLElBQUksQ0FBQ00sTUFBTSxDQUFDO1lBQzNDSixPQUFPO2dCQUFFSjtZQUFHO1lBQ1pyQjtRQUNGO1FBRUE4QixRQUFRQyxHQUFHLENBQUMsOEJBQThCSCxZQUFZUCxFQUFFO1FBQ3hELE9BQU8xQixxREFBWUEsQ0FBQ3NCLElBQUksQ0FBQ1c7SUFDM0IsRUFBRSxPQUFPVixPQUFPO1FBQ2RZLFFBQVFaLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2hDLE9BQU92QixxREFBWUEsQ0FBQ3NCLElBQUksQ0FBQztZQUFFQyxPQUFPO1lBQXlCYyxRQUFRZCxNQUFNZSxPQUFPO1FBQUMsR0FBRztZQUFFZCxRQUFRO1FBQUk7SUFDcEc7QUFDRjtBQUVPLGVBQWVlLE9BQU9wQixPQUFPLEVBQUUsRUFBRUMsTUFBTSxFQUFFO0lBQzlDLE1BQU1DLFVBQVUsTUFBTXBCLGdFQUFnQkEsQ0FBQ0MscUVBQVdBO0lBQ2xELElBQUksQ0FBQ21CLFNBQVMsT0FBT3JCLHFEQUFZQSxDQUFDc0IsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBZSxHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUVoRixJQUFJO1FBQ0YsTUFBTUUsS0FBS04sT0FBT00sRUFBRTtRQUVwQixtQkFBbUI7UUFDbkIsTUFBTUMsV0FBVyxNQUFNeEIsbURBQU1BLENBQUN5QixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUFFQyxPQUFPO2dCQUFFSjtZQUFHO1FBQUU7UUFDOUQsSUFBSSxDQUFDQyxZQUFZQSxTQUFTSSxNQUFNLEtBQUtWLFFBQVFXLElBQUksQ0FBQ04sRUFBRSxFQUFFO1lBQ3BELE9BQU8xQixxREFBWUEsQ0FBQ3NCLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUF5QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDOUU7UUFFQSxNQUFNckIsbURBQU1BLENBQUN5QixJQUFJLENBQUNZLE1BQU0sQ0FBQztZQUN2QlYsT0FBTztnQkFBRUo7WUFBRztRQUNkO1FBRUEsT0FBTzFCLHFEQUFZQSxDQUFDc0IsSUFBSSxDQUFDO1lBQUVtQixTQUFTO1FBQUs7SUFDM0MsRUFBRSxPQUFPbEIsT0FBTztRQUNkWSxRQUFRWixLQUFLLENBQUMscUJBQXFCQTtRQUNuQyxPQUFPdkIscURBQVlBLENBQUNzQixJQUFJLENBQUM7WUFBRUMsT0FBTztZQUF5QmMsUUFBUWQsTUFBTWUsT0FBTztRQUFDLEdBQUc7WUFBRWQsUUFBUTtRQUFJO0lBQ3BHO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qb2ItaHVudC10cmFja2VyLy4vc3JjL2FwcC9hcGkvdGFza3MvW2lkXS9yb3V0ZS5qcz9hYTc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL25leHRcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG4vLyBPbmx5IHBpY2sgZmllbGRzIHRoYXQgZXhpc3QgaW4gdGhlIFByaXNtYSBUYXNrIHNjaGVtYVxuZnVuY3Rpb24gc2FuaXRpemVUYXNrRGF0YShkYXRhKSB7XG4gIGNvbnN0IGFsbG93ZWQgPSBbXG4gICAgJ3RpdGxlJywgJ2NhdGVnb3J5JywgJ2NvbXBhbnlOYW1lJywgJ2RhdGUnLCAndGltZScsICdlbmRUaW1lJyxcbiAgICAnZHVyYXRpb24nLCAnbG9jYXRpb24nLCAnem9vbUxpbmsnLCAnYXBwbHlTaXRlJywgJ2RyZXNzQ29kZScsXG4gICAgJ2JlbG9uZ2luZ3MnLCAnZGVhZGxpbmUnLCAndG9kb0xpc3QnLCAnbGlua3MnLCAnbWVtbycsICdjb2xvcicsXG4gICAgJ2NhbGVuZGFyTmFtZScsICdpY29uJywgJ2Rpc3BsYXlGb3JtYXQnLCAnem9vbUlkJywgJ3pvb21QYXNzd29yZCcsXG4gICAgJ3JlcGVhdEdyb3VwSWQnXG4gIF07XG5cbiAgY29uc3QgY2xlYW4gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgb2YgYWxsb3dlZCkge1xuICAgIGlmIChrZXkgaW4gZGF0YSkge1xuICAgICAgY2xlYW5ba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH1cblxuICAvLyBUeXBlIGNvZXJjaW9ucyAtIG9ubHkgaWYgdGhlIGZpZWxkIHdhcyBhY3R1YWxseSBpbiB0aGUgcmVxdWVzdFxuICBpZiAoJ2RhdGUnIGluIGNsZWFuKSB7XG4gICAgaWYgKGNsZWFuLmRhdGUpIHtcbiAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShjbGVhbi5kYXRlKTtcbiAgICAgIGNsZWFuLmRhdGUgPSBpc05hTihkLmdldFRpbWUoKSkgPyBudWxsIDogZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYW4uZGF0ZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaWYgKCdkZWFkbGluZScgaW4gY2xlYW4pIHtcbiAgICBpZiAoY2xlYW4uZGVhZGxpbmUpIHtcbiAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShjbGVhbi5kZWFkbGluZSk7XG4gICAgICBjbGVhbi5kZWFkbGluZSA9IGlzTmFOKGQuZ2V0VGltZSgpKSA/IG51bGwgOiBkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhbi5kZWFkbGluZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8gZHVyYXRpb24gbXVzdCBiZSBJbnQgb3IgbnVsbFxuICBpZiAoJ2R1cmF0aW9uJyBpbiBjbGVhbikge1xuICAgIGNvbnN0IG4gPSBwYXJzZUludChjbGVhbi5kdXJhdGlvbik7XG4gICAgY2xlYW4uZHVyYXRpb24gPSBpc05hTihuKSA/IG51bGwgOiBuO1xuICB9XG5cbiAgcmV0dXJuIGNsZWFuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICBpZiAoIXNlc3Npb24pIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCBpZCA9IHBhcmFtcy5pZDtcblxuICAgIC8vIFZlcmlmeSBvd25lcnNoaXBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS50YXNrLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBpZCB9IH0pO1xuICAgIGlmICghZXhpc3RpbmcgfHwgZXhpc3RpbmcudXNlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk5vdCBmb3VuZCBvciBmb3JiaWRkZW5cIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBzYW5pdGl6ZVRhc2tEYXRhKHJhdyk7XG5cbiAgICBjb25zdCB1cGRhdGVkVGFzayA9IGF3YWl0IHByaXNtYS50YXNrLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgZGF0YVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXCJUYXNrIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5OlwiLCB1cGRhdGVkVGFzay5pZCk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHVwZGF0ZWRUYXNrKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQVBJIFBVVCBFcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdGFza1wiLCBkZXRhaWw6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICBpZiAoIXNlc3Npb24pIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBpZCA9IHBhcmFtcy5pZDtcblxuICAgIC8vIFZlcmlmeSBvd25lcnNoaXBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS50YXNrLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBpZCB9IH0pO1xuICAgIGlmICghZXhpc3RpbmcgfHwgZXhpc3RpbmcudXNlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk5vdCBmb3VuZCBvciBmb3JiaWRkZW5cIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS50YXNrLmRlbGV0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBUEkgREVMRVRFIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGRlbGV0ZSB0YXNrXCIsIGRldGFpbDogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwic2FuaXRpemVUYXNrRGF0YSIsImRhdGEiLCJhbGxvd2VkIiwiY2xlYW4iLCJrZXkiLCJkYXRlIiwiZCIsIkRhdGUiLCJpc05hTiIsImdldFRpbWUiLCJkZWFkbGluZSIsIm4iLCJwYXJzZUludCIsImR1cmF0aW9uIiwiUFVUIiwicmVxdWVzdCIsInBhcmFtcyIsInNlc3Npb24iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyYXciLCJpZCIsImV4aXN0aW5nIiwidGFzayIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInVzZXJJZCIsInVzZXIiLCJ1cGRhdGVkVGFzayIsInVwZGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJtZXNzYWdlIiwiREVMRVRFIiwiZGVsZXRlIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/tasks/[id]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.js":
/*!***************************!*\
  !*** ./src/lib/prisma.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsd0JBQXdCO0lBQzVCLE9BQU8sSUFBSUQsd0RBQVlBO0FBQ3pCO0FBRUEsTUFBTUUsa0JBQWtCQztBQUV4QixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSUg7QUFFekMsaUVBQWVHLE1BQU1BLEVBQUE7QUFFckIsSUFBSUMsSUFBeUIsRUFBY0gsZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vam9iLWh1bnQtdHJhY2tlci8uL3NyYy9saWIvcHJpc21hLmpzP2VjZTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKVxufVxuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzXG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gcHJpc21hQ2xpZW50U2luZ2xldG9uKClcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hQ2xpZW50U2luZ2xldG9uIiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftasks%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CJ24023%5CDesktop%5C_GA%5Cjob-hunt-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();