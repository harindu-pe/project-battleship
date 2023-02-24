import createPlayer from "./createPlayer";
import initGameBoard from "./gameBoard";

// reference html elements
const playerGrid = document.getElementById("player-grid");
const computerGrid = document.getElementById("computer-grid");

// creating the player grid HTML
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    gridDiv.setAttribute("grid", `${i},${j}`);
    playerGrid.appendChild(gridDiv);
  }
}

// creating the computer grid HTML
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    gridDiv.setAttribute("grid", `${i},${j}`);
    computerGrid.appendChild(gridDiv);
  }
}

// player gameboard
const playerBoard = initGameBoard(10);
// playerBoard.placeShipRandom();
console.log(playerBoard.placeShip("10,1", 1, false));

console.log(playerBoard.board);

// player placing ships (WORK IN PROGRESS)
// const playerGridItems = playerGrid.childNodes;
// playerGridItems.forEach((playerGridItem) => {
//   playerGridItem.addEventListener("click", () => {
//     playerBoard.placeShip(playerGridItem.getAttribute("grid"), 1, false);
//     playerGridItem.classList.add("placed");
//   });
// });

// randomly place player ships
const playerGridItems = playerGrid.childNodes;
playerGridItems.forEach((playerGridItem) => {
  const coordinatesArray = playerGridItem.getAttribute("grid").split(",");
  const row = coordinatesArray[0];
  const col = coordinatesArray[1];

  // visualize ships
  if (playerBoard.board[`${row},${col}`] !== null) {
    playerGridItem.classList.add("placed");
  }
});

// setting up computer board
// const computerBoard = initGameBoard(10);
// computerBoard.placeShipRandom();

// computerBoard.receiveAttack("1,1");
// console.log(computerBoard.hasAllShipsSunk());

// const computer = createPlayer("Blaze");
// computer.randomAttackBoard(testBoard);
// computer.playerAttackBoard(testBoard, 11);
