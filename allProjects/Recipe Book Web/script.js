const cuisineTypeSelectEl = document.getElementById("cuisineType");
const nutritionCheckBoxEl = document.querySelectorAll(".nutritionItem");
const searchBtn = document.getElementById("btn-search");

const asideMenuIcon = document.getElementById("hamburgerMenu");
const asideMenuNav = document.getElementById("side-menu");
asideMenuIcon.addEventListener("click", function () {
  asideMenuNav.classList.toggle("display");
});

function getCuisineTypeUserChooseText() {
  const selectedCuisineType = cuisineTypeSelectEl.value;
  localStorage.setItem(
    "selectedCuisineType",
    JSON.stringify(selectedCuisineType)
  );
  return selectedCuisineType;
}

function getallUserNutrition() {
  const allNutrition = [];
  for (let i = 0; i < nutritionCheckBoxEl.length; i++) {
    if (nutritionCheckBoxEl[i].checked == true) {
      allNutrition.push(nutritionCheckBoxEl[i].defaultValue);
    }
  }
  localStorage.setItem("allNutrition", JSON.stringify(allNutrition));
  return allNutrition;
}

const cuisineTypeUserChoose = getCuisineTypeUserChooseText();
const allUserNutrition = getallUserNutrition();

searchBtn.addEventListener("click", () => {
  const a = getCuisineTypeUserChooseText();
  const b = getallUserNutrition();
  window.open("./recipes.html", "_self");
});
