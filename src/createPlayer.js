// factory function for player
function createPlayer(name) {
  return {
    name: name,
    playerAttackBoard: function (gameBoard, coordinates) {
      gameBoard.receiveAttack(coordinates);
    },
    randomAttackBoard: function (gameBoard) {
      // generate random coordinates
      const coordinatesArray = [];
      for (let i = 1; i <= gameBoard.boardSize; i++) {
        for (let j = 1; j <= gameBoard.boardSize; j++) {
          coordinatesArray.push(`${i}${j}`);
        }
      }
      const randomElement =
        coordinatesArray[Math.floor(Math.random() * coordinatesArray.length)];
      // attack coordinates if not attacked before
      if (!gameBoard.missed.includes(randomElement)) {
        gameBoard.receiveAttack(randomElement);
      }
    },
  };
}

export default createPlayer;
