let searchContainer = document.querySelector(".js-searchContainer");
let inputText = document.querySelector(".js-inputText");
let button = document.querySelector(".js-buttonSearch");
let APIResults = [];
let arraySeries = [];
let arrayFavoriteSeries = [];

if (localStorage.getItem("APIResults")) {
  APIResults = JSON.parse(localStorage.getItem("APIResults"));
}
if (localStorage.getItem("favoriteSeries")) {
  arrayFavoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries"));
  printFavoriteSeries();
  addEventsToDeleteFavorite();
}

function pushSeries(serie) {
  if (serie.show.image) {
    arraySeries.push({
      name: `${serie.show.name}`,
      image: `${serie.show.image.medium}`,
    });
  } else {
    arraySeries.push({
      name: `${serie.show.name}`,
      image: "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
    });
  }
}

function printSeries(evt) {
  let content = "";
  arraySeries = [];
  evt.forEach(function (serie) {
    if (serie.show.image) {
      content += `<li class="js-lisSerie lisSerie"><img class="imgSerie" src="${serie.show.image.medium}" c/> ${serie.show.name}</li>`;
    } else {
      content += `<li class="js-lisSerie lisSerie"><img class="imgSerie" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" /> ${serie.show.name}</li>`;
    }
    pushSeries(serie);
  });
  searchContainer.innerHTML = `<ul class="ulContainerSeries"> ${content}</ul>`;
  registerClickSeries();
}

function callToAPI() {
  fetch(`//api.tvmaze.com/search/shows?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      let content = "";
      printSeries(data);
      APIResults.push({
        searchValue: inputText.value,
        results: data,
      });
      localStorage.setItem("APIResults", JSON.stringify(APIResults));
    });
}

function handleFetchData(evt) {
  evt.preventDefault();
  let cachedResult = APIResults.find(
    (item) => item.searchValue === inputText.value
  );
  if (!cachedResult) {
    callToAPI();
  } else {
    printSeries(cachedResult.results);
  }
}
button.addEventListener("click", handleFetchData);

function registerClickSeries() {
  let lisSeries = document.querySelectorAll(".js-lisSerie");
  lisSeries.forEach(function (liSerie, index) {
    liSerie.addEventListener("click", function (event) {
      clickSerie(event, index);
    });
  });
}

function clickSerie(event, index) {
  let liElement = event.currentTarget;
  liElement.classList.toggle("lisSerie");
  liElement.classList.toggle("liSelectedSerie");
  saveFavorites(index);
  printFavoriteSeries();
  addEventsToDeleteFavorite();
}

function saveFavorites(index) {
  let favoritesExists = arrayFavoriteSeries.find(
    (item) => item.name === arraySeries[index].name
  );
  if (!favoritesExists) {
    arrayFavoriteSeries.push({
      name: `${arraySeries[index].name}`,
      image: `${arraySeries[index].image}`,
    });
    localStorage.setItem("favoriteSeries", JSON.stringify(arrayFavoriteSeries));
  }
}

function printFavoriteSeries() {
  let favoritesContainer = document.querySelector(".js-favoritesList");
  let contentTwo = "";
  arrayFavoriteSeries.forEach(function (serie) {
    contentTwo += `<li class="lisSerie js-liFavorite"><button class="js-deleteOne">X</button><img class="imgSerie" src="${serie.image}" c/> ${serie.name}</li>`;
  });
  favoritesContainer.innerHTML = `<ul> ${contentTwo}</ul>`;
}

function resetButton() {
  let buttonReset = document.querySelector(".js-resetFavorites");
  buttonReset.addEventListener("click", function () {
    arrayFavoriteSeries = [];
    localStorage.removeItem("favoriteSeries");
    printFavoriteSeries();
  });
}
resetButton();

function addEventsToDeleteFavorite() {
  let deleteFavoriteOneByOne = document.querySelectorAll(".js-deleteOne");
  deleteFavoriteOneByOne.forEach(function (button, index) {
    button.addEventListener("click", function () {
      arrayFavoriteSeries.splice(index, 1);
      localStorage.setItem(
        "favoriteSeries",
        JSON.stringify(arrayFavoriteSeries)
      );
      printFavoriteSeries();
      addEventsToDeleteFavorite();
    });
  });
}
