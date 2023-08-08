const GuessTheNumberProject = document.getElementById(
  "Guess-the-number-project"
);

const bankAppProject = document.getElementById("bank-app-project");
const musicPlayerProject = document.getElementById("music-player-project");
const recipesSearchProject = document.getElementById("recipes-search-project");
const weatherAppProject = document.getElementById("weather-app-project");
const miniGamesProject = document.getElementById("mini-games-project");

GuessTheNumberProject.addEventListener("click", () => {
  window.open("./allProjects/guessMyNumber/index.html");
});

bankAppProject.addEventListener("click", () => {
  window.open("./allProjects/BankApp/index.html");
});
musicPlayerProject.addEventListener("click", () => {
  window.open("./allProjects/musicPlayer/index.html");
});
recipesSearchProject.addEventListener("click", () => {
  window.open("./allProjects/Recipe Book Web/index.html");
});
weatherAppProject.addEventListener("click", () => {
  window.open("./allProjects/Weather web/index.html");
});
miniGamesProject.addEventListener("click", () => {
  window.open("./allProjects/MiniGames/index.html");
});
