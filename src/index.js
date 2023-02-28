import Ship from "./factories/Ship";
import Gameboard from "./factories/Gameboard";
import Player from "./factories/Player";
import generateGrid from "./dom/generateGrid";

// HTML
const [playerGrid, computerGrid] = generateGrid();
const startButton = document.getElementById("start-button");

// start game loop when user clicks start button
startButton.addEventListener("click", () => {
  startGame(playerGrid);
});

// game loop logic
function startGame(playerGrid) {
  // initialize game
  const [
    playerGameBoard,
    playerCharacter,
    computerGameBoard,
    computerCharacter,
  ] = initializeGame();
  // place player ships randomly
  playerGameBoard.placeShipsRandomly();
  // place computer ships randomly
  computerGameBoard.placeShipsRandomly();

  // visualize player ships
  updateGridHTML(playerGrid, playerGameBoard);
  updateGridHTML(computerGrid, computerGameBoard);
}

// initialize gameboard and players
function initializeGame() {
  // player
  const playerGameBoard = new Gameboard();
  playerGameBoard.placeShipsRandomly();
  const playerCharacter = new Player("player");
  // computer
  const computerGameBoard = new Gameboard();
  const computerCharacter = new Player("computer");

  return [
    playerGameBoard,
    playerCharacter,
    computerGameBoard,
    computerCharacter,
  ];
}

// update the grid
function updateGridHTML(grid, gameboard) {
  const gridItems = grid.childNodes;
  gridItems.forEach((gridItem) => {
    const row = gridItem.getAttribute("row");
    const col = gridItem.getAttribute("col");
    // visualize ships
    if (gameboard.board[row][col] !== null) {
      gridItem.classList.add("placed");
    }
  });
}
