/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _perlin = __webpack_require__(/*! ./lib/perlin.js */ \"./lib/perlin.js\");\n\nvar _perlin2 = _interopRequireDefault(_perlin);\n\nvar _particle = __webpack_require__(/*! ./particle.js */ \"./particle.js\");\n\nvar _particle2 = _interopRequireDefault(_particle);\n\nvar _vector = __webpack_require__(/*! ./vector.js */ \"./vector.js\");\n\nvar _vector2 = _interopRequireDefault(_vector);\n\nvar _multidarrays = __webpack_require__(/*! ./lib/multidarrays.js */ \"./lib/multidarrays.js\");\n\nvar _multidarrays2 = _interopRequireDefault(_multidarrays);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvas = document.getElementById('mycanvas');\nvar ctx = canvas.getContext('2d');\n\ncanvas.width = 600;\ncanvas.height = 600;\n\nvar cols = 30;\nvar rows = 30;\nvar width = canvas.width / cols;\nvar height = canvas.height / rows;\nvar time = 0;\nvar alpha = 0;\nvar particles = [];\nvar vectors = (0, _multidarrays2.default)(rows, cols);\nvar numberOfParts = 300;\nvar force = void 0;\n\nfunction vec(x, y, angle, size) {\n  ctx.beginPath();\n  ctx.moveTo(x, y);\n  ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));\n  ctx.closePath();\n  ctx.strokeStyle = '#000000';\n  ctx.stroke();\n}\n\nvar obj = {\n  width: canvas.width,\n  height: canvas.height,\n  elwidth: width,\n  elheight: height,\n  cols: cols,\n  rows: rows\n};\n\n//FILLING PARTICLES\nfor (var i = 0; i < numberOfParts; i++) {\n  particles.push(new _particle2.default(Math.random() * canvas.width, Math.random() * canvas.height));\n}\n\nfunction drawParticles(parts, ctx, vec) {\n  parts.forEach(function (part) {\n    part.force(vec, obj);\n    part.move(obj);\n    part.draw(ctx);\n  });\n}\n\nfunction render() {\n  time++;\n  window.requestAnimationFrame(render);\n  // ctx.clearRect(0,0,canvas.width, canvas.height);\n  for (var row = 0; row < rows; row++) {\n    for (var col = 0; col < cols; col++) {\n      //WIND\n      alpha = (0, _perlin2.default)(col / 70, row / 70, time / 150) * 8 * Math.PI;\n      // vec(col*width,row*height,alpha,30);\n      vectors[row][col] = [Math.cos(alpha) * 30, Math.sin(alpha) * 30];\n    }\n  }\n  drawParticles(particles, ctx, vectors);\n}\n\nrender();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2pzL2FwcC5qcz8wMzU0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQZXJsaW4gZnJvbSAnLi9saWIvcGVybGluLmpzJztcbmltcG9ydCBQYXJ0aWNsZSBmcm9tICcuL3BhcnRpY2xlLmpzJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3IuanMnO1xuaW1wb3J0IGNyZWF0ZUFycmF5IGZyb20gJy4vbGliL211bHRpZGFycmF5cy5qcyc7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXljYW52YXMnKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuY2FudmFzLndpZHRoID0gNjAwO1xuY2FudmFzLmhlaWdodCA9IDYwMDtcblxubGV0IGNvbHMgPSAzMDtcbmxldCByb3dzID0gMzA7XG5sZXQgd2lkdGggPSBjYW52YXMud2lkdGggLyBjb2xzO1xubGV0IGhlaWdodCA9Y2FudmFzLmhlaWdodCAvIHJvd3M7XG5sZXQgdGltZSA9IDA7XG5sZXQgYWxwaGEgPSAwO1xubGV0IHBhcnRpY2xlcyA9IFtdO1xubGV0IHZlY3RvcnMgPSBjcmVhdGVBcnJheShyb3dzLGNvbHMpO1xubGV0IG51bWJlck9mUGFydHMgPSAzMDA7XG5sZXQgZm9yY2U7XG5cbmZ1bmN0aW9uIHZlYyh4LHksYW5nbGUsc2l6ZSkge1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5tb3ZlVG8oeCx5KTtcbiAgY3R4LmxpbmVUbyh4K3NpemUqTWF0aC5jb3MoYW5nbGUpLHkgKyBzaXplKk1hdGguc2luKGFuZ2xlKSk7XG4gIGN0eC5jbG9zZVBhdGgoKTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICBjdHguc3Ryb2tlKCk7XG59XG5cbmxldCBvYmogPSB7XG4gIHdpZHRoOiBjYW52YXMud2lkdGgsXG4gIGhlaWdodDogY2FudmFzLmhlaWdodCxcbiAgZWx3aWR0aDogd2lkdGgsXG4gIGVsaGVpZ2h0OiBoZWlnaHQsXG4gIGNvbHM6IGNvbHMsXG4gIHJvd3M6IHJvd3MsXG59O1xuXG4vL0ZJTExJTkcgUEFSVElDTEVTXG5mb3IobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZQYXJ0cztpKyspIHtcbiAgcGFydGljbGVzLnB1c2goIG5ldyBQYXJ0aWNsZShNYXRoLnJhbmRvbSgpKmNhbnZhcy53aWR0aCxNYXRoLnJhbmRvbSgpKmNhbnZhcy5oZWlnaHQpKTtcbn1cblxuXG5mdW5jdGlvbiBkcmF3UGFydGljbGVzKHBhcnRzLGN0eCx2ZWMpIHtcbiAgcGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICBwYXJ0LmZvcmNlKHZlYyxvYmopO1xuICAgIHBhcnQubW92ZShvYmopO1xuICAgIHBhcnQuZHJhdyhjdHgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICB0aW1lKys7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgLy8gY3R4LmNsZWFyUmVjdCgwLDAsY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgZm9yKGxldCByb3cgPSAwOyByb3cgPCByb3dzOyByb3crKykge1xuICAgIGZvcihsZXQgY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHsgIFxuICAgICAgLy9XSU5EXG4gICAgICBhbHBoYSA9IFBlcmxpbihjb2wvNzAscm93LzcwLHRpbWUvMTUwKSo4Kk1hdGguUEk7XG4gICAgICAvLyB2ZWMoY29sKndpZHRoLHJvdypoZWlnaHQsYWxwaGEsMzApO1xuICAgICAgdmVjdG9yc1tyb3ddW2NvbF0gPSBbTWF0aC5jb3MoYWxwaGEpKjMwLE1hdGguc2luKGFscGhhKSozMF07XG4gICAgfVxuICB9IFxuICBkcmF3UGFydGljbGVzKHBhcnRpY2xlcyxjdHgsdmVjdG9ycyk7XG59XG5cblxucmVuZGVyKCk7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./app.js\n");

/***/ }),

/***/ "./lib/multidarrays.js":
/*!*****************************!*\
  !*** ./lib/multidarrays.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = createArray;\nfunction createArray(length) {\n  var arr = new Array(length || 0),\n      i = length;\n\n  if (arguments.length > 1) {\n    var args = Array.prototype.slice.call(arguments, 1);\n    while (i--) {\n      arr[length - 1 - i] = createArray.apply(this, args);\n    }\n  }\n\n  return arr;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvbXVsdGlkYXJyYXlzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9qcy9saWIvbXVsdGlkYXJyYXlzLmpzPzcyMzEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXJyYXkobGVuZ3RoKSB7XHJcbiAgdmFyIGFyciA9IG5ldyBBcnJheShsZW5ndGggfHwgMCksXHJcbiAgICBpID0gbGVuZ3RoO1xyXG5cclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgIHdoaWxlKGktLSkgYXJyW2xlbmd0aC0xIC0gaV0gPSBjcmVhdGVBcnJheS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhcnI7XHJcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/multidarrays.js\n");

/***/ }),

/***/ "./lib/perlin.js":
/*!***********************!*\
  !*** ./lib/perlin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = noise;\nfunction noise(x, y, z) {\n\n  var p = new Array(512);\n  var permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];\n  for (var i = 0; i < 256; i++) {\n    p[256 + i] = p[i] = permutation[i];\n  }var X = Math.floor(x) & 255,\n      // FIND UNIT CUBE THAT\n  Y = Math.floor(y) & 255,\n      // CONTAINS POINT.\n  Z = Math.floor(z) & 255;\n  x -= Math.floor(x); // FIND RELATIVE X,Y,Z\n  y -= Math.floor(y); // OF POINT IN CUBE.\n  z -= Math.floor(z);\n  var u = fade(x),\n      // COMPUTE FADE CURVES\n  v = fade(y),\n      // FOR EACH OF X,Y,Z.\n  w = fade(z);\n  var A = p[X] + Y,\n      AA = p[A] + Z,\n      AB = p[A + 1] + Z,\n      // HASH COORDINATES OF\n  B = p[X + 1] + Y,\n      BA = p[B] + Z,\n      BB = p[B + 1] + Z; // THE 8 CUBE CORNERS,\n\n  return scale(lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), // AND ADD\n  grad(p[BA], x - 1, y, z)), // BLENDED\n  lerp(u, grad(p[AB], x, y - 1, z), // RESULTS\n  grad(p[BB], x - 1, y - 1, z))), // FROM  8\n  lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), // CORNERS\n  grad(p[BA + 1], x - 1, y, z - 1)), // OF CUBE\n  lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)))));\n}\nfunction fade(t) {\n  return t * t * t * (t * (t * 6 - 15) + 10);\n}\nfunction lerp(t, a, b) {\n  return a + t * (b - a);\n}\nfunction grad(hash, x, y, z) {\n  var h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE\n  var u = h < 8 ? x : y,\n      // INTO 12 GRADIENT DIRECTIONS.\n  v = h < 4 ? y : h === 12 || h === 14 ? x : z;\n  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);\n}\nfunction scale(n) {\n  return (1 + n) / 2;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvcGVybGluLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9qcy9saWIvcGVybGluLmpzPzliNWEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9pc2UoeCwgeSwgeikge1xyXG5cclxuICB2YXIgcCA9IG5ldyBBcnJheSg1MTIpO1xyXG4gIHZhciBwZXJtdXRhdGlvbiA9IFsgMTUxLDE2MCwxMzcsOTEsOTAsMTUsXHJcbiAgICAxMzEsMTMsMjAxLDk1LDk2LDUzLDE5NCwyMzMsNywyMjUsMTQwLDM2LDEwMywzMCw2OSwxNDIsOCw5OSwzNywyNDAsMjEsMTAsMjMsXHJcbiAgICAxOTAsIDYsMTQ4LDI0NywxMjAsMjM0LDc1LDAsMjYsMTk3LDYyLDk0LDI1MiwyMTksMjAzLDExNywzNSwxMSwzMiw1NywxNzcsMzMsXHJcbiAgICA4OCwyMzcsMTQ5LDU2LDg3LDE3NCwyMCwxMjUsMTM2LDE3MSwxNjgsIDY4LDE3NSw3NCwxNjUsNzEsMTM0LDEzOSw0OCwyNywxNjYsXHJcbiAgICA3NywxNDYsMTU4LDIzMSw4MywxMTEsMjI5LDEyMiw2MCwyMTEsMTMzLDIzMCwyMjAsMTA1LDkyLDQxLDU1LDQ2LDI0NSw0MCwyNDQsXHJcbiAgICAxMDIsMTQzLDU0LCA2NSwyNSw2MywxNjEsIDEsMjE2LDgwLDczLDIwOSw3NiwxMzIsMTg3LDIwOCwgODksMTgsMTY5LDIwMCwxOTYsXHJcbiAgICAxMzUsMTMwLDExNiwxODgsMTU5LDg2LDE2NCwxMDAsMTA5LDE5OCwxNzMsMTg2LCAzLDY0LDUyLDIxNywyMjYsMjUwLDEyNCwxMjMsXHJcbiAgICA1LDIwMiwzOCwxNDcsMTE4LDEyNiwyNTUsODIsODUsMjEyLDIwNywyMDYsNTksMjI3LDQ3LDE2LDU4LDE3LDE4MiwxODksMjgsNDIsXHJcbiAgICAyMjMsMTgzLDE3MCwyMTMsMTE5LDI0OCwxNTIsIDIsNDQsMTU0LDE2MywgNzAsMjIxLDE1MywxMDEsMTU1LDE2NywgNDMsMTcyLDksXHJcbiAgICAxMjksMjIsMzksMjUzLCAxOSw5OCwxMDgsMTEwLDc5LDExMywyMjQsMjMyLDE3OCwxODUsIDExMiwxMDQsMjE4LDI0Niw5NywyMjgsXHJcbiAgICAyNTEsMzQsMjQyLDE5MywyMzgsMjEwLDE0NCwxMiwxOTEsMTc5LDE2MiwyNDEsIDgxLDUxLDE0NSwyMzUsMjQ5LDE0LDIzOSwxMDcsXHJcbiAgICA0OSwxOTIsMjE0LCAzMSwxODEsMTk5LDEwNiwxNTcsMTg0LCA4NCwyMDQsMTc2LDExNSwxMjEsNTAsNDUsMTI3LCA0LDE1MCwyNTQsXHJcbiAgICAxMzgsMjM2LDIwNSw5MywyMjIsMTE0LDY3LDI5LDI0LDcyLDI0MywxNDEsMTI4LDE5NSw3OCw2NiwyMTUsNjEsMTU2LDE4MFxyXG4gIF07XHJcbiAgZm9yICh2YXIgaT0wOyBpIDwgMjU2IDsgaSsrKSBcclxuICAgIHBbMjU2K2ldID0gcFtpXSA9IHBlcm11dGF0aW9uW2ldOyBcclxuXHJcbiAgdmFyIFggPSBNYXRoLmZsb29yKHgpICYgMjU1LCAvLyBGSU5EIFVOSVQgQ1VCRSBUSEFUXHJcbiAgICBZID0gTWF0aC5mbG9vcih5KSAmIDI1NSwgLy8gQ09OVEFJTlMgUE9JTlQuXHJcbiAgICBaID0gTWF0aC5mbG9vcih6KSAmIDI1NTtcclxuICB4IC09IE1hdGguZmxvb3IoeCk7IC8vIEZJTkQgUkVMQVRJVkUgWCxZLFpcclxuICB5IC09IE1hdGguZmxvb3IoeSk7IC8vIE9GIFBPSU5UIElOIENVQkUuXHJcbiAgeiAtPSBNYXRoLmZsb29yKHopO1xyXG4gIHZhciB1ID0gZmFkZSh4KSwgLy8gQ09NUFVURSBGQURFIENVUlZFU1xyXG4gICAgdiA9IGZhZGUoeSksIC8vIEZPUiBFQUNIIE9GIFgsWSxaLlxyXG4gICAgdyA9IGZhZGUoeik7XHJcbiAgdmFyIEEgPSBwW1ggXStZLCBBQSA9IHBbQV0rWiwgQUIgPSBwW0ErMV0rWiwgLy8gSEFTSCBDT09SRElOQVRFUyBPRlxyXG4gICAgQiA9IHBbWCsxXStZLCBCQSA9IHBbQl0rWiwgQkIgPSBwW0IrMV0rWjsgLy8gVEhFIDggQ1VCRSBDT1JORVJTLFxyXG5cclxuICByZXR1cm4gc2NhbGUobGVycCh3LCBsZXJwKHYsIGxlcnAodSwgZ3JhZChwW0FBIF0sIHggLCB5ICwgeiApLCAvLyBBTkQgQUREXHJcbiAgICBncmFkKHBbQkEgXSwgeC0xLCB5ICwgeiApKSwgLy8gQkxFTkRFRFxyXG4gIGxlcnAodSwgZ3JhZChwW0FCIF0sIHggLCB5LTEsIHogKSwgLy8gUkVTVUxUU1xyXG4gICAgZ3JhZChwW0JCIF0sIHgtMSwgeS0xLCB6ICkpKSwvLyBGUk9NICA4XHJcbiAgbGVycCh2LCBsZXJwKHUsIGdyYWQocFtBQSsxXSwgeCAsIHkgLCB6LTEgKSwgLy8gQ09STkVSU1xyXG4gICAgZ3JhZChwW0JBKzFdLCB4LTEsIHkgLCB6LTEgKSksIC8vIE9GIENVQkVcclxuICBsZXJwKHUsIGdyYWQocFtBQisxXSwgeCAsIHktMSwgei0xICksXHJcbiAgICBncmFkKHBbQkIrMV0sIHgtMSwgeS0xLCB6LTEgKSkpKSk7XHJcbn1cclxuZnVuY3Rpb24gZmFkZSh0KSB7IHJldHVybiB0ICogdCAqIHQgKiAodCAqICh0ICogNiAtIDE1KSArIDEwKTsgfVxyXG5mdW5jdGlvbiBsZXJwKCB0LCBhLCBiKSB7IHJldHVybiBhICsgdCAqIChiIC0gYSk7IH1cclxuZnVuY3Rpb24gZ3JhZChoYXNoLCB4LCB5LCB6KSB7XHJcbiAgdmFyIGggPSBoYXNoICYgMTU7IC8vIENPTlZFUlQgTE8gNCBCSVRTIE9GIEhBU0ggQ09ERVxyXG4gIHZhciB1ID0gaDw4ID8geCA6IHksIC8vIElOVE8gMTIgR1JBRElFTlQgRElSRUNUSU9OUy5cclxuICAgIHYgPSBoPDQgPyB5IDogaD09PTEyfHxoPT09MTQgPyB4IDogejtcclxuICByZXR1cm4gKChoJjEpID09PSAwID8gdSA6IC11KSArICgoaCYyKSA9PT0gMCA/IHYgOiAtdik7XHJcbn0gXHJcbmZ1bmN0aW9uIHNjYWxlKG4pIHsgcmV0dXJuICgxICsgbikvMjsgfVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQWNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/perlin.js\n");

/***/ }),

/***/ "./particle.js":
/*!*********************!*\
  !*** ./particle.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _multidarrays = __webpack_require__(/*! ./lib/multidarrays.js */ \"./lib/multidarrays.js\");\n\nvar _multidarrays2 = _interopRequireDefault(_multidarrays);\n\nvar _perlin = __webpack_require__(/*! ./lib/perlin.js */ \"./lib/perlin.js\");\n\nvar _perlin2 = _interopRequireDefault(_perlin);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction vect(prevx, prevy, x, y, ctx) {\n  ctx.beginPath();\n  ctx.moveTo(prevx, prevy);\n  ctx.lineTo(prevx + (x - prevx) / 1, prevy + (y - prevy) / 1);\n  ctx.closePath();\n  ctx.strokeStyle = 'rgba(0,0,0,0.01)';\n  ctx.stroke();\n}\n\nvar Particle = function () {\n  function Particle(x, y, v, angle) {\n    _classCallCheck(this, Particle);\n\n    this.x = x || 0;\n    this.y = y || 0;\n\n    this.prevX = this.x;\n    this.prevY = this.y;\n\n    this.angle = angle;\n    this.ax = 0;\n    this.ay = 0;\n\n    this.vx = v * Math.cos(angle) || 0;\n    this.vy = v * Math.sin(angle) || 0;\n\n    this.magnet = 3;\n    this.irr = 0.2;\n  }\n\n  _createClass(Particle, [{\n    key: 'draw',\n    value: function draw(ctx) {\n\n      ctx.beginPath();\n      vect(this.prevX, this.prevY, this.x, this.y, ctx);\n      ctx.closePath();\n    }\n  }, {\n    key: 'prevUpdate',\n    value: function prevUpdate() {\n      this.prevX = this.x;\n      this.prevY = this.y;\n    }\n  }, {\n    key: 'force',\n    value: function force(vector, obj) {\n      this.prevUpdate();\n      var coordx = Math.floor(this.x / obj.elwidth);\n      var coordy = Math.floor(this.y / obj.elheight);\n\n      if (coordx >= obj.cols) {\n        coordx = obj.cols - 1;\n      };\n      if (coordy >= obj.rows) {\n        coordy = obj.rows - 1;\n      };\n\n      if (coordx <= 0) {\n        coordx = 0;\n      };\n      if (coordy <= 0) {\n        coordy = 0;\n      };\n\n      this.ax += vector[coordy][coordx][0] / this.magnet;\n      this.ay += vector[coordy][coordx][1] / this.magnet;\n    }\n  }, {\n    key: 'move',\n    value: function move(obj) {\n      this.vx += this.ax;\n      this.vy += this.ay;\n\n      this.x += this.vx;\n      this.y += this.vy;\n\n      this.ax = 0;\n      this.ay = 0;\n\n      this.vx *= this.irr;\n      this.vy *= this.irr;\n\n      if (this.y >= obj.height) {\n        this.y = 0;\n        this.x = Math.random() * obj.width;\n        this.prevUpdate();\n      } else if (this.y <= 0) {\n        this.y = obj.height;\n        this.x = Math.random() * obj.width;\n        this.prevUpdate();\n      } else if (this.x >= obj.width) {\n        this.x = 0;\n        this.y = Math.random() * obj.height;\n        this.prevUpdate();\n      } else if (this.x <= 0) {\n        this.x = obj.width;\n        this.y = Math.random() * obj.height;\n        this.prevUpdate();\n      }\n\n      // // console.log(obj.height);\n      // if(this.y >= obj.height) {this.y = 0;};\n      // if(this.y <= 0) {this.y = obj.height;};\n    }\n  }]);\n\n  return Particle;\n}();\n\nexports.default = Particle;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYXJ0aWNsZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvcGFydGljbGUuanM/MDc3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlQXJyYXkgZnJvbSAnLi9saWIvbXVsdGlkYXJyYXlzLmpzJztcclxuaW1wb3J0IFBlcmxpbiBmcm9tICcuL2xpYi9wZXJsaW4uanMnO1xyXG5cclxuZnVuY3Rpb24gdmVjdChwcmV2eCxwcmV2eSx4LHksY3R4KSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5tb3ZlVG8ocHJldngscHJldnkpO1xyXG4gIGN0eC5saW5lVG8ocHJldngrKHgtcHJldngpLzEscHJldnkrKHktcHJldnkpLzEpO1xyXG4gIGN0eC5jbG9zZVBhdGgoKTtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgwLDAsMCwwLjAxKSc7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcclxuICBjb25zdHJ1Y3Rvcih4LHksdixhbmdsZSkge1xyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMucHJldlggPSB0aGlzLng7XHJcbiAgICB0aGlzLnByZXZZID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcclxuICAgIHRoaXMuYXggPSAwO1xyXG4gICAgdGhpcy5heSA9IDA7XHJcblxyXG4gICAgdGhpcy52eCA9IHYqTWF0aC5jb3MoYW5nbGUpIHx8IDA7XHJcbiAgICB0aGlzLnZ5ID0gdipNYXRoLnNpbihhbmdsZSkgfHwgMDtcclxuXHJcbiAgICB0aGlzLm1hZ25ldCA9IDM7XHJcbiAgICB0aGlzLmlyciA9IDAuMjtcclxuICB9XHJcbiAgZHJhdyhjdHgpIHtcclxuXHJcbiAgXHRjdHguYmVnaW5QYXRoKCk7XHJcbiAgICB2ZWN0KHRoaXMucHJldlgsdGhpcy5wcmV2WSx0aGlzLngsdGhpcy55LGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcblxyXG4gIH1cclxuICBwcmV2VXBkYXRlKCkge1xyXG4gICAgdGhpcy5wcmV2WCA9IHRoaXMueDtcclxuICAgIHRoaXMucHJldlkgPSB0aGlzLnk7XHJcbiAgfVxyXG4gIGZvcmNlKHZlY3Rvciwgb2JqKSB7XHJcbiAgICB0aGlzLnByZXZVcGRhdGUoKTtcclxuIFx0XHRsZXQgY29vcmR4ID0gTWF0aC5mbG9vcih0aGlzLngvb2JqLmVsd2lkdGgpO1xyXG4gIFx0bGV0IGNvb3JkeSA9IE1hdGguZmxvb3IodGhpcy55L29iai5lbGhlaWdodCk7XHJcblxyXG4gIFx0aWYoY29vcmR4Pj1vYmouY29scykge2Nvb3JkeD1vYmouY29scy0xO307XHJcbiAgXHRpZihjb29yZHk+PW9iai5yb3dzKSB7Y29vcmR5PW9iai5yb3dzLTE7fTtcclxuXHJcbiAgXHRpZihjb29yZHg8PTApIHtjb29yZHg9MDt9O1xyXG4gIFx0aWYoY29vcmR5PD0wKSB7Y29vcmR5PTA7fTtcclxuXHJcbiAgXHR0aGlzLmF4ICs9IHZlY3Rvcltjb29yZHldW2Nvb3JkeF1bMF0vdGhpcy5tYWduZXQ7XHJcbiAgXHR0aGlzLmF5ICs9IHZlY3Rvcltjb29yZHldW2Nvb3JkeF1bMV0vdGhpcy5tYWduZXQ7XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9iaikge1xyXG4gIFx0dGhpcy52eCArPXRoaXMuYXg7XHJcbiAgXHR0aGlzLnZ5ICs9IHRoaXMuYXk7XHJcblxyXG4gIFx0dGhpcy54ICs9IHRoaXMudng7XHJcbiAgICB0aGlzLnkgKz10aGlzLnZ5O1xyXG4gICBcclxuICAgIHRoaXMuYXggPSAwO1xyXG4gICAgdGhpcy5heSA9IDA7XHJcblxyXG4gICAgdGhpcy52eCAqPSB0aGlzLmlycjtcclxuICAgIHRoaXMudnkgKj0gdGhpcy5pcnI7XHJcblxyXG4gICAgaWYodGhpcy55ID49IG9iai5oZWlnaHQpIHtcclxuICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgdGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIG9iai53aWR0aDtcclxuICAgICAgdGhpcy5wcmV2VXBkYXRlKCk7XHJcbiAgICB9IGVsc2VcclxuICAgIGlmKHRoaXMueSA8PSAwKSB7XHJcbiAgICAgIHRoaXMueSA9IG9iai5oZWlnaHQ7XHJcbiAgICAgIHRoaXMueCA9IE1hdGgucmFuZG9tKCkgKiBvYmoud2lkdGg7XHJcbiAgICAgIHRoaXMucHJldlVwZGF0ZSgpO1xyXG4gICAgfSBlbHNlXHJcblxyXG4gICAgaWYodGhpcy54ID49IG9iai53aWR0aCkge1xyXG4gICAgICB0aGlzLnggPSAwO1xyXG4gICAgICB0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogb2JqLmhlaWdodDtcclxuICAgICAgdGhpcy5wcmV2VXBkYXRlKCk7XHJcbiAgICB9IGVsc2VcclxuICAgXHRpZih0aGlzLnggPD0gMCkgeyBcclxuICAgICAgdGhpcy54ID0gb2JqLndpZHRoOyBcclxuICAgICAgdGhpcy55ID0gTWF0aC5yYW5kb20oKSAqIG9iai5oZWlnaHQ7XHJcbiAgICAgIHRoaXMucHJldlVwZGF0ZSgpO1xyXG4gICAgfSAgXHJcblxyXG4gICBcdC8vIC8vIGNvbnNvbGUubG9nKG9iai5oZWlnaHQpO1xyXG4gICBcdC8vIGlmKHRoaXMueSA+PSBvYmouaGVpZ2h0KSB7dGhpcy55ID0gMDt9O1xyXG4gICBcdC8vIGlmKHRoaXMueSA8PSAwKSB7dGhpcy55ID0gb2JqLmhlaWdodDt9O1xyXG4gIFx0XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBbkZBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./particle.js\n");

/***/ }),

/***/ "./vector.js":
/*!*******************!*\
  !*** ./vector.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Vector = function () {\n  function Vector(x, y, len, angle) {\n    _classCallCheck(this, Vector);\n\n    this.x = x || 0;\n    this.y = y || 0;\n\n    this.angle = angle || Math.PI / 2;\n    this.len = len || 1;\n  }\n\n  _createClass(Vector, [{\n    key: 'draw',\n    value: function draw(ctx) {\n      ctx.beginPath();\n      ctx.moveTo(this.x, this.y);\n      ctx.lineTo(this.x + this.len * Math.cos(this.angle), this.y + this.len * Math.sin(this.angle));\n      ctx.closePath();\n      ctx.strokeWidth = 2;\n      ctx.strokeStyle = '#000000';\n      ctx.stroke();\n    }\n  }]);\n\n  return Vector;\n}();\n\nexports.default = Vector;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi92ZWN0b3IuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2pzL3ZlY3Rvci5qcz9lNzU2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XHJcbiAgY29uc3RydWN0b3IoeCx5LGxlbixhbmdsZSkge1xyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZSB8fCBNYXRoLlBJIC8gMjtcclxuICAgIHRoaXMubGVuID0gbGVuIHx8IDE7XHJcbiAgfVxyXG4gIGRyYXcoY3R4KSB7XHJcblx0ICBjdHguYmVnaW5QYXRoKCk7XHJcblx0ICBjdHgubW92ZVRvKHRoaXMueCx0aGlzLnkpO1xyXG5cdCAgY3R4LmxpbmVUbyh0aGlzLngrdGhpcy5sZW4qTWF0aC5jb3ModGhpcy5hbmdsZSksdGhpcy55K3RoaXMubGVuKk1hdGguc2luKHRoaXMuYW5nbGUpKTtcclxuXHQgIGN0eC5jbG9zZVBhdGgoKTtcclxuXHQgIGN0eC5zdHJva2VXaWR0aCA9IDI7XHJcblx0ICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XHJcblx0ICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQWhCQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./vector.js\n");

/***/ })

/******/ });