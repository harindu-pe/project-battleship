import ship from "./ship";

// gameboard factory function
function initGameBoard(size) {
  return {
    boardSize: size,
    missed: [],
    played: [],
    board: createBoard(size),
    hasFailed: false,
    placeShip: function (coordinates, shipLength, isVertical) {
      // create a ship
      const placedShip = ship(shipLength);
      const coordinatesArray = coordinates.split(",");
      let row = parseInt(coordinatesArray[0]);
      let col = parseInt(coordinatesArray[1]);

      // if placement is not possible return false
      if (
        !isPlacementPossible(
          this.board,
          placedShip,
          row,
          col,
          isVertical,
          this.boardSize
        )
      ){
        return false;
      }
        

      // if placement is possible check if vertical
      if (isVertical) {
        for (let i = 0; i < placedShip.length; i++) {
          this.board[`${row + i},${col}`] = placedShip;
        }
      } else {
        for (let i = 0; i < placedShip.length; i++) {
          this.board[`${row},${col + i}`] = placedShip;
        }
      }
      return true;
    },
    receiveAttack: function (coordinates) {
      if (
        this.board[`${coordinates}`] !== null &&
        !this.played.includes(`${coordinates}`)
      ) {
        // recording the shot
        this.played.push(`${coordinates}`);
        // hitting the ship
        this.board[`${coordinates}`].hit();
      } else {
        // recording the missed shot
        this.missed.push(`${coordinates}`);
      }
    },
    hasAllShipsSunk: function () {
      const shipCheck = [];
      for (let ship in this.board) {
        // if there is a ship
        if (this.board[ship] !== null) {
          shipCheck.push(this.board[ship].isSunk());
        }
      }
      let checker = (arr) => arr.every((v) => v === true);
      return checker(shipCheck);
    },
    placeShipRandom: function () {
      // ships array
      const ships = [5, 4, 3];

      let succesfulPlacements = 0;

      while (succesfulPlacements < 3) {
        const randCoordinates = genRandCoordinates(this.boardSize);
        const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

        if (
          this.placeShip(
            randCoordinates,
            ships[succesfulPlacements],
            isVertical
          )
        ) {
          succesfulPlacements++;
        }
      }
    },
  };
}

// helper function to check if placing ship is possible
function isPlacementPossible(board, ship, row, column, isVertical, size) {
  // case position is out of gameboard
  if (row < 1 || row > size || column < 1 || column > size) return false;

  // case ship doesn't fit in gameboard
  if (isVertical) {
    if (row + ship.length - 1 > size) return false;
  } else {
    if (column + ship.length - 1 > size) {
      return false;
    }
  }
  

  // case any of the fields is already taken
  if (isVertical) {
    for (let i = 0; i < ship.length; i++) {
      if (board[`${row + i},${column}`]) return false;
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      if (board[`${row},${column + i}`]) return false;
    }
  }

  // case any of the neighbour fields are already taken
  if (isVertical) {
    for (let i = 0; i < ship.length; i++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (
            row + x + i < 0 ||
            row + x + i >= size ||
            column + y < 0 ||
            column + y >= size
          ) {
            continue;
          }

          if (board[`${row + x + i},${column + y}`] !== null) {
            return false;
          }
        }
      }
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (
            row + x < 0 ||
            row + x >= size ||
            column + y + i < 0 ||
            column + y + i >= size
          ) {
            continue;
          }

          if (board[`${row + x},${column + y + i}`] !== null) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

// helper function to create the board
function createBoard(size) {
  const board = {};
  for (let row = 1; row <= size; row++) {
    for (let col = 1; col <= size; col++) {
      board[`${row},${col}`] = null;
    }
  }
  return board;
}

// helper function to generate random coordinates
function genRandCoordinates(size) {
  const coordinatesArray = [];
  for (let row = 1; row <= size; row++) {
    for (let col = 1; col <= size; col++) {
      coordinatesArray.push(`${row},${col}`);
    }
  }
  const randomElement =
    coordinatesArray[Math.floor(Math.random() * coordinatesArray.length)];
  return randomElement;
}

export default initGameBoard;
