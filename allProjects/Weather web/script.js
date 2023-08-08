const APIKEY = "e2f739f43e78f6a768a9688e7dd720b0";
const UNSPLASHAPIKEY = "Nm9xpypvdlVkcaFbfod-EWWoFKJv8WX6-U-DPq0vcbk";

const inputSearchValueEl = document.getElementById("search-input-text");
const searchFailedMessageEl = document.getElementById("search-failed-message");
const whetherContainerInfo = document.getElementById("wether-info");
const whetherContainerDetails = document.getElementById(
  "list-of-weather-details"
);
const whetherContainerImg = document.getElementById("img-cover-container");
const lastSearchesEl = document.getElementById("list-of-last-searches");
const lastSearchesIntroEl = document.getElementById("intro-last-searches");
const btnSearchEl = document.getElementById("search-btn");
const searchAreaEl = document.getElementById("search-area");
const openWhetherInfo = document.getElementById("open-whether-info");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const lastSearches = [];

const date = new Date();
const year = String(date.getFullYear()).slice(2);
const mouth = String(date.toUTCString()).slice(8, 11);
const dayNumber = String(date.getDate());
const dayWeek = weekDays[date.getDay()];
const time = Date(date.getTime()).slice(16, 21);

async function getWeatherData(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&exclude=daily&appid=${APIKEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    searchFailedMessageEl.innerHTML = "* Search failed, please try again";
    return;
  }
}

async function getPhotos(searchWord) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=10&per_page=5&query=${searchWord}&orientation=landscape&client_id=${UNSPLASHAPIKEY}`
  );
  const data = await response.json();
  const imgCoverUrl = data.results[0].urls.full;
  return imgCoverUrl;
}

inputSearchValueEl.addEventListener("click", () => {
  searchFailedMessageEl.innerHTML = "";
  inputSearchValueEl.value = "";
});

async function init(cityName) {
  const weatherInfo = await getWeatherData(cityName);
  const temperature = Math.round(weatherInfo.main.temp);
  const description = weatherInfo.weather[0].description;
  const icon = weatherInfo.weather[0].icon;
  const cloudiness = weatherInfo.clouds.all;
  const humidity = weatherInfo.main.humidity;
  const windSpeed = weatherInfo.wind.speed;
  const fellLike = Math.round(weatherInfo.main.feels_like);

  const searchWord = cityName + " " + description;
  const imgPhoto = await getPhotos(searchWord);
  whetherContainerImg.innerHTML = `
  <img
  src="${imgPhoto}"
  alt="img-cover"
  class="img-cover"
/>`;

  whetherContainerInfo.innerHTML = `
  <p class="degrees">${temperature}°</p>
  <div class="wether-more-info">
    <p class="country">${cityName}</p>
    <p>${time} ${dayWeek}, ${dayNumber} ${mouth} ${year}</p>
  </div>
  <div class="wether-status">
  <img
  src="http://openweathermap.org/img/wn/${icon}.png"
  alt="weather-icon"
  class="weather-icon"
/>
    <p>${description}</p>
  </div>`;
  whetherContainerDetails.innerHTML = `
  <label>Weather Details</label>
  <div class="cloudy-percent">
    <li>Cloudy</li>
    <p id="cloudy-percent-value">${cloudiness}%</p>
  </div>
  <div class="humidity-percent">
    <li>Humidity</li>
    <p id="humidity-percent-value">${humidity}%</p>
  </div>
  <div class="wind-percent">
    <li>Wind speed</li>
    <p id="wind-percent-value">${windSpeed} m/s</p>
  </div>
  <div class="feel-like-temp">
    <li>Fell like</li>
    <p id="feel-like-temp-value">${fellLike}°</p>
  </div>`;
}

btnSearchEl.addEventListener("click", () => {
  lastSearchesIntroEl.classList.add("display-none");
  const cityNameFromInput = inputSearchValueEl.value;
  const firstLetter = cityNameFromInput.charAt(0).toUpperCase();
  const rest = cityNameFromInput.slice(1);
  const cityNameFirstLetterUpper = firstLetter + rest;
  if (lastSearches.length < 5) {
    lastSearches.push(cityNameFirstLetterUpper);
  } else {
    lastSearches.pop();
    lastSearches.unshift(cityNameFirstLetterUpper);
  }
  updateLestSearches(lastSearches);
  init(cityNameFirstLetterUpper);
});

function updateLestSearches(lastSearches) {
  lastSearchesEl.innerHTML = "";
  console.log(lastSearches);
  for (let i = 0; i <= lastSearches.length - 1; i++) {
    console.log(i);
    lastSearchesEl.innerHTML += `
    <li class="last-search">${lastSearches[i]}</li>`;
  }
}

document.querySelectorAll(".last-search").forEach((city) => {
  city.addEventListener("click", searchCityFromLastSearches);
});

function searchCityFromLastSearches(chosenCityFromLestSearches) {
  const chosenCityName = chosenCityFromLestSearches.target.innerHTML;
  init(chosenCityName);
}

document.querySelectorAll(".open-whether-info").forEach((click) => {
  click.addEventListener("click", toggleWhetherInfoMenu);
});

function toggleWhetherInfoMenu() {
  searchAreaEl.classList.toggle("display");
  if (searchAreaEl.matches(".display")) {
    openWhetherInfo.innerHTML = `<i class="bi bi-arrow-left-circle-fill"></i>`;
  } else {
    openWhetherInfo.innerHTML = `<i class="bi bi-arrow-right-circle-fill"></i>`;
  }
}
