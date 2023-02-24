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

/***/ "./src/createPlayer.js":
/*!*****************************!*\
  !*** ./src/createPlayer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// factory function for player\r\nfunction createPlayer(name) {\r\n  return {\r\n    name: name,\r\n    playerAttackBoard: function (gameBoard, coordinates) {\r\n      gameBoard.receiveAttack(coordinates);\r\n    },\r\n    randomAttackBoard: function (gameBoard) {\r\n      // generate random coordinates\r\n      const coordinatesArray = [];\r\n      for (let i = 1; i <= gameBoard.boardSize; i++) {\r\n        for (let j = 1; j <= gameBoard.boardSize; j++) {\r\n          coordinatesArray.push(`${i}${j}`);\r\n        }\r\n      }\r\n      const randomElement =\r\n        coordinatesArray[Math.floor(Math.random() * coordinatesArray.length)];\r\n      // attack coordinates if not attacked before\r\n      if (!gameBoard.missed.includes(randomElement)) {\r\n        gameBoard.receiveAttack(randomElement);\r\n      }\r\n    },\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPlayer);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/createPlayer.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\n// gameboard factory function\r\nfunction initGameBoard(size) {\r\n  return {\r\n    boardSize: size,\r\n    missed: [],\r\n    played: [],\r\n    board: createBoard(size),\r\n    hasFailed: false,\r\n    placeShip: function (coordinates, shipLength, isVertical) {\r\n      // create a ship\r\n      const placedShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shipLength);\r\n      const coordinatesArray = coordinates.split(\",\");\r\n      let row = parseInt(coordinatesArray[0]);\r\n      let col = parseInt(coordinatesArray[1]);\r\n\r\n      // if placement is not possible return false\r\n      if (\r\n        !isPlacementPossible(\r\n          this.board,\r\n          placedShip,\r\n          row,\r\n          col,\r\n          isVertical,\r\n          this.boardSize\r\n        )\r\n      ){\r\n        return false;\r\n      }\r\n        \r\n\r\n      // if placement is possible check if vertical\r\n      if (isVertical) {\r\n        for (let i = 0; i < placedShip.length; i++) {\r\n          this.board[`${row + i},${col}`] = placedShip;\r\n        }\r\n      } else {\r\n        for (let i = 0; i < placedShip.length; i++) {\r\n          this.board[`${row},${col + i}`] = placedShip;\r\n        }\r\n      }\r\n      return true;\r\n    },\r\n    receiveAttack: function (coordinates) {\r\n      if (\r\n        this.board[`${coordinates}`] !== null &&\r\n        !this.played.includes(`${coordinates}`)\r\n      ) {\r\n        // recording the shot\r\n        this.played.push(`${coordinates}`);\r\n        // hitting the ship\r\n        this.board[`${coordinates}`].hit();\r\n      } else {\r\n        // recording the missed shot\r\n        this.missed.push(`${coordinates}`);\r\n      }\r\n    },\r\n    hasAllShipsSunk: function () {\r\n      const shipCheck = [];\r\n      for (let ship in this.board) {\r\n        // if there is a ship\r\n        if (this.board[ship] !== null) {\r\n          shipCheck.push(this.board[ship].isSunk());\r\n        }\r\n      }\r\n      let checker = (arr) => arr.every((v) => v === true);\r\n      return checker(shipCheck);\r\n    },\r\n    placeShipRandom: function () {\r\n      // ships array\r\n      const ships = [5, 4, 3];\r\n\r\n      let succesfulPlacements = 0;\r\n\r\n      while (succesfulPlacements < 3) {\r\n        const randCoordinates = genRandCoordinates(this.boardSize);\r\n        const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;\r\n\r\n        if (\r\n          this.placeShip(\r\n            randCoordinates,\r\n            ships[succesfulPlacements],\r\n            isVertical\r\n          )\r\n        ) {\r\n          succesfulPlacements++;\r\n        }\r\n      }\r\n    },\r\n  };\r\n}\r\n\r\n// helper function to check if placing ship is possible\r\nfunction isPlacementPossible(board, ship, row, column, isVertical, size) {\r\n  // case position is out of gameboard\r\n  if (row < 1 || row > size || column < 1 || column > size) return false;\r\n\r\n  // case ship doesn't fit in gameboard\r\n  if (isVertical) {\r\n    if (row + ship.length - 1 > size) return false;\r\n  } else {\r\n    if (column + ship.length - 1 > size) {\r\n      return false;\r\n    }\r\n  }\r\n  \r\n\r\n  // case any of the fields is already taken\r\n  if (isVertical) {\r\n    for (let i = 0; i < ship.length; i++) {\r\n      if (board[`${row + i},${column}`]) return false;\r\n    }\r\n  } else {\r\n    for (let i = 0; i < ship.length; i++) {\r\n      if (board[`${row},${column + i}`]) return false;\r\n    }\r\n  }\r\n\r\n  // case any of the neighbour fields are already taken\r\n  if (isVertical) {\r\n    for (let i = 0; i < ship.length; i++) {\r\n      for (let x = -1; x <= 1; x++) {\r\n        for (let y = -1; y <= 1; y++) {\r\n          if (\r\n            row + x + i < 0 ||\r\n            row + x + i >= size ||\r\n            column + y < 0 ||\r\n            column + y >= size\r\n          ) {\r\n            continue;\r\n          }\r\n\r\n          if (board[`${row + x + i},${column + y}`] !== null) {\r\n            return false;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  } else {\r\n    for (let i = 0; i < ship.length; i++) {\r\n      for (let x = -1; x <= 1; x++) {\r\n        for (let y = -1; y <= 1; y++) {\r\n          if (\r\n            row + x < 0 ||\r\n            row + x >= size ||\r\n            column + y + i < 0 ||\r\n            column + y + i >= size\r\n          ) {\r\n            continue;\r\n          }\r\n\r\n          if (board[`${row + x},${column + y + i}`] !== null) {\r\n            console.log(\"Dd\");\r\n            return false;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n  return true;\r\n}\r\n\r\n// helper function to create the board\r\nfunction createBoard(size) {\r\n  const board = {};\r\n  for (let row = 1; row <= size; row++) {\r\n    for (let col = 1; col <= size; col++) {\r\n      board[`${row},${col}`] = null;\r\n    }\r\n  }\r\n  return board;\r\n}\r\n\r\n// helper function to generate random coordinates\r\nfunction genRandCoordinates(size) {\r\n  const coordinatesArray = [];\r\n  for (let row = 1; row <= size; row++) {\r\n    for (let col = 1; col <= size; col++) {\r\n      coordinatesArray.push(`${row},${col}`);\r\n    }\r\n  }\r\n  const randomElement =\r\n    coordinatesArray[Math.floor(Math.random() * coordinatesArray.length)];\r\n  return randomElement;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initGameBoard);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPlayer */ \"./src/createPlayer.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n\r\n\r\n\r\n// reference html elements\r\nconst playerGrid = document.getElementById(\"player-grid\");\r\nconst computerGrid = document.getElementById(\"computer-grid\");\r\n\r\n// creating the player grid HTML\r\nfor (let i = 1; i <= 10; i++) {\r\n  for (let j = 1; j <= 10; j++) {\r\n    const gridDiv = document.createElement(\"div\");\r\n    gridDiv.classList.add(\"grid-item\");\r\n    gridDiv.setAttribute(\"grid\", `${i},${j}`);\r\n    playerGrid.appendChild(gridDiv);\r\n  }\r\n}\r\n\r\n// creating the computer grid HTML\r\nfor (let i = 1; i <= 10; i++) {\r\n  for (let j = 1; j <= 10; j++) {\r\n    const gridDiv = document.createElement(\"div\");\r\n    gridDiv.classList.add(\"grid-item\");\r\n    gridDiv.setAttribute(\"grid\", `${i},${j}`);\r\n    computerGrid.appendChild(gridDiv);\r\n  }\r\n}\r\n\r\n// player gameboard\r\nconst playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10);\r\n// playerBoard.placeShipRandom();\r\nconsole.log(playerBoard.placeShip(\"10,1\", 1, false));\r\n\r\nconsole.log(playerBoard.board);\r\n\r\n// player placing ships (WORK IN PROGRESS)\r\n// const playerGridItems = playerGrid.childNodes;\r\n// playerGridItems.forEach((playerGridItem) => {\r\n//   playerGridItem.addEventListener(\"click\", () => {\r\n//     playerBoard.placeShip(playerGridItem.getAttribute(\"grid\"), 1, false);\r\n//     playerGridItem.classList.add(\"placed\");\r\n//   });\r\n// });\r\n\r\n// randomly place player ships\r\nconst playerGridItems = playerGrid.childNodes;\r\nplayerGridItems.forEach((playerGridItem) => {\r\n  const coordinatesArray = playerGridItem.getAttribute(\"grid\").split(\",\");\r\n  const row = coordinatesArray[0];\r\n  const col = coordinatesArray[1];\r\n\r\n  // visualize ships\r\n  if (playerBoard.board[`${row},${col}`] !== null) {\r\n    playerGridItem.classList.add(\"placed\");\r\n  }\r\n});\r\n\r\n// setting up computer board\r\n// const computerBoard = initGameBoard(10);\r\n// computerBoard.placeShipRandom();\r\n\r\n// computerBoard.receiveAttack(\"1,1\");\r\n// console.log(computerBoard.hasAllShipsSunk());\r\n\r\n// const computer = createPlayer(\"Blaze\");\r\n// computer.randomAttackBoard(testBoard);\r\n// computer.playerAttackBoard(testBoard, 11);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// ship factory function\r\nfunction ship(size) {\r\n  return {\r\n    length: size,\r\n    timesHit: 0,\r\n    sinkStatus: false,\r\n    hit: function () {\r\n      if (this.timesHit < this.length) {\r\n        this.timesHit += 1;\r\n      }\r\n    },\r\n    isSunk: function () {\r\n      return  true ? this.timesHit === this.length : 0;\r\n    },\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);\r\n\n\n//# sourceURL=webpack://project-battleship/./src/ship.js?");

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