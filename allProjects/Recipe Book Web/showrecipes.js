const API_KEY = "24467c3cd54f466492811bb98a503786";
const cuisineTypeUserChooseEl = document.getElementById(
  "cuisineType-userChoose"
);

const allUserNutritionChooseEl = document.getElementById(
  "nutrition-userChoose"
);

const asideMenuIcon = document.getElementById("hamburgerMenu");
const asideMenuNav = document.getElementById("side-menu");

const userNutritionData = localStorage.getItem("allNutrition");
const allUserNutrition = JSON.parse(userNutritionData).join(",");

window.onload = load();

function load() {
  const CuisineTypeData = localStorage.getItem("selectedCuisineType");
  cuisineTypeUserChooseEl.innerHTML = JSON.parse(CuisineTypeData);
  console.log(cuisineTypeUserChooseEl.innerHTML);

  const userNutritionData = localStorage.getItem("allNutrition");
  const userNutritionArray = JSON.parse(userNutritionData);
  for (const item of userNutritionArray) {
    allUserNutritionChooseEl.innerHTML += `✔️ ${item}`;
  }
}

asideMenuIcon.addEventListener("click", function () {
  asideMenuNav.classList.toggle("display");
});

const recipeListElem = document.getElementById("recipe-list");
async function displayRecipes(recipes) {
  recipeListElem.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    const allIngredientsRecipe = await allIngredients(recipes[i]);
    const allInstructionsRecipe = await allInstructions(recipes[i]);

    recipeListElem.innerHTML += `
    <ul class="recipe-list" id="recipe-list-${i}">
    <li class="recipe-item">
    <img src="${recipes[i].image}" alt="recipe1" />
    <h2>${recipes[i].title}</h2>
    <div class="recipe-info">
      <div class="recipe-info-cuisine-type">
        <h3>Cooking time:</h3>
        <p>${recipes[i].readyInMinutes} minutes</p>
      </div>
      <div class="recipe-info-nutrition">
        <h3>Nutrition:</h3>
        <p>${recipes[i].diets
          .map((word) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const rest = word.slice(1).toLowerCase();
            return "&check; " + firstLetter + rest;
          })
          .join("</br>")}</p>
      </div>
      <div class="recipe-info-Health-rate">
        <h3>Health rate:</h3>
        <p>${recipes[i].healthScore}/100</p>
      </div>
    </div>
    <a
    id="show-all-recipe-ingredients-${i}"
    class="show-all-recipe-ingredients"
  >
    show more +
  </a>
    </li>
    <div id="content-${i}" class="content">
     <div class="ingredients">
     <h4>Ingredients:</h4>
     <p>${"&check;  " + allIngredientsRecipe.join("</br> &check;  ")}</p>
     </div>
    <div class="instructions">
     <h4>Instructions:</h4>
     <p>${"◼️  " + allInstructionsRecipe.join("</br> ◼️  ")}</p>
     </div>
    </div>
  </ul>`;
  }
  document
    .querySelectorAll(".show-all-recipe-ingredients")
    .forEach((recipe) => recipe.addEventListener("click", showAllRecipeInfo));

  function showAllRecipeInfo(selectedRecipe) {
    const selectedRecipeToShowFullInfoEl = selectedRecipe.target.id;
    const selectedRecipeToShowFullInfoIndex =
      selectedRecipeToShowFullInfoEl.split("-")[4];
    const allRecipeInfo = document.getElementById(
      `content-${selectedRecipeToShowFullInfoIndex}`
    );
    allRecipeInfo.classList.toggle("display-more-info");
  }
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisineTypeUserChooseEl.innerHTML}&diet=${allUserNutrition}&number=7&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

async function getFullRecipesInfo(id) {
  const response2 = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?&number=7&apiKey=${API_KEY}`
  );
  const fullData = await response2.json();
  return fullData;
}

async function allIngredients(recipe) {
  const Ingredients = [];
  for (let ingredient of recipe.extendedIngredients) {
    Ingredients.push(ingredient.name);
  }
  return Ingredients;
}

async function allInstructions(recipe) {
  const Instructions = [];
  for (let instruction of recipe.analyzedInstructions[0].steps) {
    Instructions.push(instruction.step);
  }
  return Instructions;
}

async function init() {
  const recipes = await getRecipes();
  const allRecipes = [];
  console.log("cuisine recipe:", recipes);
  for (let i = 0; i < recipes.length; i++) {
    const fullRecipesInfo = await getFullRecipesInfo(recipes[i].id);
    allRecipes.push(fullRecipesInfo);
  }
  displayRecipes(allRecipes);
}

init();
