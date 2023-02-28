function generateGrid() {
  // reference html elements
  const playerGrid = document.getElementById("player-grid");
  const computerGrid = document.getElementById("computer-grid");

  // creating the player grid HTML
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridDiv = document.createElement("div");
      gridDiv.classList.add("grid-item");
      gridDiv.setAttribute("row", i);
      gridDiv.setAttribute("col", j);
      playerGrid.appendChild(gridDiv);
    }
  }

  // creating the computer grid HTML
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridDiv = document.createElement("div");
      gridDiv.classList.add("grid-item");
      gridDiv.setAttribute("row", i);
      gridDiv.setAttribute("col", j);
      computerGrid.appendChild(gridDiv);
    }
  }
  return [playerGrid, computerGrid];
}
export default generateGrid;
