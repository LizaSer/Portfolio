const playerScoreNum = document.getElementById("player-score-num");
const computerScoreNum = document.getElementById("computer-score-num");
const introContainer = document.getElementById("intro-container");
let playerScore = 0;
let computerScore = 0;

//---------------------tic-tac-toe-game-------------------------

const statusDisplayEl = document.getElementById("status-display");
const errorMessageSign = document.getElementById("status-error-selected-sign");
const restartGameEl = document.getElementById("restart-game");
const startTicTacToeGame = document.getElementById("tic-tac-toe-start-game");
const gameBoardTicTacToeGame = document.getElementById("tic-tac-toe-game");
let flag = true;

restartGameEl.addEventListener("click", handleRestartGame);
startTicTacToeGame.addEventListener("click", showGame);

function showGame() {
  gameBoardTicTacToeGame.classList.toggle("display-tic-tac-toe-game");
  startTicTacToeGame.classList.toggle("clicked");
  introContainer.classList.add("status-display");
  startRockPaperScissorsSGame.classList.remove("clicked");
  HangmanStartGame.classList.remove("clicked");
  gameBoardRockPaperScissorsSGame.classList.remove(
    "rock-paper-scissors-game-display"
  );
  gameBoardHangmanGame.classList.remove("display-Hangman-game");
}

document
  .querySelectorAll(".tic-tac-toe-sign")
  .forEach((ticTacToeSign) =>
    ticTacToeSign.addEventListener("click", handlePlayerSign)
  );

function handlePlayerSign(selectSign) {
  let chosenPlayerSign = "";
  if (flag) {
    const selectSignId = selectSign.target.id;
    const currentPlayerSignEl = document.getElementById(selectSignId);
    currentPlayerSignEl.classList.add("chosen-sign");
    chosenPlayerSign = currentPlayerSignEl.innerHTML;
    flag = false;
    startNewGame(chosenPlayerSign);
  } else {
    errorMessageSign.classList.add("display");
  }
}

function startNewGame(chosenPlayerSign) {
  let currentPlayer = chosenPlayerSign;
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  const playerIndexChose = [];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));

  function handleCellClick(clickedCellEvent) {
    errorMessageSign.classList.remove("display");
    const clickedCellId = clickedCellEvent.target.id;
    const clickedCellEl = document.getElementById(clickedCellId);
    handleCellChangeToPlayed(clickedCellId, clickedCellEl);
  }

  function handleCellChangeToPlayed(clickedCellId, clickedCellEl) {
    const clickedCellIndex = clickedCellId.split("-")[1];
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }
    handleCellPlayed(clickedCellEl, clickedCellIndex);
    handleResultValidation(clickedCellIndex);
  }

  function handleCellPlayed(clickedCellEl, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCellEl.innerHTML = currentPlayer;
  }

  function handleResultValidation(clickedCellIndex) {
    let checkWin = false;
    for (let i = 0; i <= 7; i++) {
      const winSituation = winningConditions[i];
      let a = gameState[winSituation[0]];
      let b = gameState[winSituation[1]];
      let c = gameState[winSituation[2]];

      if (a == "" || b == "" || c == "") {
        continue;
      }

      if (a == b && b == c) {
        checkWin = true;
        break;
      }
    }

    if (checkWin) {
      statusDisplayEl.classList.add("display");
      statusDisplayEl.innerHTML = `🥳 ${currentPlayer} Win`;
      if (currentPlayer == chosenPlayerSign) {
        playerScore++;
      } else computerScore++;
      handleFinalScore();
      gameActive = false;
      return;
    }

    if (!gameState.includes("")) {
      statusDisplayEl.classList.add("display");
      statusDisplayEl.innerHTML = ` 🤝 it's a tie`;
      gameActive = false;
      return;
    }

    if (currentPlayer == chosenPlayerSign) {
      handlePlayerChange(clickedCellIndex);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.addEventListener("click", handleCellClick));
    }
  }

  function handlePlayerChange(clickedCellIndex) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerIndexChose.push(Number(clickedCellIndex));
    if (playerIndexChose.length == 3) {
      playerIndexChose.shift();
    }
    let optionalsTurnIndex = [];
    for (const indexes of winningConditions) {
      if (playerIndexChose.every((elem) => indexes.includes(elem))) {
        for (const optionalsIndex of indexes) {
          if (
            optionalsIndex != clickedCellIndex &&
            gameState[optionalsIndex] == ""
          ) {
            optionalsTurnIndex.push(optionalsIndex);
          }
        }
      }
    }

    if (optionalsTurnIndex.length == 0) {
      for (let emptyIndex in gameState) {
        if (gameState[emptyIndex] == "") optionalsTurnIndex.push(emptyIndex);
      }
    }
    const uniqueOptionalsTurnIndex = [...new Set(optionalsTurnIndex)];
    let randomIndexPlayed =
      uniqueOptionalsTurnIndex[
        Math.floor(Math.random() * uniqueOptionalsTurnIndex.length)
      ];
    if (gameState[randomIndexPlayed] !== "") {
      randomIndexPlayed =
        uniqueOptionalsTurnIndex[
          Math.floor(Math.random() * uniqueOptionalsTurnIndex.length)
        ];
    } else handleCellCompPlay(randomIndexPlayed);
  }

  function handleCellCompPlay(randomIndexPlayed) {
    const clickedCellId = `cell-${randomIndexPlayed}`;
    const clickedCellEl = document.getElementById(clickedCellId);
    handleCellChangeToPlayed(clickedCellId, clickedCellEl);
  }
}

function handleRestartGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).innerHTML = "";
  }
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  flag = true;
  playerIndexChose = [];
  document.getElementById("circle-sign").classList.remove("chosen-sign");
  document.getElementById("cross-sign").classList.remove("chosen-sign");
  statusDisplayEl.innerHTML = "";
  errorMessageSign.innerHTML = "";
  document
    .querySelectorAll(".tic-tac-toe-sign")
    .forEach((ticTacToeSign) =>
      ticTacToeSign.addEventListener("click", handlePlayerSign)
    );
}

//---------------------rock-paper-scissors-game-------------------------

const playerRPSChoiceSignEl = document.getElementById(
  "player-Choice-container"
);
const computerRPSChoiceSignEl = document.getElementById(
  "computer-Choice-container"
);
const statusErrorSelectedSignRSP = document.getElementById(
  "status-error-selected-sign-RSP"
);
const statusDisplayGameResult = document.getElementById("display-winner");

const startRockPaperScissorsSGame = document.getElementById(
  "rock-paper-scissors-start-game"
);
const gameBoardRockPaperScissorsSGame = document.getElementById(
  "rock-paper-scissors-game"
);
const restartGameRPSEl = document.getElementById(
  "restart-rock-paper-scissors-game"
);

startRockPaperScissorsSGame.addEventListener(
  "click",
  showGameRockPaperScissors
);
restartGameRPSEl.addEventListener("click", handleRestartGameRPS);

function showGameRockPaperScissors() {
  startRockPaperScissorsSGame.classList.toggle("clicked");
  gameBoardRockPaperScissorsSGame.classList.toggle(
    "rock-paper-scissors-game-display"
  );
  introContainer.classList.add("status-display");
  gameBoardTicTacToeGame.classList.remove("display-tic-tac-toe-game");
  gameBoardHangmanGame.classList.remove("display-Hangman-game");
  startTicTacToeGame.classList.remove("clicked");
  HangmanStartGame.classList.remove("clicked");
}

let flagRPS = true;
const allGameSigns = ["👊", "🖐️", "✌️"];

document
  .querySelectorAll(".rock-paper-scissors-sign")
  .forEach((rockPaperScissorsSign) =>
    rockPaperScissorsSign.addEventListener("click", handlePlayerSignRPS)
  );

function handlePlayerSignRPS(selectPlayerSign) {
  let chosenPlayerSign = "";
  if (flagRPS) {
    const selectSignId = selectPlayerSign.target.id;
    const currentPlayerSignEl = document.getElementById(selectSignId);
    currentPlayerSignEl.classList.add("rock-paper-scissors-sign-chosen-sign");
    chosenPlayerSign = currentPlayerSignEl.innerHTML;
    playerRPSChoiceSignEl.innerHTML = `
    <div id="player-Choice" class="player-Choice-sign">${chosenPlayerSign}</div>
    <p class="sign-description">Your sign</p>`;
    flagRPS = false;
    startRPSNewGame(chosenPlayerSign);
  } else {
    statusErrorSelectedSignRSP.classList.add("display-error-RPS");
  }
}

function startRPSNewGame(chosenPlayerSign) {
  statusErrorSelectedSignRSP.classList.remove("display-error-RPS");
  const randomIndex = Math.floor(Math.random() * allGameSigns.length);
  const computerRandomSign = allGameSigns[randomIndex];
  computerRPSChoiceSignEl.innerHTML = `
  <div id="computer-Choice" class="computer-Choice">${computerRandomSign}</div>
  <p class="sign-description">Computer sign</p>`;
  handleResultValidationRPS(computerRandomSign, chosenPlayerSign);
}

function handleResultValidationRPS(computerRandomSign, chosenPlayerSign) {
  const playerSignIndex = allGameSigns.findIndex(
    (elem) => elem == chosenPlayerSign
  );
  const computerSignIndex = allGameSigns.findIndex(
    (elem) => elem == computerRandomSign
  );
  if (playerSignIndex == computerSignIndex)
    statusDisplayGameResult.innerHTML = `🤝 it's a tie`;
  else if (
    (playerSignIndex == 0 && computerSignIndex == 2) ||
    (playerSignIndex == 1 && computerSignIndex == 0) ||
    (playerSignIndex == 2 && computerSignIndex == 1)
  ) {
    statusDisplayGameResult.innerHTML = `🥳 You win`;
    playerScore++;
  } else {
    statusDisplayGameResult.innerHTML = `💻 Computer win`;
    computerScore++;
    console.log(computerScore);
  }
  handleFinalScore();
}

function handleRestartGameRPS() {
  playerRPSChoiceSignEl.innerHTML = "";
  computerRPSChoiceSignEl.innerHTML = "";
  statusDisplayGameResult.innerHTML = "";
  statusErrorSelectedSignRSP.innerHTML = "";
  flagRPS = true;
  document
    .getElementById("rock-sign")
    .classList.remove("rock-paper-scissors-sign-chosen-sign");
  document
    .getElementById("paper-sign")
    .classList.remove("rock-paper-scissors-sign-chosen-sign");
  document
    .getElementById("scissors-sign")
    .classList.remove("rock-paper-scissors-sign-chosen-sign");
}

function handleFinalScore() {
  playerScoreNum.innerHTML = playerScore;
  computerScoreNum.innerHTML = computerScore;
}

//---------------------Hangman-game-------------------------

const allLettersContainer = document.getElementById("all-letters-container");
const wordContainerEl = document.getElementById("word-container");
const figureParts = document.querySelectorAll(".figure-Part");
const statusGameResultEl = document.querySelector(
  ".status-game-result-display"
);
const gameBoardHangmanGame = document.getElementById("Hangman-game");
const HangmanStartGame = document.getElementById("Hangman-start-game");
const restartHangmanGame = document.getElementById("restart-hangman-game");
const statusErrorSelectedCategoryHangman = document.getElementById(
  "status-error-selected-category-hangman"
);
let currentLettersWord = [];
let currentGuessLetters = [];
let wrongGuessLetters = [];
let flagHangman = true;

const wordsToGuessFruitsCategory = [
  "grape",
  "mango",
  "peach",
  "plum",
  "lime",
  "orange",
];
const wordsToGuessCountriesCategory = [
  "israel",
  "italy",
  "norway",
  "ukraine",
  "spain",
  "brazil",
  "belgium",
];
const wordsToGuessAnimalsCategory = [
  "lion",
  "dolphin",
  "wolf",
  "camel",
  "tiger",
  "shark",
  "dog",
];

HangmanStartGame.addEventListener("click", showGameHangman);
restartHangmanGame.addEventListener("click", restartHangmanGameBoard);

function showGameHangman() {
  gameBoardHangmanGame.classList.toggle("display-Hangman-game");
  HangmanStartGame.classList.toggle("clicked");
  introContainer.classList.add("status-display");
  gameBoardTicTacToeGame.classList.remove("display-tic-tac-toe-game");
  gameBoardRockPaperScissorsSGame.classList.remove(
    "rock-paper-scissors-game-display"
  );
  startTicTacToeGame.classList.remove("clicked");
  startRockPaperScissorsSGame.classList.remove("clicked");
}

createLetters();
function createLetters() {
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerHTML = String.fromCharCode(i);
    button.id = i;
    allLettersContainer.append(button);
  }
}

document
  .querySelectorAll(".Hangman-category")
  .forEach((elem) => elem.addEventListener("click", handleGameCategory));

function handleGameCategory(gameCategory) {
  if (flagHangman) {
    const selectCategoryId = gameCategory.target.id;
    const selectCategoryName = selectCategoryId.split("-")[0];
    const currentCategoryEl = document.getElementById(selectCategoryId);
    currentCategoryEl.classList.add("Hangman-category-clicked");
    if (selectCategoryName == "fruits")
      startNewHangmanGame(wordsToGuessFruitsCategory);
    if (selectCategoryName == "countries") {
      startNewHangmanGame(wordsToGuessCountriesCategory);
    }
    if (selectCategoryName == "animals")
      startNewHangmanGame(wordsToGuessAnimalsCategory);
    flagHangman = false;
  } else
    statusErrorSelectedCategoryHangman.classList.add(
      "status-error-selected-category-hangman-display"
    );
}

function startNewHangmanGame(categoryArrayItems) {
  let selectedWord =
    categoryArrayItems[Math.floor(Math.random() * categoryArrayItems.length)];
  console.log(selectedWord);

  for (let i = 0; i < selectedWord.length; i++) {
    let div = document.createElement("div");
    let span = document.createElement("span");
    div.append(span);
    div.classList.add("word-letters");
    span.id = i;
    span.classList.add("one-letter-from-the-word");
    span.classList.add("hide-letter");
    currentLettersWord.push(selectedWord[i]);
    span.innerHTML = selectedWord[i];
    wordContainerEl.append(div);
  }

  const wordLettersEl = document.querySelectorAll(".one-letter-from-the-word");

  displayWord();

  function displayWord() {
    document
      .querySelectorAll(".letters")
      .forEach((letter) => letter.addEventListener("click", handleClickLetter));
  }

  function handleClickLetter(letter) {
    statusErrorSelectedCategoryHangman.classList.remove(
      "status-error-selected-category-hangman-display"
    );
    const selectLetterId = letter.target.id;
    const currentLetterEl = document.getElementById(selectLetterId);
    const guessLetter = letter.srcElement.innerHTML.toLowerCase();
    if (currentLettersWord.includes(guessLetter)) {
      currentGuessLetters.push(guessLetter);
      currentLetterEl.classList.add("correct-letter-guess");
      const letterIndex = currentLettersWord.indexOf(guessLetter);
      for (let i = 0; i < wordLettersEl.length; i++) {
        if (wordLettersEl[i].id == letterIndex) {
          wordLettersEl[i].classList.remove("hide-letter");
        }
      }
    } else {
      wrongGuessLetters.push(guessLetter);
      currentLetterEl.classList.add("wrong-letter-guess");
      handlefigure();
    }
  }

  function handlefigure() {
    figureParts.forEach((part, index) => {
      if (index < wrongGuessLetters.length) {
        part.classList.remove("figure-Part");
      }
    });
    checkWinning(currentLettersWord);
  }

  function checkWinning(currentLettersWord) {
    const currentWord = currentLettersWord.join("");
    if (
      currentLettersWord.every((elem) => currentGuessLetters.includes(elem))
    ) {
      playerScore++;
      statusGameResultEl.innerHTML = "🥳 You Win";
    }
    if (wrongGuessLetters.length > 5) {
      computerScore++;
      statusGameResultEl.innerHTML = `
      💻 Computer Win </br> </br>
      The word is <b>${currentWord}</b>`;
    }
    handleFinalScore();
  }
}

function restartHangmanGameBoard() {
  statusErrorSelectedCategoryHangman.innerHTML = "";
  statusGameResultEl.innerHTML = "";
  wordContainerEl.innerHTML = "";
  allLettersContainer.innerHTML = "";
  wrongGuessLetters = [];
  currentLettersWord = [];
  createLetters();
  figureParts.forEach((part) => part.classList.add("figure-Part"));
  flagHangman = true;
  document
    .getElementById("fruits-category")
    .classList.remove("Hangman-category-clicked");
  document
    .getElementById("countries-category")
    .classList.remove("Hangman-category-clicked");

  document
    .getElementById("animals-category")
    .classList.remove("Hangman-category-clicked");

  document
    .querySelectorAll(".Hangman-category")
    .forEach((elem) => elem.addEventListener("click", handleGameCategory));
}
