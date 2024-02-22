const board = Array.from(Array(9).keys());
// console.log(board);
const humanP = "O";
const aiP = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
const cells = document.querySelectorAll(".cell");
const button = document.querySelector(".replay");
const endGame = document.querySelector(".endgame");
const endGameText = document.querySelector(".text");
// console.log(cells);
const startGame = () => {
  endGame.style.display = "none";
  //   for (var i = 0; i < cells.length; i++) {
  //     cells[i].innerText = "";
  //     cells[i].style.removeProperty("background-color");
  //     cells[i].addEventListener("click", turnClick, false);
  //   }
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.removeProperty("background-color");
    cell.addEventListener("click", turnClick, false);
  });
};
const turnClick = (el) => {
  //   console.log(el.target.id);
  const id = parseInt(el.target.id);
  if (typeof board[el.target.id] == "number") {
    turn(id, humanP);
    if (!checkTie()) {
      turn(bestSpot(), aiP);
    }
  }
};
const bestSpot = () => {
  console.log(
    `this is the call from the bestspot function ${emptySquare()[0]}`
  );
  return emptySquare()[0];
};
const emptySquare = () => {
  console.log(board.filter((el) => typeof el === "number"));
  return board.filter((el) => typeof el === "number");
};
const checkTie = () => {
  if (emptySquare().length == 0) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = "green";
      cell.removeEventListener("click", turnClick, false);
    });
    declareWinner("Tie Game!");
    return true;
  }
  return false;
};
const declareWinner = (who) => {
  endGame.style.display = "block";
  endGameText.innerText = who;
};
const determineWin = (board, player) => {
  const plays = board.reduce((a, el, i) => {
    return el === player ? [...a, i] : a;
  }, []);
  let gameWon = null;
  winCombos.forEach((win, index) => {
    if (win.every((elem) => plays.includes(elem))) {
      gameWon = { index, player };
      return;
    }
  });
  return gameWon;
};
const gameOver = (gameWin) => {
  winCombos[gameWin.index].forEach((index) => {
    document.getElementById(index).style.backgroundColor =
      gameWin.player == humanP ? "blue" : "red";
  });
  cells.forEach((cell) => {
    cell.removeEventListener("click", turnClick, false);
  });
  declareWinner(gameWin.player == humanP ? "You Win" : "AI Win");
};
const turn = (id, player) => {
  board[id] = player;
  console.log(`id : ${id} for player ${player}`);
  document.getElementById(id).innerText = player;
  let gameWin = determineWin(board, player);
  if (gameWin) gameOver(gameWin);
};
// calling the game
startGame();
