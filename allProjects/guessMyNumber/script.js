let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

function changeMessage(message) {
  document.querySelector(".message").textContent = message;
}

document.querySelector(".btn-check").addEventListener("click", function () {
  const guessNumber = Number(document.querySelector(".guess").value);
  if (!guessNumber) {
    changeMessage("🛑 No number!");
  } else if (guessNumber === secretNumber) {
    changeMessage("🥳 Correct Number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".guess").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highScore").textContent = highScore;
    }
  } else if (guessNumber !== secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        guessNumber > secretNumber
          ? "📈 Number is to hight"
          : "📉 Number is to low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      changeMessage("💥 You lost the game");
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".bth-again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector("body").style.backgroundColor = "#222";
  changeMessage("Start guessing ...");
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").style.backgroundColor = "#222";
});
