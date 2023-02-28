/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/generateGrid.js":
/*!*********************************!*\
  !*** ./src/dom/generateGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction generateGrid() {\r\n  // reference html elements\r\n  const playerGrid = document.getElementById(\"player-grid\");\r\n  const computerGrid = document.getElementById(\"computer-grid\");\r\n\r\n  // creating the player grid HTML\r\n  for (let i = 0; i < 10; i++) {\r\n    for (let j = 0; j < 10; j++) {\r\n      const gridDiv = document.createElement(\"div\");\r\n      gridDiv.classList.add(\"grid-item\");\r\n      gridDiv.setAttribute(\"row\", i);\r\n      gridDiv.setAttribute(\"col\", j);\r\n      playerGrid.appendChild(gridDiv);\r\n    }\r\n  }\r\n\r\n  // creating the computer grid HTML\r\n  for (let i = 0; i < 10; i++) {\r\n    for (let j = 0; j < 10; j++) {\r\n      const gridDiv = document.createElement(\"div\");\r\n      gridDiv.classList.add(\"grid-item\");\r\n      gridDiv.setAttribute(\"row\", i);\r\n      gridDiv.setAttribute(\"col\", j);\r\n      computerGrid.appendChild(gridDiv);\r\n    }\r\n  }\r\n  return [playerGrid, computerGrid];\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateGrid);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/dom/generateGrid.js?");

/***/ }),

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/factories/Ship.js\");\n\r\n\r\nconst SIZE = 10;\r\n\r\nclass Gameboard {\r\n  constructor() {\r\n    this.board = [];\r\n    this.missedShots = [];\r\n    this.initialize();\r\n  }\r\n\r\n  initialize() {\r\n    for (let row = 0; row < SIZE; row++) {\r\n      this.board[row] = [];\r\n      this.missedShots[row] = [];\r\n      for (let col = 0; col < SIZE; col++) {\r\n        this.board[row][col] = null;\r\n        this.missedShots[row][col] = false;\r\n      }\r\n    }\r\n  }\r\n\r\n  placeShip(ship, row, column, isVertical) {\r\n    if (!this.isPlacementPossible(ship, row, column, isVertical)) return false;\r\n\r\n    if (isVertical) {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        this.board[row + i][column] = ship;\r\n      }\r\n    } else {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        this.board[row][column + i] = ship;\r\n      }\r\n    }\r\n    return true;\r\n  }\r\n\r\n  placeShipsRandomly() {\r\n    if (!this.isEmpty()) return;\r\n\r\n    const ships = [];\r\n    const carrier = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5);\r\n    const battleship = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4);\r\n    const destroyer = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\r\n    const submarine = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\r\n    const patrolBoat = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2);\r\n    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);\r\n\r\n    let succesfulPlacements = 0;\r\n\r\n    while (succesfulPlacements < 5) {\r\n      const row = Math.floor(Math.random() * 10);\r\n      const column = Math.floor(Math.random() * 10);\r\n      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;\r\n\r\n      if (this.placeShip(ships[succesfulPlacements], row, column, isVertical))\r\n        succesfulPlacements++;\r\n    }\r\n  }\r\n\r\n  isPlacementPossible(ship, row, column, isVertical) {\r\n    // case position is out of gameboard\r\n    if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {\r\n      return false;\r\n    }\r\n\r\n    // case ship doesn't fit in gameboard\r\n    if (isVertical) {\r\n      if (row + ship.length > SIZE) return false;\r\n    } else {\r\n      if (column + ship.length > SIZE) return false;\r\n    }\r\n\r\n    // case any of the fields is already taken\r\n    if (isVertical) {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        if (this.board[row + i][column]) return false;\r\n      }\r\n    } else {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        if (this.board[row][column + i]) return false;\r\n      }\r\n    }\r\n\r\n    // case any of the neighbour fields are already taken\r\n    if (isVertical) {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        for (let x = -1; x <= 1; x++) {\r\n          for (let y = -1; y <= 1; y++) {\r\n            if (\r\n              row + x + i < 0 ||\r\n              row + x + i >= SIZE ||\r\n              column + y < 0 ||\r\n              column + y >= SIZE\r\n            )\r\n              continue;\r\n            if (this.board[row + x + i][column + y]) return false;\r\n          }\r\n        }\r\n      }\r\n    } else {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        for (let x = -1; x <= 1; x++) {\r\n          for (let y = -1; y <= 1; y++) {\r\n            if (\r\n              row + x < 0 ||\r\n              row + x >= SIZE ||\r\n              column + y + i < 0 ||\r\n              column + y + i >= SIZE\r\n            )\r\n              continue;\r\n            if (this.board[row + x][column + y + i]) return false;\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    return true;\r\n  }\r\n\r\n  isEmpty() {\r\n    for (let i = 0; i < SIZE; i++) {\r\n      for (let j = 0; j < SIZE; j++) {\r\n        if (this.board[i][j] !== null) return false;\r\n      }\r\n    }\r\n    return true;\r\n  }\r\n\r\n  receiveAttack(row, column) {\r\n    if (row < 0 || row >= SIZE || column < 0 || column >= SIZE) {\r\n      return false;\r\n    }\r\n\r\n    if (this.board[row][column]) {\r\n      let hitIndex = 0;\r\n      // is vertical\r\n      if (column > 0 && this.board[row][column - 1]) {\r\n        let i = 1;\r\n        while (column - i >= 0 && this.board[row][column - i]) {\r\n          hitIndex++;\r\n          i++;\r\n        }\r\n      }\r\n      // is horizontal\r\n      else if (row > 0 && this.board[row - 1][column]) {\r\n        let i = 1;\r\n        while (row - i >= 0 && this.board[row - i][column]) {\r\n          hitIndex++;\r\n          i++;\r\n        }\r\n      }\r\n      this.board[row][column].hit(hitIndex);\r\n      return true;\r\n    } else {\r\n      this.missedShots[row][column] = true;\r\n      return false;\r\n    }\r\n  }\r\n\r\n  isGameOver() {\r\n    let isBoardEmpty = true;\r\n    for (let i = 0; i < SIZE; i++) {\r\n      for (let j = 0; j < SIZE; j++) {\r\n        if (this.board[i][j]) {\r\n          isBoardEmpty = false;\r\n          if (!this.board[i][j].isSunk()) {\r\n            return false;\r\n          }\r\n        }\r\n      }\r\n    }\r\n    return isBoardEmpty ? false : true;\r\n  }\r\n\r\n  getEmptyFieldsAmount() {\r\n    let result = 0;\r\n    for (let i = 0; i < SIZE; i++) {\r\n      for (let j = 0; j < SIZE; j++) {\r\n        if (this.board[i][j] === null) result++;\r\n      }\r\n    }\r\n    return result;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\r\n  constructor(name) {\r\n    this.name = name;\r\n    this.alreadyHitCoords = [];\r\n  }\r\n\r\n  attack(positionX, positionY, gameboard) {\r\n    if (this.hasAlreadyHit(positionX, positionY)) return;\r\n\r\n    this.alreadyHitCoords.push([positionX, positionY]);\r\n    gameboard.receiveAttack(positionX, positionY);\r\n  }\r\n\r\n  randomAttack(gameboard) {\r\n    if (this.alreadyHitCoords.length === 100) return;\r\n\r\n    let positionX = Math.floor(Math.random() * 10);\r\n    let positionY = Math.floor(Math.random() * 10);\r\n\r\n    while (this.hasAlreadyHit(positionX, positionY)) {\r\n      positionX = Math.floor(Math.random() * 10);\r\n      positionY = Math.floor(Math.random() * 10);\r\n    }\r\n\r\n    this.alreadyHitCoords.push([positionX, positionY]);\r\n    gameboard.receiveAttack(positionX, positionY);\r\n  }\r\n\r\n  hasAlreadyHit(positionX, positionY) {\r\n    for (let i = 0; i < this.alreadyHitCoords.length; i++) {\r\n      if (\r\n        this.alreadyHitCoords[i][0] === positionX &&\r\n        this.alreadyHitCoords[i][1] === positionY\r\n      ) {\r\n        return true;\r\n      }\r\n    }\r\n    return false;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/factories/Player.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\r\n  constructor(length) {\r\n    this.length = length;\r\n    this.hits = [];\r\n  }\r\n\r\n  hit(position) {\r\n    if (\r\n      this.hits.includes(position) ||\r\n      position < 0 ||\r\n      position >= this.length\r\n    ) {\r\n      return;\r\n    }\r\n    this.hits.push(position);\r\n  }\r\n\r\n  isSunk() {\r\n    return this.hits.length === this.length;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factories_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Ship */ \"./src/factories/Ship.js\");\n/* harmony import */ var _factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Gameboard */ \"./src/factories/Gameboard.js\");\n/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\n/* harmony import */ var _dom_generateGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/generateGrid */ \"./src/dom/generateGrid.js\");\n\r\n\r\n\r\n\r\n\r\n// HTML\r\nconst [playerGrid, computerGrid] = (0,_dom_generateGrid__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\r\nconst startButton = document.getElementById(\"start-button\");\r\n\r\n// start game loop when user clicks start button\r\nstartButton.addEventListener(\"click\", () => {\r\n  startGame(playerGrid);\r\n});\r\n\r\n// game loop logic\r\nfunction startGame(playerGrid) {\r\n  // initialize game\r\n  const [\r\n    playerGameBoard,\r\n    playerCharacter,\r\n    computerGameBoard,\r\n    computerCharacter,\r\n  ] = initializeGame();\r\n  // place player ships randomly\r\n  playerGameBoard.placeShipsRandomly();\r\n  // place computer ships randomly\r\n  computerGameBoard.placeShipsRandomly();\r\n\r\n  // visualize player ships\r\n  updateGridHTML(playerGrid, playerGameBoard);\r\n  updateGridHTML(computerGrid, computerGameBoard);\r\n}\r\n\r\n// initialize gameboard and players\r\nfunction initializeGame() {\r\n  // player\r\n  const playerGameBoard = new _factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n  playerGameBoard.placeShipsRandomly();\r\n  const playerCharacter = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"player\");\r\n  // computer\r\n  const computerGameBoard = new _factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n  const computerCharacter = new _factories_Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"computer\");\r\n\r\n  return [\r\n    playerGameBoard,\r\n    playerCharacter,\r\n    computerGameBoard,\r\n    computerCharacter,\r\n  ];\r\n}\r\n\r\n// update the grid\r\nfunction updateGridHTML(grid, gameboard) {\r\n  const gridItems = grid.childNodes;\r\n  gridItems.forEach((gridItem) => {\r\n    const row = gridItem.getAttribute(\"row\");\r\n    const col = gridItem.getAttribute(\"col\");\r\n    // visualize ships\r\n    if (gameboard.board[row][col] !== null) {\r\n      gridItem.classList.add(\"placed\");\r\n    }\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;